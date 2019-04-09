import React, { Component } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import ChartDoughnut from "components/ChartDoughnut";
import { instance } from "config/axios";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import { withUIContext } from "contexts/UIContext";
import { withLoggedContext } from "../../contexts/LoggedContext";
import { colors } from "util/styles/color";

const styles = {
  spinnerWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

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

  async fetchData() {
    const { id } = this.props.loggedContext.companyBranche;

    let revenueProducts = await instance().get(`/revenuesbyproduct/${id}`);
    let revenueProductType = await instance().get(
      `/revenuesbyproducttype/${id}`
    );

    this.setState({
      loading: false,

      data: {
        products: {
          labels: revenueProducts.data.data.map(item => item.nome),
          datasets: [
            {
              data: revenueProducts.data.data.map(item =>
                parseFloat(item.faturamento.replace(",", ""))
              ),
              backgroundColor: revenueProducts.data.data.map(
                (_, index) => colors[index]
              )
            }
          ]
        },
        productType: {
          labels: revenueProductType.data.data.map(item => item.nome),
          datasets: [
            {
              data: revenueProductType.data.data.map(item =>
                parseFloat(item.faturamento.replace(",", ""))
              ),
              backgroundColor: revenueProductType.data.data.map(
                (_, index) => colors[index]
              )
            }
          ]
        }
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
            <ChartDoughnut
              title="Faturamento por produto"
              data={this.state.data.products}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ChartDoughnut
              title="Faturamento por tipo de produto"
              data={this.state.data.productType}
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
