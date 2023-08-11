import React, { useState, useContext, useEffect } from "react";
import Confetti from "react-confetti";
import { Container, Typography } from "@mui/material";
import { usePlayers } from "../../hooks/usePlayers";
import { AuthContext } from "../../contexts/AuthContext";
import TeamDisplay from "./TeamDisplay";
import MovePlayerDialog from "./MovePlayerDialog";
import {
  getPlayersInfo,
  createGeneratedTeams,
  createTeams,
} from "./teamGeneratorUtils";
import Widget from "./Widget/Widget";
import ActionButtons from "./ActionButtons/ActionButtons";

const TeamGenerator = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.uid;
  const { players } = usePlayers(userId);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [playerToMove, setPlayerToMove] = useState({});
  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const [showConfetti, setShowConfetti] = useState(false);
  const [generatedTeams, setGeneratedTeams] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showPlayerInfo, setShowPlayerInfo] = useState(false);
  const [skillGrouping, setSkillGrouping] = useState("mixed");
  const [secondPriority, setSecondPriority] = useState("sex");
  const [topPriority, setTopPriority] = useState("skillLevel");

  const generateTeams = (shouldShuffle = false) => {
    let playersInfo = getPlayersInfo(selectedPlayers, players);
    if (shouldShuffle) {
      playersInfo = shuffleArray(playersInfo); // Shuffle the players using the shuffle function
    }
    if (playersInfo.length < numberOfTeams) {
      alert(
        `Please select at least ${numberOfTeams} players to generate ${numberOfTeams} teams`
      );
      setLoading(false);
      return;
    }
    const myTeams = createTeams(
      playersInfo,
      numberOfTeams,
      topPriority,
      secondPriority,
      generatedTeams,
      skillGrouping
    );
    setGeneratedTeams(myTeams);
    setShowTeams(true);
    setShowConfetti(true);
    setLoading(false);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const onMove = (playerToMove, newTeamIndex) => {
    // Check if newTeamIndex is valid
    if (newTeamIndex < 0 || newTeamIndex >= generatedTeams.length) {
      console.error(`Invalid team index: ${newTeamIndex}`);
      return;
    }
  
    // Find the current team of the player
    const currentTeamIndex = generatedTeams.findIndex((teamObj) => {
      const playersArray = Object.values(teamObj)[0];
      return playersArray.some((p) => p.id === playerToMove.id);
    });
  
    // Check if player was found in a team
    if (currentTeamIndex === -1) {
      console.error(`Player not found in any team: ${playerToMove.id}`);
      return;
    }
  
    // Get the current team's players array
    const currentTeamPlayers = Object.values(generatedTeams[currentTeamIndex])[0];
  
    // Remove the player from the current team
    const updatedCurrentTeamPlayers = currentTeamPlayers.filter(
      (p) => p.id !== playerToMove.id
    );
  
    // Get the new team's players array and add the player
    const newTeamPlayers = Object.values(generatedTeams[newTeamIndex])[0];
    const updatedNewTeamPlayers = [...newTeamPlayers, playerToMove];
  
    // Update the teams state
    const updatedTeams = generatedTeams.map((team, index) => {
      if (index === currentTeamIndex) {
        const teamName = Object.keys(team)[0];
        return { [teamName]: updatedCurrentTeamPlayers };
      }
      if (index === newTeamIndex) {
        const teamName = Object.keys(team)[0];
        return { [teamName]: updatedNewTeamPlayers };
      }
      return team;
    });
  
    // Set the updated teams
    setGeneratedTeams(updatedTeams);
  };
  

  const movePlayerToOtherTeam = (playerToMove) => {
  
    // Find the current team of the player
    const currentTeamIndex = generatedTeams.findIndex((teamObj) => {
      const playersArray = Object.values(teamObj)[0];
      return playersArray.some((p) => p.id === playerToMove.id);
    });
    
  
    // Check if player was found in a team
    if (currentTeamIndex === -1) {
      console.error(`Player not found in any team: ${playerToMove.id}`);
      return;
    }
  
    // If there are only two teams, automatically switch the player to the other team
    if (generatedTeams.length === 2) {
      const otherTeamIndex = currentTeamIndex === 0 ? 1 : 0;
      onMove(playerToMove, otherTeamIndex);
    } else {
      // If more than two teams, set the player to move and open the dialog
      setPlayerToMove(playerToMove);
      setOpenDialog(true);
    }
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
      <Widget
        selectedPlayers={selectedPlayers}
        players={players}
        loading={loading}
        setSelectedPlayers={setSelectedPlayers}
        setNumberOfTeams={setNumberOfTeams}
        generateTeams={generateTeams}
        topPriority={topPriority}
        secondPriority={secondPriority}
        skillGrouping={skillGrouping}
        setTopPriority={setTopPriority}
        setSecondPriority={setSecondPriority}
        setSkillGrouping={setSkillGrouping}
      />

      {/* {showConfetti && <Confetti />} */}
      {/* Action Buttons */}
      {showTeams ? (
        <>
          <ActionButtons
            setEditMode={setEditMode}
            editMode={editMode}
            setShowConfetti={setShowConfetti}
            setLoading={setLoading}
            generateTeams={generateTeams}
            setShowPlayerInfo={setShowPlayerInfo}
            showPlayerInfo={showPlayerInfo}
          />
          <TeamDisplay
            teams={generatedTeams}
            editMode={editMode}
            handleMoveClick={movePlayerToOtherTeam}
            setOpenDialog={setOpenDialog}
            setPlayerToMove={setPlayerToMove}
            showPlayerInfo={showPlayerInfo}
            skillGrouping={skillGrouping}
          />
        </>
      ) : null}

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