import React, { useState } from "react";
import {
  Button,
  Grid,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
  Popover,
} from "@mui/material";
import Filter from "./Filter";
import PlayerSelection from "./PlayerSelection";
import { FilterList as FilterListIcon } from "@mui/icons-material";

function GeneratorWidget({
  selectedPlayers,
  players,
  filters,
  loading,
  setLoading,
  setSelectedPlayers,
  createSortedPlayers,
  distributePlayers,
  setGeneratedTeams,
  setShowTeams,
  setShowConfetti,
  numberOfTeams,
  setNumberOfTeams,
  setFilters
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePlayersChange = (event) => {
    setSelectedPlayers(event.target.value);
  };
  const handleOpenFilterPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseFilterPopover = () => {
    setAnchorEl(null);
  };
  const handleFilterChange = (event) => {
    setFilters(event);
  };
  const generateTeams = () => {
    setLoading(true);
    setTimeout(() => {
      const sortedPlayers = createSortedPlayers(selectedPlayers, players);
      if (sortedPlayers.length < numberOfTeams) {
        alert(
          `Please select at least ${numberOfTeams} players to generate ${numberOfTeams} teams`
        );
        setLoading(false);
        return;
      }
      const newTeams = distributePlayers(sortedPlayers, numberOfTeams, filters);
      setGeneratedTeams(newTeams);
      setShowTeams(true);
      setShowConfetti(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <Grid
      container
      spacing={2}
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        margin: 0,
        padding: "20px",
        width: "100%",
      }}
    >
      <PlayerSelection
        selectedPlayers={selectedPlayers}
        players={players}
        onPlayerChange={handlePlayersChange}
      />
      <Grid item xs={12} style={{ padding: 0, margin: "20px auto" }}>
        <Box display="flex" alignItems="center">
          <FormControl variant="outlined" fullWidth>
            <TextField
              id="outlined-number"
              label="Number of Teams"
              type="number"
              onChange={(event) => {
                setNumberOfTeams(event.target.value);
              }}
            />
          </FormControl>
          <IconButton onClick={handleOpenFilterPopover}>
            <FilterListIcon />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCloseFilterPopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Filter filters={filters} onFilterChange={handleFilterChange} />
          </Popover>
        </Box>
      </Grid>
      <Grid item xs={12} style={{ padding: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={generateTeams}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Teams"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default GeneratorWidget;