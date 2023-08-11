import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Button,
  TableSortLabel,
  Typography,
} from "@mui/material";

const skillLevelOrder = ['Professional', 'Expert', 'Advanced', 'Intermediate', 'Beginner'];

function skillLevelComparator(a, b) {
  return skillLevelOrder.indexOf(a) - skillLevelOrder.indexOf(b);
}

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'skillLevel') {
    return skillLevelComparator(b[orderBy], a[orderBy]);
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const TeamDisplay = ({ teams, editMode, handleMoveClick, showPlayerInfo }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };

  return (
    <div>
      {teams.map((teamObj, index) => {
        const teamName = Object.keys(teamObj)[0];
        const players = teamObj[teamName];

        return (
          <Card key={index} style={{ marginBottom: "20px", textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h5">{teamName}</Typography>
              <Table>
              <TableHead>
                  <TableRow>
                    {showPlayerInfo && (
                      <>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      <TableSortLabel active={orderBy === 'name'} direction={order} onClick={createSortHandler('name')}>
                        Name
                      </TableSortLabel>
                    </TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>
                          <TableSortLabel active={orderBy === 'sex'} direction={order} onClick={createSortHandler('sex')}>
                            Sex
                          </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>
                          <TableSortLabel
                            active={orderBy === 'skillLevel'}
                            direction={order}
                            onClick={createSortHandler('skillLevel')}
                          >
                            Skill Level
                          </TableSortLabel>
                        </TableCell>
                        {editMode && <TableCell style={{ textAlign: 'center' }}>Action</TableCell>}
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(players, getComparator(order, orderBy)).map(
                    (player, playerIndex) => (
                      <TableRow key={playerIndex}>
                        <TableCell style={{ textAlign: 'center' }}>{player.name}</TableCell>
                        {showPlayerInfo && (
                          <>
                            <TableCell style={{ textAlign: 'center' }}>{player.sex}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{player.skillLevel}</TableCell>
                          </>
                        )}
                        {editMode && (
                          <TableCell style={{ textAlign: 'center' }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleMoveClick(player)}
                            >
                              Move
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TeamDisplay;