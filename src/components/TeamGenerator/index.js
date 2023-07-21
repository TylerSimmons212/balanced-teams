import React, { useState, useContext, useEffect } from "react";
import Confetti from "react-confetti";
import { Container, Typography, IconButton } from "@mui/material";
import { usePlayers } from "../../hooks/usePlayers";
import { AuthContext } from "../../contexts/AuthContext";
import TeamDisplay from "./TeamDisplay";
import GeneratorWidget from "./GeneratorWidget";
import MovePlayerDialog from "./MovePlayerDialog";
import {
  Shuffle as ShuffleIcon,
  Info as InfoIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  shuffle,
  createSortedPlayers,
  distributePlayers,
} from "./teamGeneratorUtils";

const TeamGenerator = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user?.uid;
  const { players } = usePlayers(userId);
  const [loading, setLoading] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const [editMode, setEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [generatedTeams, setGeneratedTeams] = useState([]);
  const [playerToMove, setPlayerToMove] = useState({});
  const [filters, setFilters] = useState({
    topPriority: "skillLevel",
    secondPriority: "sex",
    skillGrouping: "mixed"
  });
  const [showPlayerInfo, setShowPlayerInfo] = useState(false);

  const handleShuffleClick = () => {
    setShowConfetti(true);
    setLoading(true);
    setTimeout(() => {
      const shuffledPlayerIds = shuffle(selectedPlayers.slice());
      const sortedPlayers = createSortedPlayers(shuffledPlayerIds, players);
      const newTeams = distributePlayers(sortedPlayers, numberOfTeams, filters);
      setGeneratedTeams(newTeams);
      setLoading(false);
    }, 1000);
  };

  const handleEditModeClick = () => {
    setEditMode(!editMode);
  };

  const handlePlayerInfoClick = () => {
    setShowPlayerInfo(!showPlayerInfo);
  };

  const onMove = (playerToMove, newTeamIndex) => {
    // Check if newTeamIndex is valid
    if (newTeamIndex < 0 || newTeamIndex >= generatedTeams.length) {
      console.error(`Invalid team index: ${newTeamIndex}`);
      return;
    }

    // Find the current team of the player
    const currentTeamIndex = generatedTeams.findIndex((team) =>
      team.some((p) => p.id === playerToMove.id)
    );

    // Check if player was found in a team
    if (currentTeamIndex === -1) {
      console.error(`Player not found in any team: ${playerToMove.id}`);
      return;
    }

    // Get the current team
    const currentTeam = generatedTeams[currentTeamIndex];

    // Remove the player from the current team
    const updatedCurrentTeam = currentTeam.filter(
      (p) => p.id !== playerToMove.id
    );

    // Add the player to the new team
    const updatedNewTeam = [...generatedTeams[newTeamIndex], playerToMove];

    // Update the teams state
    const updatedTeams = generatedTeams.map((team, index) => {
      if (index === currentTeamIndex) return updatedCurrentTeam;
      if (index === newTeamIndex) return updatedNewTeam;
      return team;
    });

    setGeneratedTeams(updatedTeams, () => {
      // Check if player was found in a team after state update
      const updatedCurrentTeamIndex = generatedTeams.findIndex((team) =>
        team.some((p) => p.id === playerToMove.id)
      );
      if (updatedCurrentTeamIndex === -1) {
        console.error(`Player not found in any team: ${playerToMove.id}`);
        return;
      }
    });
  };

  const movePlayerToOtherTeam = (playerToMove) => {
    // Find the other team
    const currentTeamIndex = generatedTeams.findIndex((team) =>
      team.some((p) => p.id === playerToMove.id)
    );

    // Check if player was found in a team
    if (currentTeamIndex === -1) {
      console.error(`Player not found in any team: ${playerToMove.id}`);
      return;
    }

    const otherTeamIndex = currentTeamIndex === 0 ? 1 : 0;

    // Use the onMove function to move the player to the other team
    onMove(playerToMove, otherTeamIndex);
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

  return (
    <Container maxWidth="md">
      {/* Title */}
      <Typography
        variant="h4"
        gutterBottom
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        Team Generator
      </Typography>
      {/* Form Widget */}
      <GeneratorWidget
        selectedPlayers={selectedPlayers}
        players={players}
        filters={filters}
        loading={loading}
        setLoading={setLoading}
        setSelectedPlayers={setSelectedPlayers}
        createSortedPlayers={createSortedPlayers}
        distributePlayers={distributePlayers}
        setGeneratedTeams={setGeneratedTeams}
        setShowConfetti={setShowConfetti}
        setShowTeams={setShowTeams}
        numberOfTeams={numberOfTeams}
        setNumberOfTeams={setNumberOfTeams}
        setFilters={setFilters}
      />

      {showConfetti && <Confetti />}
      {/* Action Buttons */}
      {showTeams && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "20px 0",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleEditModeClick}
            style={{
              border: editMode? "solid 1px #FC4445": "solid 1px black",
              width: "30%",
              borderRadius: "5px",
              backgroundColor: editMode? "#FC4445" : "transparent"
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={handleShuffleClick}
            style={{
              border: "solid 1px black",
              width: "30%",
              borderRadius: "5px",
            }}
          >
            <ShuffleIcon />
          </IconButton>
          <IconButton
            onClick={handlePlayerInfoClick}
            style={{
              border: showPlayerInfo? "solid 1px #FC4445": "solid 1px black",
              width: "30%",
              borderRadius: "5px",
              backgroundColor: showPlayerInfo? "#FC4445" : "transparent"
            }}
          >
            <InfoIcon />
          </IconButton>
        </div>
      )}
      {/* Displayed Teams */}
      {showTeams && (
        <TeamDisplay
          teams={generatedTeams}
          editMode={editMode}
          movePlayerToOtherTeam={movePlayerToOtherTeam}
          setOpenDialog={setOpenDialog}
          setPlayerToMove={setPlayerToMove}
          showPlayerInfo={showPlayerInfo}
          skillGrouping={filters.skillGrouping}
        />
      )}

      <MovePlayerDialog
        open={openDialog}
        teams={generatedTeams}
        player={playerToMove}
        onMove={onMove}
        onClose={() => setOpenDialog(false)}
      />
    </Container>
  );
};

export default TeamGenerator;