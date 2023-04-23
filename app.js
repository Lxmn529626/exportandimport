const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
//get all players details
app.get("/players/", async (request, response) => {
  const getCricketers = `SELECT
        *
    FROM
        cricket_team
    ORDER BY 
        player_id`;
  const playersArray = await db.all(getCricketers);
  response.send(playersArray);
});
//post a new player
app.post("/players/", async (request, response) => {
  const playerdetails = request.body;
  const { player_id, player_name, jersey_number, role } = playerdetails;
  const addBookQuery = `insert into cricket_team(playe_name,jersey_number,role)
        values (${playerName},${jerseyNumber},${role})`;
  const newone = await run(addBookQuery);
  response.send("Player Added to team");
});
//get a single player
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getsinglePlayer = `select *
    from cricket_team
    where player_id=${playerId};`;
  const player = await db.get(getsinglePlayer);
  response.send(player);
});
//put update the player
app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const bookDetails = request.body;
  const { player_name, jersey_number, role } = bookDetails;
  const addBookQuery = `insert into cricker_team(player_name,jersery_no,role)
    values (${playerName},${jerseyNumber},${role});`;
  const dbResponse = await db.run(addBookQuery);
  response.send("Player Details Updated");
});
//delete the single player
app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deleteQuery = `delete from cricket_table where player_id=${playerId};`;
  await db.run(deleteQuery);
  response.send("Player Remove");
});
module.exports = app;
