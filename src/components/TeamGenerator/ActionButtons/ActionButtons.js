import { IconButton } from "@mui/material";
import {
  Shuffle as ShuffleIcon,
  Info as InfoIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const ActionButtons = ({
  setEditMode,
  editMode,
  setShowConfetti,
  setLoading,
  generateTeams,
  setShowPlayerInfo,
  showPlayerInfo
}) => {
  const handleEditModeClick = () => {
    setShowPlayerInfo(false);
    setEditMode(!editMode);
  };

  const handleShuffleClick = async () => {
    setShowConfetti(true);
    setLoading(true);
    await generateTeams(true);
    setLoading(false);
  };  

  const handlePlayerInfoClick = () => {
    setEditMode(false);
    setShowPlayerInfo(!showPlayerInfo);
  };

  return (
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
          border: editMode ? "solid 1px #FC4445" : "solid 1px black",
          width: "30%",
          borderRadius: "5px",
          backgroundColor: editMode ? "#FC4445" : "transparent",
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
          border: showPlayerInfo ? "solid 1px #FC4445" : "solid 1px black",
          width: "30%",
          borderRadius: "5px",
          backgroundColor: showPlayerInfo ? "#FC4445" : "transparent",
        }}
      >
        <InfoIcon />
      </IconButton>
    </div>
  );
};

export default ActionButtons;