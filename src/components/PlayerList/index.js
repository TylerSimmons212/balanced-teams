import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { usePlayers } from "../../hooks/usePlayers";
import PlayerForm from "../PlayerForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
};

const PlayerList = ({ userId }) => {
  const { players, addPlayer, updatePlayer, deletePlayer } = usePlayers(userId);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleEditClick = (player) => {
    setSelectedPlayer(player);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setSelectedPlayer(null);
    setOpenForm(false);
  };

  const handleDeleteClick = async (playerId) => {
    await deletePlayer(playerId);
  };

  const handleUpdatePlayer = async (updatedPlayer) => {
    await updatePlayer(selectedPlayer.id, updatedPlayer);
    handleCloseForm();
  };

  const handleAddPlayer = async (newPlayer) => {
    await addPlayer(newPlayer);
    handleCloseForm();
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
        style={{ margin: "0 auto", width: "300px" }}
      >
        Add Player
      </Button>
      <List>
        {players.map((player) => (
          <ListItem key={player.id}>
            <ListItemText
              primary={player.name}
              secondary={`Height: ${player.height}, Skill Level: ${player.skillLevel}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleEditClick(player)}>
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => handleDeleteClick(player.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Modal
        open={openForm}
        onClose={handleCloseForm}
        style={{ margin: "10px" }}
      >
        <Box sx={style}>
          <PlayerForm
            selectedPlayer={selectedPlayer}
            onSubmit={selectedPlayer ? handleUpdatePlayer : handleAddPlayer}
            onCancel={handleCloseForm}
            submitText={selectedPlayer ? "Update Player" : "Add Player"}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default PlayerList;