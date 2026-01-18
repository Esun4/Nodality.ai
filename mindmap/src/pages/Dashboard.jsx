import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [mindmaps, setMindmaps] = useState([]);
  useEffect(() => {
    async function loadMindmaps() {
      try {
        const res = await fetch("http://localhost:3000/mindmaps", {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data.error || "Failed to load mindmaps");
          setMindmaps([]);
          return;
        }

        setMindmaps(data.mindmaps);
      } catch (err) {
        console.error("Failed to fetch mindmaps:", err);
        setMindmaps([]);
      }
    }

    loadMindmaps();
  }, []);


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">My Workspace</h1>
        <button className="create-btn" onClick={() => navigate("/mindmap/new")}>
          + New Project
        </button>
      </header>
      {mindmaps.length === 0 ? (
        <p>No saved mindmaps yet — click “New Project”.</p>
      ) : (
        <ul className="mindmap-grid">
        {mindmaps.map((map) => (
          <li key={map.id} className="mindmap-card" onClick={() => navigate(`/mindmap/${map.id}`)}>
            <div className="card-preview">
              {/* put zoomed-out thumbnail image here */}
              {map.thumbnail && (
                <img src={map.thumbnail} alt="Map Preview" />
              )}
            </div>

            <div className="card-info">
              <h3 className="card-title">{map.title}</h3>
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}