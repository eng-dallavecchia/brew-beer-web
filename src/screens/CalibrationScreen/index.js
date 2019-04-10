import React, { Component } from "react";
import {
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Button
} from "@material-ui/core";
import ChartLine from "components/ChartLine";
import ChartBarHorizontal from "components/ChartBarHorizontal";
import ChartDoughnut from "components/ChartDoughnut";
import CardKeyValue from "components/CardKeyValue";
import { AttachMoney, Build } from "@material-ui/icons";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import { withUIContext } from "contexts/UIContext";
import { withLoggedContext } from "../../contexts/LoggedContext";
import { instance } from "config/axios";

const styles = theme => ({
  gridStyle: {
    display: "flex",
    justifyContent: "center"
  },
  typographyStyle: {
    marginTop: 32
  },
  buttonStyle: {
    marginTop: 8,
    backgroundColor: "#c93b0e",
    "&:hover": {
      backgroundColor: "#ff7043",
      color: "#fff",
      "&:active": {
        color: "#ff7043"
      }
    }
  }
});

class calibrationScreen extends Component {
  state = {
    name: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  async click(value) {
    value = value.replace(",", ".");

    if (value) {
      await instance().post(`/calibration`, {
        sensorId: "35",
        calibrationNumber: value
      });

      alert("Sensor 100 calibrado com sucesso!");
    } else {
      alert("Por favor, insira um valor.");
    }

    this.setState({ name: "" });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.gridStyle}>
          <Typography className={classes.typographyStyle}>
            Por favor, digite o fator de calibração
          </Typography>
        </Grid>
        <Grid className={classes.gridStyle}>
          <TextField
            id="standard-name"
            label="Calibração"
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
          />
        </Grid>
        <Grid className={classes.gridStyle}>
          <Button
            onClick={() => this.click(this.state.name)}
            className={classes.buttonStyle}
          >
            <Build nativeColor="white" />
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

export default compose(
  withStyles(styles),
  withUIContext,
  withLoggedContext
)(calibrationScreen);
