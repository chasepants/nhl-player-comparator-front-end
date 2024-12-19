import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Grid2, Box, Typography, Grid2Box } from "@mui/material";

const PlayerSplit = () => {
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

//   const renderPlayerBio = (player, label) => (
//     <div>
//       <h3>{label}</h3>
//       {player.profile ? (
//         <div>
//           <img
//             src={player.profile.profilePicture}
//             alt={`${player.profile.name}'s Profile`}
//             style={{ width: "100px", borderRadius: "50%" }}
//           />
//           <p>Name: {player.profile.name}</p>
//           <p>Age: {player.profile.age}</p>
//           <p>Weight: {player.profile.weight} lbs</p>
//           <p>Status: {player.profile.isActive ? "Active" : "Retired"}</p>
//           <h4>Season Stats:</h4>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Season</TableCell>
//                   <TableCell>Team</TableCell>
//                   <TableCell>Games</TableCell>
//                   <TableCell>Goals</TableCell>
//                   <TableCell>Assists</TableCell>
//                   <TableCell>Points</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {player.seasonStats.map((stat, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{stat.season}</TableCell>
//                     <TableCell>{stat.teamName.default}</TableCell>
//                     <TableCell>{stat.gamesPlayed}</TableCell>
//                     <TableCell>{stat.goals}</TableCell>
//                     <TableCell>{stat.assists}</TableCell>
//                     <TableCell>{stat.points}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   );
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
          
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
);

const renderPlayerStats = (player) => (
    <div>
        <Box
            sx={{
                maxHeight: "300px",
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "8px",
            }}
        >
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
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
        </Box>
    </div>
)
  
return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        bgcolor: "#f5f5f5", // Light background color
        padding: 2,
      }}
    >
        <Box
            sx={{
            width: "100%",
            maxWidth: "500px",
            padding: 4,
            bgcolor: "#ffffff",
            boxShadow: 3,
            borderRadius: 2,
            textAlign: "center",
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
            Player Comparison
            </Typography>
            <Grid2 container spacing={2} justifyContent="center">
            <Grid2 item xs={6}>
                <TextField
                label="Player 1 Name"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                variant="outlined"
                fullWidth
                />
            </Grid2>
            <Grid2 item xs={6}>
                <TextField
                label="Player 2 Name"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                variant="outlined"
                fullWidth
                />
            </Grid2>
            <Grid2 item xs={12}>
                <Button
                variant="contained"
                color="primary"
                onClick={checkRivalry}
                fullWidth
                >
                Check Rivalry
                </Button>
            </Grid2>
            </Grid2>
            {error && (
            <Typography
                variant="body2"
                color="error"
                sx={{ marginTop: 2, textAlign: "center" }}
            >
                {error}
            </Typography>
            )}
        </Box>
  
        {rivalryData && (
            <Box
            sx={{
                marginTop: 4,
                width: "100%",
                maxWidth: "800px",
                padding: 3,
                bgcolor: "#ffffff",
                boxShadow: 3,
                borderRadius: 2,
            }}
            >
                <Box sx={{ display: "flex", gap: 2, justifyContent: "space-around" }}>
                    {renderPlayerBio(rivalryData.player1, "Player 1")}
                    {renderPlayerBio(rivalryData.player2, "Player 2")}
                </Box>
                <br/>
                <Typography variant="h6" component="h6" gutterBottom>
                    Prolog Inferenced Relationships
                </Typography>
                <Typography variant="p" component="p" gutterBottom>
                    {rivalryData.in_rivalry
                    ? "Played in rivalry"
                    : "Never been rivals"}
                </Typography>
                <br/>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                    {renderPlayerStats(rivalryData.player1)}
                    {renderPlayerStats(rivalryData.player2)}
                </Box>
            </Box>
        )}   
    </Box>
  );
};

export default PlayerSplit;
