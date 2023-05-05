import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  IconButton,
  Popover,
  Box,
} from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { usePlayers } from "../../hooks/usePlayers";
import { AuthContext } from "../../contexts/AuthContext";
import Confetti from "react-confetti";

const TeamGenerator = ({ numTeamsOptions = [2, 3, 4, 5] }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [numberOfTeams, setNumberOfTeams] = useState(
    numTeamsOptions && numTeamsOptions.length > 0 ? numTeamsOptions[0] : 2
  );
  const [generatedTeams, setGeneratedTeams] = useState([]);
  const [showTeams, setShowTeams] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const userId = user?.uid;
  const { players } = usePlayers(userId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [filters, setFilters] = useState({
    topPriority: "skillLevel",
    secondPriority: "sex",
  });

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handlePlayersChange = (event) => {
    setSelectedPlayers(event.target.value);
  };

  const handleNumberOfTeamsChange = (event) => {
    setNumberOfTeams(event.target.value);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const createSortedPlayers = (playerIds) => {
    const sortedPlayers = playerIds.map((playerId) =>
      players.find((player) => player.id === playerId)
    );
    return sortedPlayers.filter((player) => player !== undefined);
  };

  const distributePlayers = (players, numberOfTeams, filters) => {
    const sortedPlayers = [...players].sort((a, b) => {
      let result = 0;

      if (filters.topPriority !== "none") {
        result = comparePlayers(a, b, filters.topPriority);
      }

      if (result === 0 && filters.secondPriority !== "none") {
        result = comparePlayers(a, b, filters.secondPriority);
      }

      return result;
    });

    const newTeams = Array.from({ length: numberOfTeams }, () => []);
    sortedPlayers.forEach((player, index) => {
      const teamIndex = index % numberOfTeams;
      newTeams[teamIndex].push(player);
    });

    return newTeams;
  };

  const comparePlayers = (a, b, priority) => {
    switch (priority) {
      case "sex":
        return a.sex.localeCompare(b.sex);
      case "skillLevel":
        return b.skillLevel.localeCompare(a.skillLevel);
      case "height":
        return b.height - a.height;
      default:
        return 0;
    }
  };

  const reshuffleTeams = () => {
    setLoading(true);
    setTimeout(() => {
      const shuffledPlayerIds = shuffle(selectedPlayers.slice());
      const sortedPlayers = createSortedPlayers(shuffledPlayerIds);
      const newTeams = distributePlayers(sortedPlayers, numberOfTeams, filters);
      setGeneratedTeams(newTeams);
      setLoading(false);
    }, 1000);
  };

  const handleOpenFilterPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterPopover = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let confettiTimeout;
    if (showConfetti) {
      confettiTimeout = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }

    return () => {
      clearTimeout(confettiTimeout);
    };
  }, [showConfetti]);

  const generateTeams = () => {
    setLoading(true);
    setTimeout(() => {
      const sortedPlayers = createSortedPlayers(selectedPlayers);
      if (sortedPlayers.length < numberOfTeams) {
        alert(
          `Please select at least ${numberOfTeams} players to generate ${numberOfTeams} teams`
        );
        setLoading(false);
        return;
      }
      const newTeams = distributePlayers(sortedPlayers, numberOfTeams, filters);
      setGeneratedTeams(newTeams);
      setLoading(false);
      setShowTeams(true);
      setShowConfetti(true);
    }, 1000);
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        gutterBottom
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        Team Generator
      </Typography>
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
        <Grid item xs={12} style={{ padding: 0 }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Select Players</InputLabel>
            <Select
              multiple
              value={selectedPlayers}
              onChange={handlePlayersChange}
              label="Select Players"
            >
              {players.map((player) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ padding: 0, margin: "20px auto" }}>
          <Box display="flex" alignItems="center">
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Number of Teams</InputLabel>
              <Select
                value={numberOfTeams}
                onChange={handleNumberOfTeamsChange}
                label="Number of Teams"
              >
                {numTeamsOptions &&
                  numTeamsOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
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
              <Box sx={{ p: 2 }}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: "20px" }}
                >
                  <InputLabel>Top Priority</InputLabel>
                  <Select
                    value={filters.topPriority}
                    onChange={handleFilterChange}
                    label="Top Priority"
                    name="topPriority"
                  >
                    <MenuItem value="sex">Sex</MenuItem>
                    <MenuItem value="skillLevel">Skill Level</MenuItem>
                    <MenuItem value="height">Height</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Second Priority</InputLabel>
                  <Select
                    value={filters.secondPriority}
                    onChange={handleFilterChange}
                    label="Second Priority"
                    name="secondPriority"
                  >
                    <MenuItem value="sex">Sex</MenuItem>
                    <MenuItem value="skillLevel">Skill Level</MenuItem>
                    <MenuItem value="height">Height</MenuItem>
                  </Select>
                </FormControl>
              </Box>
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
      {showConfetti && <Confetti />}
      {showTeams && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              margin: "20px auto",
            }}
          >
            {generatedTeams.map((team, index) => (
              <Card
                sx={{
                  width: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "20px",
                }}
                key={index}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    Team {index + 1}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                  ></Typography>
                  <Typography variant="body2">
                    {team.map((player) => (
                      <li key={player.id}>{player.name}</li>
                    ))}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={reshuffleTeams}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Reshuffle Teams"}
          </Button>
        </>
      )}
    </Container>
  );
};

TeamGenerator.propTypes = {
  numTeamsOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TeamGenerator;