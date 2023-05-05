import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const PlayerForm = ({ onSubmit, selectedPlayer, showCancelButton = true, onCancel }) => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [skillLevel, setSkillLevel] = useState("");

  useEffect(() => {
    if (selectedPlayer) {
      setName(selectedPlayer.name);
      setSex(selectedPlayer.sex);
      setHeightFeet(Number(selectedPlayer.height.split("'")[0]));
      setHeightInches(
        Number(selectedPlayer.height.split("'")[1].replace('"', ""))
      );
      setSkillLevel(selectedPlayer.skillLevel);
    }
  }, [selectedPlayer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      sex,
      height: `${heightFeet}'${heightInches}"`,
      skillLevel,
    });
  };  

  return (
    <form style={{ padding: "10px" }} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Sex</InputLabel>
            <Select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              label="Sex"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Feet</InputLabel>
            <Select
              value={heightFeet}
              onChange={(e) => setHeightFeet(e.target.value)}
              label="Feet"
            >
              {Array.from({ length: 4 }, (_, i) => i + 4).map((ft) => (
                <MenuItem key={ft} value={ft}>
                  {ft}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Inches</InputLabel>
            <Select
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
              label="Inches"
            >
              {Array.from({ length: 12 }, (_, i) => i).map((inch) => (
                <MenuItem key={inch} value={inch}>
                  {inch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Skill Level</InputLabel>
            <Select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              label="Skill Level"
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
              <MenuItem value="Expert">Expert</MenuItem>
              <MenuItem value="Professional">Professional</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        {selectedPlayer ? "Save Changes" : "Add Player"}
      </Button>
      {showCancelButton && (
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          style={{ marginTop: "10px" }}
        >
          Cancel
        </Button>
      )}
    </form>
  );
};

export default PlayerForm;
