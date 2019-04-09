import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  title: {
    fontSize: 14,
    marginBottom: 8
  },
  value: {
    fontSize: 24
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    "&:last-child": {
      padding: 16
    }
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: 40
  },
  valueWrap: {
    flex: 2,
    marginRight: 24
  }
});

export const CardKeyValue = props => {
  const { classes } = props;
  const Icon = props.icon;
  return (
    <Card className={props.className}>
      <CardContent className={classes.cardContent}>
        <div className={classes.valueWrap}>
          <Typography
            variant="display1"
            className={classes.title}
            color="textSecondary"
          >
            {props.label}
          </Typography>
          <Typography variant="title" className={classes.value}>
            {props.value}
          </Typography>
        </div>
        {Icon ? <Icon className={classes.icon} /> : null}
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(CardKeyValue);
