export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const createSortedPlayers = (playerIds, players) => {
  const sortedPlayers = playerIds.map((playerId) =>
    players.find((player) => player.id === playerId)
  );
  return sortedPlayers.filter((player) => player !== undefined);
};

export const skillLevels = {
  "Beginner": 1,
  "Intermediate": 2,
  "Advanced": 3,
  "Expert": 4,
  "Professional": 5
};

export const distributePlayers = (players, numberOfTeams, filters) => {
  let sortedPlayers = [...players].sort((a, b) => comparePlayers(a, b, "skillLevel"));

  const newTeams = Array.from({ length: numberOfTeams }, () => []);

  if (filters.skillGrouping === "separated" && numberOfTeams > 3) {
    let topPlayers = sortedPlayers.filter(player => ["Professional", "Expert", "Advanced"].includes(player.skillLevel));
    let bottomPlayers = sortedPlayers.filter(player => ["Intermediate", "Beginner"].includes(player.skillLevel));

    let playersForTopTeams = topPlayers.splice(0, Math.ceil(numberOfTeams / 2) * Math.ceil(players.length / numberOfTeams));
    let playersForBottomTeams = [...topPlayers, ...bottomPlayers];

    playersForTopTeams.forEach((player, index) => {
      newTeams[index % Math.ceil(numberOfTeams / 2)].push(player);
    });

    playersForBottomTeams.forEach((player, index) => {
      newTeams[Math.ceil(numberOfTeams / 2) + index % Math.floor(numberOfTeams / 2)].push(player);
    });
  } else {
    sortedPlayers.forEach((player, index) => {
      const teamIndex = index % numberOfTeams;
      newTeams[teamIndex].push(player);
    });
  }

  return newTeams;
};


export const comparePlayers = (a, b, priority) => {
  console.log(a,b, priority)
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