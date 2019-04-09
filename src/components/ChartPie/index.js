import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  title: {
    fontSize: 18,
    // fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    // color: "black",
    marginBottom: 16
  },
  cardContent: {
    "&:last-child": {
      padding: 16
    }
  }
});

class ChartPie extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardContent className={classes.cardContent}>
          <Typography
            variant="display1"
            className={classes.title}
            color="textSecondary"
          >
            {this.props.title}
          </Typography>
          <Pie
            data={this.props.data}
            options={{
              responsive: true,
            }}
          />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ChartPie);
