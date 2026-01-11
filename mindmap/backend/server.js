const express = require("express");
// lets frontend call the backend that's on a different port
const cors = require("cors");
// creates login sessions using cookies
const session = require("express-session");
// hashes passwords to keep secure
const bcrypt = require("bcrypt");
// manages connections to the database
const { Pool } = require("pg");


// creates the server
const app = express();
app.use(express.json());


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/db-test", async (req, res) => {
    const result = await pool.query("SELECT NOW()");

    res.json({ time: result.rows[0].now });
})

app.post("/echo", (req, res) => {
  res.json({ youSent: req.body });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});