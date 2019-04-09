import React, { Component } from "react";
import { Scatter } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

const styles = {
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
};

class ChartLine extends Component {
  constructor(props) {
    super(props);

    let actualDay = moment().date();

    this.state = {
      actualDay
    };
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
          <Scatter
            data={this.props.data}
            options={{
              scales: {
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Dia do mês"
                    },
                    ticks: {
                      min: 1,
                      max: this.state.actualDay + 1
                    }
                  }
                ],
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Faturamento em R$"
                    }
                  }
                ]
              },

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
