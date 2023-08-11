import React, { useState } from "react";
import { IconButton, Popover } from "@mui/material";
import Filter from "../Filter";
import { FilterList as FilterListIcon } from "@mui/icons-material";

function Widget({ topPriority, secondPriority, skillGrouping, setTopPriority, setSecondPriority, setSkillGrouping }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenFilterPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseFilterPopover = () => {
    setAnchorEl(null);
  };
  const handleFilterChange = (filter) => {
    console.log(filter)
    if(filter.topPriority){
      setTopPriority(filter.topPriority)
    } else if (filter.secondPriority){
      setSecondPriority(filter.secondPriority)
    } else if (filter.skillGrouping){
      setSkillGrouping(filter.skillGrouping)
    }
  };

  return (
    <>
      <IconButton onClick={handleOpenFilterPopover}>
        <FilterListIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseFilterPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Filter topPriority={topPriority} secondPriority={secondPriority} skillGrouping={skillGrouping} onFilterChange={handleFilterChange} />
      </Popover>
    </>
  );
}

export default Widget;