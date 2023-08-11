import { FormControl, TextField } from "@mui/material";

function NumberOfTeams({ setNumberOfTeams }) {
  return (
    <FormControl variant="outlined" fullWidth>
      <TextField
        id="outlined-number"
        label="Number of Teams"
        type="number"
        inputProps={{ inputMode: "numeric" }}
        onChange={(event) => {
          setNumberOfTeams(event.target.value);
        }}
      />
    </FormControl>
  );
}

export default NumberOfTeams;