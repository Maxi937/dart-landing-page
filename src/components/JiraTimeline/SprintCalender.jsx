import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import SprintHover from "./SprintHover";

SprintCalender.propTypes = {
  sprints: PropTypes.array.isRequired,
};

const style = {
  stepper: {
    "& .MuiStepIcon-text": {
      display: "none",
    },
  },

  label: {
    fontSize: "8px",
    color: "white",
  },
};

function getActiveStep(sprints) {
  let activeStep = -1;

  sprints.map((sprint, index) => {
    if (sprint.state === "closed") {
      activeStep = index + 1;
    }
  });
  return activeStep;
}

function SprintCalender({ sprints }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);

  function handleMouseOver(event, sprint) {
    setSelectedSprint(sprint);
    console.log(sprint);
    setAnchorEl(event.currentTarget);
  }

  function handleMouseOut(event) {
    setSelectedSprint(null);
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Stepper activeStep={getActiveStep(sprints)} alternativeLabel>
      {sprints.map((sprint) => (
        <Step sx={style.stepper} key={sprint.id}>
          <StepLabel
            onMouseOver={(e) => {
              handleMouseOver(e, sprint);
            }}
            onMouseOut={handleMouseOut}
          >
            <Typography sx={style.label}>{sprint.name}</Typography>
          </StepLabel>
          <Popover
            sx={{
              pointerEvents: "none",
            }}
            id={id}
            disableRestoreFocus
            open={open}
            anchorEl={anchorEl}
            onClose={handleMouseOut}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            {selectedSprint && <SprintHover sprint={selectedSprint} />}
          </Popover>
        </Step>
      ))}
    </Stepper>
  );
}

export default SprintCalender;
