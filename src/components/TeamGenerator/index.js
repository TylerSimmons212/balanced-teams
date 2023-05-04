import React, { useState, useContext } from "react";
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
} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { usePlayers } from "../../hooks/usePlayers";
import { AuthContext } from "../../contexts/AuthContext";

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

  const distributePlayers = (players, numberOfTeams) => {
    // Sort the players by their sex, skill level (highest to lowest), and height (highest to lowest)
    const sortedPlayers = [...players].sort(
      (a, b) =>
        a.sex.localeCompare(b.sex) ||
        b.skillLevel.localeCompare(a.skillLevel) ||
        b.height - a.height
    );
  
    // Create an array of empty teams
    const newTeams = Array.from({ length: numberOfTeams }, () => []);
  
    // Distribute players evenly among the teams, considering their sex, skill level, and height
    sortedPlayers.forEach((player, index) => {
      const teamIndex = index % numberOfTeams;
      newTeams[teamIndex].push(player);
    });
  
    return newTeams;
  };
  

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
      const newTeams = distributePlayers(sortedPlayers, numberOfTeams);
      setGeneratedTeams(newTeams);
      setLoading(false);
      setShowTeams(true);
    }, 1000);
  };

  const reshuffleTeams = () => {
    setLoading(true);
    setTimeout(() => {
      const shuffledPlayerIds = shuffle(selectedPlayers.slice());
      const sortedPlayers = createSortedPlayers(shuffledPlayerIds);
      const newTeams = distributePlayers(sortedPlayers, numberOfTeams);
      setGeneratedTeams(newTeams);
      setLoading(false);
    }, 1000);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom style={{marginTop: '20px', textAlign: 'center'}}>
        Team Generator
      </Typography>
      <Grid container spacing={2} style={{ backgroundColor: '#fff', borderRadius: '10px', margin: 0, padding: '20px', width: '100%'}}>
        <Grid item xs={12} style={{padding: 0}}>
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
        <Grid item xs={12} style={{padding: 0, margin: '20px auto'}}>
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
        </Grid>
        <Grid item xs={12} style={{padding: 0}}>
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
      {showTeams && (
        <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', margin: '20px auto' }}>
          {generatedTeams.map((team, index) => (
            <Card sx={{ width: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }} key={index}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Team {index + 1}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">

                </Typography>
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
