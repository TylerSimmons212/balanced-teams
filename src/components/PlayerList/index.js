import React, { useState, useEffect } from "react";
import {
  IconButton,
  Modal,
  Box,
  Card,
  Button,
  Menu,
  MenuItem,
  CardContent,
  CardActions,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableSortLabel,
  TableHead,
  Typography,
  TableRow,
  TableFooter,
  useMediaQuery,
  TextField,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  SwapVert as SwapVertIcon
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { usePlayers } from "../../hooks/usePlayers";
import PlayerForm from "../PlayerForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
};
const skillLevels = {
  Professional: 5,
  Expert: 4,
  Advanced: 3,
  Intermediate: 2,
  Beginner: 1,
};

const PlayerList = ({ userId }) => {
  const { players, addPlayer, updatePlayer, deletePlayer } = usePlayers(userId);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    handleSort(value);
    handleClose();
  };

  const handleEditClick = (player) => {
    setSelectedPlayer(player);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setSelectedPlayer(null);
    setOpenForm(false);
  };

  const handleDeleteClick = async (playerId) => {
    await deletePlayer(playerId);
  };

  const handleUpdatePlayer = async (updatedPlayer) => {
    await updatePlayer(selectedPlayer.id, updatedPlayer);
    handleCloseForm();
  };

  const handleAddPlayer = async (newPlayer) => {
    await addPlayer(newPlayer);
    handleCloseForm();
  };

  const getSexInitial = (sex) => {
    return sex.charAt(0);
  };

  const handleSort = (columnName) => {
    let direction = "asc";
    if (sortConfig.key === columnName && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnName, direction });
  };

  const sortedPlayers = React.useMemo(() => {
    let sortableItems = [...players];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === "skillLevel") {
          const aValue = skillLevels[a[sortConfig.key]];
          const bValue = skillLevels[b[sortConfig.key]];
          if (aValue < bValue) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [players, sortConfig]);

  const filteredPlayers = sortedPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
    <Box display="flex" justifyContent="space-between" marginBottom="20px">
      <Typography variant="h4">Players</Typography>
      <IconButton
        sx={{ backgroundColor: "#000", color: "#fff" }}
        onClick={() => setOpenForm(true)}
      >
        <AddIcon />
      </IconButton>
    </Box>
    <Box display="flex" justifyContent="space-between" marginBottom="20px">
      <TextField
        label="Search Players"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SwapVertIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick("skillLevel")}>
          Skill Level
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("height")}>Height</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("sex")}>Sex</MenuItem>
      </Menu>
    </Box>
    {isMobile ? (
      filteredPlayers.map((player) => (
          <Card style={{ marginBottom: "15px", padding: "15px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <Typography variant="h6">{player.name}</Typography>
              <IconButton edge="end" onClick={() => handleEditClick(player)}>
                <EditIcon />
              </IconButton>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2">
                Sex: {getSexInitial(player.sex)}
              </Typography>
              <Typography variant="body2">Height: {player.height}</Typography>
              <Typography variant="body2">
                Skill Level: {player.skillLevel}
              </Typography>
            </div>
          </Card>
        ))
      ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === "name"}
                      direction={sortConfig.direction}
                      onClick={() => handleSort("name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === "sex"}
                      direction={sortConfig.direction}
                      onClick={() => handleSort("sex")}
                    >
                      Sex
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === "height"}
                      direction={sortConfig.direction}
                      onClick={() => handleSort("height")}
                    >
                      Height
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === "skillLevel"}
                      direction={sortConfig.direction}
                      onClick={() => handleSort("skillLevel")}
                    >
                      Skill Level
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{getSexInitial(player.sex)}</TableCell>
                    <TableCell>{player.height}</TableCell>
                    <TableCell>{player.skillLevel}</TableCell>
                    <TableCell>
                      <IconButton
                        edge="end"
                        onClick={() => handleEditClick(player)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6} align="right">
                    Total Players: {players.length}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
      )}
      <Modal
        open={openForm}
        onClose={handleCloseForm}
        style={{ margin: "10px" }}
      >
        <Box sx={style}>
          <PlayerForm
            selectedPlayer={selectedPlayer}
            onSubmit={selectedPlayer ? handleUpdatePlayer : handleAddPlayer}
            onCancel={handleCloseForm}
            submitText={selectedPlayer ? "Update Player" : "Add Player"}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default PlayerList;