import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { SwapVert as SwapVertIcon } from "@mui/icons-material";

function TeamDisplay({
  teams,
  editMode,
  movePlayerToOtherTeam,
  setOpenDialog,
  setPlayerToMove,
  showPlayerInfo,
}) {
  return (
    <div>
      {teams.map((team, index) => (
        <Card key={index} sx={{ margin: "15px auto" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: "20px" }}
            >
              Team {index + 1}
            </Typography>
            {team.map((player) => (
              <Box
                key={player.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              >
                <Paper
                  sx={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    justifyContent: editMode ? "space-between" : "center",
                    minWidth: "200px",
                    animation: editMode ? `jiggle 0.3s infinite` : "none",
                  }}
                  elevation={3}
                >
                  <div style={{width: "100%"}}>
                    <Typography variant="body1"  sx={{fontWeight: "bold"}}>
                      {player.name}
                    </Typography>
                    {showPlayerInfo && (
                      <div style={{display: "flex", alignItems:"center", justifyContent: "space-evenly", width: "100%", marginTop: "8px"}}>
                      <Typography variant="body2" color="rgba(0,0,0,0.6)">
                        {player.sex}
                      </Typography>
                      <Typography variant="body2" color="rgba(0,0,0,0.6)">
                        {player.skillLevel}
                      </Typography>
                      </div>
                    )}
                  </div>
                  {editMode && (
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        if (teams.length === 2) {
                          movePlayerToOtherTeam(player);
                        } else {
                          setOpenDialog(true);
                          setPlayerToMove(player);
                        }
                      }}
                    >
                      <SwapVertIcon />
                    </IconButton>
                  )}
                </Paper>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TeamDisplay;