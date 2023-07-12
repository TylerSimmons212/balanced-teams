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

export const distributePlayers = (players, numberOfTeams, filters) => {
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

export const comparePlayers = (a, b, priority) => {
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
