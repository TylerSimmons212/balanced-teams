import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Filter({ topPriority, secondPriority, skillGrouping, onFilterChange }) {

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({ [name]: value });
  };

  return (
    <Box sx={{ p: 2 }}>
      <FormControl
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
      >
        <InputLabel>Top Priority</InputLabel>
        <Select
          value={topPriority}
          onChange={handleFilterChange}
          label="Top Priority"
          name="topPriority"
        >
          <MenuItem value="sex">Sex</MenuItem>
          <MenuItem value="skillLevel">Skill Level</MenuItem>
          <MenuItem value="height">Height</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth style={{ marginBottom: "20px" }}>
        <InputLabel>Second Priority</InputLabel>
        <Select
          value={secondPriority}
          onChange={handleFilterChange}
          label="Second Priority"
          name="secondPriority"
        >
          <MenuItem value="sex">Sex</MenuItem>
          <MenuItem value="skillLevel">Skill Level</MenuItem>
          <MenuItem value="height">Height</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Skill Grouping</InputLabel>
        <Select
          value={skillGrouping || 'mixed'}
          onChange={handleFilterChange}
          label="Skill Grouping"
          name="skillGrouping"
        >
          <MenuItem value="mixed">Mixed</MenuItem>
          <MenuItem value="separated">Separated</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Filter;