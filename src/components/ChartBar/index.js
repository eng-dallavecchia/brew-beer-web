import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography, withStyles } from "@material-ui/core";
import { withUIContext } from "contexts/UIContext";
import { compose } from "recompose";

const styles = theme => ({
  title: {
    fontSize: 18,
    width: "100%",
    textAlign: "center",
    marginBottom: 16
  },
  cardContent: {
    "&:last-child": {
      padding: 16
    }
  }
});

class ChartBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "Jan",
          "Fev",
          "Mar",
          "Abril",
          "Maio",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez"
        ],
        datasets: [
          {
            data: [
              20000,
              3000,
              15000,
              20000,
              3000,
              15000,
              20000,
              3000,
              15000,
              20012,
              40200,
              3000
            ],
            backgroundColor: [
              "rgba(213, 0, 12, 0.8)",
            ],
          },
          
        ]
      }
    };
  }

  static defaultProps = {
    displayTittle: true,
    displayLegend: true,
    legendPosition: "top"
  };

  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardContent>
          <Typography
            variant="display1"
            className={classes.title}
            color="textSecondary"
          >
            {this.props.title}
          </Typography>
          <Bar
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
export default compose(
  withStyles(styles),
  withUIContext
)(ChartBar);
