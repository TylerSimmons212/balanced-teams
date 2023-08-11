import {
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import PlayerSelect from "./PlayerSelect";
import NumberOfTeams from "./NumberOfTeams";
import Filters from "./Filters"

function Widget({
  selectedPlayers,
  players,
  loading,
  setSelectedPlayers,
  setNumberOfTeams,
  generateTeams,
  topPriority,
  secondPriority,
  skillGrouping,
  setTopPriority,
  setSecondPriority,
  setSkillGrouping
}) {
  const handlePlayersChange = (updatedSelectedPlayers) => {
    setSelectedPlayers(updatedSelectedPlayers);
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
      <PlayerSelect
        selectedPlayers={selectedPlayers}
        players={players}
        onPlayerChange={handlePlayersChange}
      />
      <Grid item xs={12} style={{ padding: 0, margin: "20px auto" }}>
        <Box display="flex" alignItems="center">
          <NumberOfTeams setNumberOfTeams={setNumberOfTeams}/>
          <Filters topPriority={topPriority} secondPriority={secondPriority} skillGrouping={skillGrouping} setTopPriority={setTopPriority} setSecondPriority={setSecondPriority} setSkillGrouping={setSkillGrouping} />
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

export default Widget;