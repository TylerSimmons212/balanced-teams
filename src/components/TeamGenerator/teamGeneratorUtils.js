export const getPlayersInfo = (playerIds, players) => {
  const foundPlayers = playerIds.map((playerId) =>
    players.find((player) => player.id === playerId)
  );
  return foundPlayers.filter((player) => player !== undefined);
};

const convertHeightToInches = (heightString) => {
  const heightWithoutQuote = heightString.replace('"', ""); // Remove the trailing "
  const [feet, inches] = heightWithoutQuote.split("'").map(Number);
  return feet * 12 + inches;
};


// Helper function to distribute players
const distributePlayers = (
  sortedPlayers,
  teams,
  numberOfTeams,
  topPriority
) => {
  let currentTeam = 0;

  // Distribute players by pairing from the front and end of the sorted players list
  while (sortedPlayers.length > 0) {
    if (topPriority === "skilLevel") {
      // Take a player from the front of the sorted list
      const frontPlayer = sortedPlayers.shift();
      if (frontPlayer) {
        teams[currentTeam][`Team ${currentTeam + 1}`].push(frontPlayer);
      }
      // Take a player from the end of the sorted list
      const endPlayer = sortedPlayers.pop();
      if (endPlayer) {
        teams[currentTeam][`Team ${currentTeam + 1}`].push(endPlayer);
      }
    } else {
      // Add a player to the current team
      teams[currentTeam][`Team ${currentTeam + 1}`].push(sortedPlayers.shift());
    }

    // Move to the next team, and wrap around if necessary
    currentTeam = (currentTeam + 1) % numberOfTeams;
  }
};

// Main function to create teams
export const createTeams = (
  playersInfo,
  numberOfTeams,
  topPriority,
  secondPriority,
  generatedTeams,
  skillGrouping
) => {
  // Organizing the players by category
  console.log("Previous Teams?", generatedTeams);
  const skillLevels = {
    Professional: [],
    Expert: [],
    Advanced: [],
    Intermediate: [],
    Beginner: [],
  };
  const sexes = {
    Male: [],
    Female: [],
  };
  playersInfo.forEach((player) => {
    player.heightInInches = convertHeightToInches(player.height);
    skillLevels[player.skillLevel].push(player);
    sexes[player.sex].push(player);
  });

  // Setup empty team arrays
  let teams = Array.from({ length: numberOfTeams }, (_, i) => ({
    [`Team ${i + 1}`]: [],
  }));
  console.log(teams);

  // Define the skill levels in descending order
  const skillOrder = [
    "Professional",
    "Expert",
    "Advanced",
    "Intermediate",
    "Beginner",
  ];

  // Distribution logic based on priorities
  let sortedPlayers = [];
  if (topPriority === "skillLevel") {
    if (secondPriority === "sex") {
      skillOrder.forEach((skillLevel) => {
        ["Male", "Female"].forEach((sex) => {
          sortedPlayers = sortedPlayers.concat(
            skillLevels[skillLevel].filter((player) => player.sex === sex)
          );
        });
      });
    } else if (secondPriority === "height") {
      skillOrder.forEach((skillLevel) => {
        const group = skillLevels[skillLevel].slice();
        group.sort((a, b) => b.heightInInches - a.heightInInches);
        sortedPlayers = sortedPlayers.concat(group);
      });
    }
  } else if (topPriority === "sex") {
    if (secondPriority === "skillLevel") {
      ["Male", "Female"].forEach((sex) => {
        skillOrder.forEach((skillLevel) => {
          sortedPlayers = sortedPlayers.concat(
            skillLevels[skillLevel].filter((player) => player.sex === sex)
          );
        });
      });
    } else if (secondPriority === "height") {
      ["Male", "Female"].forEach((sex) => {
        const group = sexes[sex].slice();
        group.sort((a, b) => b.heightInInches - a.heightInInches);
        sortedPlayers = sortedPlayers.concat(group);
      });
    }
  } else if (topPriority === "height") {
    if (secondPriority === "skillLevel") {
      const allPlayers = playersInfo.slice();
      allPlayers.sort((a, b) => b.heightInInches - a.heightInInches);
      skillOrder.forEach((skillLevel) => {
        sortedPlayers = sortedPlayers.concat(
          allPlayers.filter((player) => player.skillLevel === skillLevel)
        );
      });
    } else if (secondPriority === "sex") {
      const allPlayers = playersInfo.slice();
      allPlayers.sort((a, b) => b.heightInInches - a.heightInInches);
      ["Male", "Female"].forEach((sex) => {
        sortedPlayers = sortedPlayers.concat(
          allPlayers.filter((player) => player.sex === sex)
        );
      });
    }
  }

  // Call the distribution helper function
  distributePlayers(sortedPlayers, teams, numberOfTeams, topPriority);

  return teams;
};
