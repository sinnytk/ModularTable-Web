import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    minWidth: "1.1vw",
    minHeight: "5vw"
  },
  content: { paddingTop: "10%" }
}));

const placeholder = { teacher: null, section: null, course: null };
const Slot = ({ attributes }) => {
  attributes = attributes.teacher ? attributes : placeholder;
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {
        <div className={classes.content}>
          <Typography variant="caption" display="block">
            {attributes.teacher && `${attributes.teacher.teachername}`}
          </Typography>
          <Typography variant="caption" display="block">
            {attributes.section &&
              `${attributes.section.semester}${attributes.section.section}`}
          </Typography>
          <Typography variant="caption" display="block">
            {attributes.course && `${attributes.course.coursecode}`}
          </Typography>
        </div>
      }
    </Paper>
  );
};

export default Slot;
