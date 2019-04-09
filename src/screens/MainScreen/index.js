import React, { Component } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import ChartLine from "components/ChartLine";
import ChartBarHorizontal from "components/ChartBarHorizontal";
import ChartDoughnut from "components/ChartDoughnut";
import CardKeyValue from "components/CardKeyValue";
import { AttachMoney } from "@material-ui/icons";
import { FolderShared } from "@material-ui/icons";
import { LocalAtm } from "@material-ui/icons";
import { InsertChart } from "@material-ui/icons";
import { instance } from "config/axios";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import { withUIContext } from "contexts/UIContext";
import { withLoggedContext } from "../../contexts/LoggedContext";
import { LocalDrink } from "@material-ui/icons";
import { toBRL } from "util/currency";
import { colors } from "util/styles/color";
import moment from "moment";

const styles = theme => ({
  spinnerWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

class MainScreen extends Component {
  state = {
    loading: true,
    data: {}
  };

  async componentDidMount() {
    await this.fetchData();
  }
  async componentDidUpdate(prevProps) {
    const { id } = this.props.loggedContext.companyBranche;
    const prevId = prevProps.loggedContext.companyBranche.id;
    if (id !== prevId && !this.state.loading) {
      this.setState({ loading: true });
      await this.fetchData();
    }
  }

  convertDay(date) {
    let convert =
      moment(date).date() +
      moment(date).hour() / 24 +
      moment(date).minute() / (24 * 60);

    return convert;
  }

  async fetchData() {
    const { id } = this.props.loggedContext.companyBranche;
    const totalDay = await instance().get(`/branchrevenuesthisday/${id}`);
    const totalMonth = await instance().get(`/branchrevenuesthismonth/${id}`);
    const graphDayOfMonth = await instance().get(`/graphmonth/${id}`);

    let revenueTotalMonth = totalMonth.data.data.faturamento;

    let literTotalMonth = totalMonth.data.data.litros;

    let revenueTotalDay = totalDay.data.data.faturamento;

    let literTotalDay = totalDay.data.data.litros;

    this.setState({
      loading: false,
      revenueTotalMonth,
      literTotalMonth,
      revenueTotalDay,
      literTotalDay,
      data: {
        ...graphDayOfMonth,
        dailyMonthRevenue: {
          labels: graphDayOfMonth.data.data.map(item => item.dia),
          datasets: [
            {
              data: graphDayOfMonth.data.data.map(item =>
                parseFloat(item.faturamento.replace(",", ""))
              ),
              backgroundColor: ["rgba(255,112,67,1)"],
              borderColor: ["rgba(201,59,14,1)"]
            }
          ]
        }

        // dailyMonthRevenue: {
        //   labels: ["Scatter"],
        //   datasets: [
        //     {
        //       // label: "My First dataset",
        //       fill: false,
        //       showLine: true, //!\\ Add this line
        //       backgroundColor: "rgba(75,192,192,0.4)",
        //       pointBorderColor: "rgba(75,192,192,1)",
        //       pointBackgroundColor: "#fff",
        //       pointBorderWidth: 1,
        //       pointHoverRadius: 5,
        //       pointHoverBackgroundColor: "rgba(75,192,192,1)",
        //       pointHoverBorderColor: "rgba(220,220,220,1)",
        //       pointHoverBorderWidth: 2,
        //       pointRadius: 1,
        //       pointHitRadius: 10,

        //       data: graphDayOfMonth.data.data.map(item => {
        //         return {
        //           x: item.dia,
        //           y: item.faturamento
        //         };
        //       })
        //     }
        //   ]
        // }
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className={this.props.classes.spinnerWrapper}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <React.Fragment>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <CardKeyValue
              icon={AttachMoney}
              label="Faturamento total (mensal)"
              value={toBRL(this.state.revenueTotalMonth)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardKeyValue
              icon={LocalDrink}
              label="Total de litros(mensal)"
              value={this.state.literTotalMonth}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardKeyValue
              icon={AttachMoney}
              label="Faturamento total (diário)"
              value={toBRL(this.state.revenueTotalDay)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardKeyValue
              icon={LocalDrink}
              label="Total de litros(diário)"
              value={this.state.literTotalDay}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ChartLine
              title="Faturamento neste mês"
              data={this.state.data.dailyMonthRevenue}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default compose(
  withStyles(styles),
  withUIContext,
  withLoggedContext
)(MainScreen);
