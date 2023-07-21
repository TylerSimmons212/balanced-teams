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
import { styled } from "@mui/material/styles";

const MAX_VISIBLE_CHIPS = 5; // Adjust this value to control how many chips are visible

const OverflowChip = styled(Chip)({
  cursor: "pointer",
  backgroundColor: "#f50057",
  color: "#fff",
});

const PlayerSelection = ({ selectedPlayers, players, onPlayerChange }) => {
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

  const [areAllChipsVisible, setAreAllChipsVisible] = React.useState(false);

  const handleClickShowAll = () => {
    setAreAllChipsVisible(true);
  };

  const visiblePlayers = areAllChipsVisible
    ? selectedPlayers
    : selectedPlayers.slice(0, MAX_VISIBLE_CHIPS);

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
              {visiblePlayers.map((value) => (
                <Chip
                  key={value}
                  label={players.find((player) => player.id === value).name}
                />
              ))}
              {!areAllChipsVisible &&
                selectedPlayers.length > MAX_VISIBLE_CHIPS && (
                  <OverflowChip
                    key="overflow-chip"
                    label={`+${
                      selectedPlayers.length - MAX_VISIBLE_CHIPS
                    } more`}
                    onClick={handleClickShowAll}
                  />
                )}
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
};

export default PlayerSelection;
