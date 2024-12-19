import React, { useState } from "react";

const RivalryChecker = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [rivalryData, setRivalryData] = useState(null);
  const [error, setError] = useState("");

  const checkRivalry = async () => {
    setError("");
    setRivalryData(null);

    try {
      const response = await fetch("/rivals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ player1, player2 }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch rivalry status");
      }

      const data = await response.json();
      setRivalryData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderPlayerBio = (player, label) => (
    <div>
      <h3>{label}</h3>
      {player.profile ? (
        <div>
          <img
            src={player.profile.profilePicture}
            alt={`${player.profile.name}'s Profile`}
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <p>Name: {player.profile.name}</p>
          <p>Age: {player.profile.age}</p>
          <p>Weight: {player.profile.weight} lbs</p>
          <p>Status: {player.profile.isActive ? "Active" : "Retired"}</p>
          <h4>Season Stats:</h4>
          <table border="1">
            <thead>
              <tr>
                <th>Season</th>
                <th>Team</th>
                <th>Games</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {player.seasonStats.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.season}</td>
                  <td>{stat.teamName.default}</td>
                  <td>{stat.gamesPlayed}</td>
                  <td>{stat.goals}</td>
                  <td>{stat.assists}</td>
                  <td>{stat.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );

  return (
    <div>
      <h1>Rivalry Checker</h1>
      <input
        type="text"
        placeholder="Player 1 Name"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Player 2 Name"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />
      <button onClick={checkRivalry}>Check Rivalry</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {rivalryData && (
        <div>
          <h2>
            {rivalryData.in_rivalry ? "Played in rivalry" : "Never been rivals"}
          </h2>
          <div style={{ display: "flex", gap: "20px" }}>
            {renderPlayerBio(rivalryData.player1, "Player 1")}
            {renderPlayerBio(rivalryData.player2, "Player 2")}
          </div>
        </div>
      )}
    </div>
  );
};

export default RivalryChecker;
