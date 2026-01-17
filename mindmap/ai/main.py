import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = FastAPI()

# --- CORS SETTINGS ---
# This allows your React app to make requests to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your specific URL
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class NodeData(BaseModel):
    id: str
    text: str

class SimilarityRequest(BaseModel):
    active_node: NodeData
    other_nodes: list[NodeData]

@app.post("/analyze-similarity")
async def analyze_similarity(data: SimilarityRequest):
    if not data.other_nodes:
        return []

    # 1. Prepare texts for embedding
    # We put the active node text first, followed by all other nodes
    texts = [data.active_node.text] + [n.text for n in data.other_nodes]
    
    try:
        # 2. Get Embeddings from OpenAI (fast and cheap model)
        response = client.embeddings.create(
            input=texts,
            model="text-embedding-3-small"
        )
        
        vectors = [e.embedding for e in response.data]
        active_vec = np.array(vectors[0]).reshape(1, -1)
        other_vecs = np.array(vectors[1:])

        # 3. Calculate Similarity Scores
        # Returns an array of scores between 0 and 1
        scores = cosine_similarity(active_vec, other_vecs)[0]

        # 4. Filter and format results
        suggestions = []
        for i, score in enumerate(scores):
            # We only suggest if similarity is above 35%
            if score > 0.35:
                suggestions.append({
                    "id": data.other_nodes[i].id,
                    "label": data.other_nodes[i].text,
                    "score": int(score * 100),
                    "matchColor": "#4a90e2" if score > 0.7 else "#cbd5e0"
                })

        # Sort by highest match percentage
        return sorted(suggestions, key=lambda x: x['score'], reverse=True)

    except Exception as e:
        print(f"Error during AI analysis: {e}")
        return {"error": str(e)}