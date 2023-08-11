import React from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
} from '@mui/material';


const PlayerSelect = ({ selectedPlayers, players, onPlayerChange }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [tempSelectedPlayers, setTempSelectedPlayers] = React.useState(selectedPlayers);

  const handleOpenDialog = () => {
    setTempSelectedPlayers(selectedPlayers);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveDialog = () => {
    onPlayerChange(tempSelectedPlayers);
    setOpenDialog(false);
  };

  const handleTogglePlayer = (playerId) => {
    setTempSelectedPlayers((prevSelected) =>
      prevSelected.includes(playerId)
        ? prevSelected.filter((id) => id !== playerId)
        : [...prevSelected, playerId]
    );
  };

  return (
    <Grid item xs={12} style={{ padding: 0 }}>
      <FormControl variant="outlined" fullWidth onClick={handleOpenDialog}>
        <InputLabel>Select Players</InputLabel>
        <OutlinedInput
          readOnly
          value={`${selectedPlayers.length} Players Selected`}
        />
      </FormControl>
      <Dialog fullScreen open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Select Players</DialogTitle>
        <DialogContent>
          {players.map((player) => (
            <ListItem
              key={player.id}
              button
              onClick={() => handleTogglePlayer(player.id)}
            >
              <Checkbox checked={tempSelectedPlayers.includes(player.id)} />
              <ListItemText primary={player.name} />
            </ListItem>
          ))}
        </DialogContent>
        <Box padding={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSaveDialog}>
            Save
          </Button>
        </Box>
      </Dialog>
    </Grid>
  );
};

export default PlayerSelect;
