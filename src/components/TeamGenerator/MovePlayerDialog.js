import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, Button } from '@mui/material';

function MovePlayerDialog({ open, teams, player, onMove, onClose }) {
  const [selectedTeam, setSelectedTeam] = useState('');
  const handleMove = () => {
    console.log("Selected Team: ", selectedTeam)
    onMove(player, selectedTeam);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Move Player</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Team</InputLabel>
          <Select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
            {teams.map((team, index) => (
              <MenuItem key={index} value={index}>Team {index + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleMove}>Move</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MovePlayerDialog;
