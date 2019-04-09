import React, { Component } from "react";
import { Line } from "react-chartjs-2";
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

class ChartLine extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   chartData: {
    //     labels: ["01/07", "05/07", "10/07", "15/07", "20/07", "25/07", "30/07"],
    //     datasets: [
    //       {
    //         label: "Faturamento do Dia",
    //         data: [2000, 1000, 1500, 1500, 1500, 2000, 2300],
    //         backgroundColor: [
    //           "rgba(213, 0, 12, 0.8)",
    //           "rgba(232, 159, 3, 0.8)",
    //           "rgba(243, 123, 3, 0.8)"
    //         ],
    //         borderColor: [
    //           "rgba(255,255,255,1)",
    //           "rgba(255,255,255,1)",
    //           "rgba(255,255,255,1)"
    //         ]
    //       }
    //     ]
    //   }
    // };
  }

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
          <Line
            data={this.props.data}
            options={{
              responsive: true,
              legend: {
                display: false
              }
            }}
          />
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(styles)(ChartLine);
