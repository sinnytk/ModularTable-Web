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
    minWidth: 150,
    minHeight: 120,
    width: "100%",
    height: "100%",
    textAlign: "center"
  },
  content: { padding: "10%" }
}));

const Slot = ({ attributes }) => {
  const isEmpty = attributes.teacher ? false : true;
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {!isEmpty && (
        <div className={classes.content}>
          <Typography component="p" variant="body2">
            {attributes.teacher && `${attributes.teacher.teachername}`}
          </Typography>
          <Typography component="p" variant="body2">
            {attributes.section &&
              `${attributes.section.semester}${attributes.section.section}`}
          </Typography>
          <Typography component="p" variant="body2">
            {attributes.course && `${attributes.course.coursecode}`}
          </Typography>
        </div>
      )}
    </Paper>
  );
};

export default Slot;
