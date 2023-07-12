import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Box,
  Chip,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

function PlayerSelection({ selectedPlayers, players, onPlayerChange }) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Grid item xs={12} style={{ padding: 0 }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Select Players</InputLabel>
        <Select
          multiple
          value={selectedPlayers}
          onChange={onPlayerChange}
          label="Select Players"
          input={<OutlinedInput label="Select Players" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={players.find((player) => player.id === value).name}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {players.map((player) => (
            <MenuItem key={player.id} value={player.id}>
              <Checkbox checked={selectedPlayers.includes(player.id)} />
              <ListItemText primary={player.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default PlayerSelection;