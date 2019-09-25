import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const days = [
  "",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY"
];

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    height: "15vh",
    width: "20vh",
    padding: theme.spacing(3, 2),
    margin: "5px"
  }
}));

const Slot = ({ attributes }) => {
  const isEmpty = attributes.teacher ? false : true;
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {!isEmpty && (
        <div>
          <Typography component="p">{days[attributes["daynum"]]}</Typography>
          <Typography component="p">{attributes.venue.venuename}</Typography>
          <Typography component="p">
            {` ${attributes.timeslot.starttime} - ${attributes.timeslot.endtime}`}
          </Typography>
          <Typography component="p">
            {attributes.teacher && `${attributes.teacher.teachername}`}
          </Typography>
          <Typography component="p">
            {attributes.section &&
              `${attributes.section.semester}${attributes.section.section}`}
          </Typography>
          <Typography component="p">
            {attributes.course && `${attributes.course.coursecode}`}
          </Typography>
        </div>
      )}
    </Paper>
  );
};

export default Slot;
