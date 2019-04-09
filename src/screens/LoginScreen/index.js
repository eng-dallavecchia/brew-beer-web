import React, { Component } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import CPF from "cpf";
import "./index.css";

const styles = theme => ({
  formControl: {
    width: 300,
    marginBottom: 15
  },
  underline: {
    "&:after": {
      borderBottomColor: "white"
    },
    "&:before": {
      borderBottomColor: "white"
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: "white"
    }
  },
  disabled: {},
  error: {},
  focused: {}
});

const CPFMask = props => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        ".",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        ".",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/
      ]}
      placeholderChar={"\u2000"}
    />
  );
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleLogin = this.handleLogin.bind(this);
  }

  async componentWillMount() {
    const token = localStorage.getItem("token");
    if (token !== "null") {
      try {
        await axios.get(`${process.env.REACT_APP_ERP_API}/validate`, {
          headers: { "x-access-token": localStorage.getItem("token") }
        });
        this.props.history.push("/brew/main");
      } catch (err) {
        localStorage.setItem("token", null);
      }
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    try {
      const user = await axios.post(`${process.env.REACT_APP_ERP_API}/auth`, {
        username: CPF.clear(this.state.username),
        password: this.state.password
      });
      localStorage.setItem("token", user.data.token);
      this.props.history.push("/brew/main");
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        this.setState({ message: "Usuário ou senha incorreto." });
      } else {
        this.setState({ message: "Ocorreu um erro na autenticação." });
      }
    }
  }

  render() {
    return (
      <div className="loginBody">
        <form onSubmit={e => { this.handleLogin(e); }} >
          <div className="formLogin">
          <Typography className="formMessage">{this.state.message}</Typography>
            <div className="wrapInput">
              <TextField
                id="username"
                type="text"
                label="CPF"
                onChange={event =>
                  this.setState({
                    username: event.target.value
                  })
                }
                value={this.state.username}
                InputProps={{
                  inputComponent: CPFMask,
                  style: { color: "white" },
                  classes: {
                    input: this.props.classes.input,
                    underline: this.props.classes.underline
                  }
                }}
                InputLabelProps={{
                  style: { color: "white" }
                }}
              />
            </div>
            <div className="wrapInput">
              <TextField
                id="password"
                type="password"
                label="Senha"
                // className={this.props.classes.formControl}
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
                value={this.state.password}
                InputProps={{
                  style: { color: "white" },
                  classes: {
                    input: this.props.classes.input,
                    underline: this.props.classes.underline
                  }
                }}
                InputLabelProps={{
                  style: { color: "white" }
                }}
              />
            </div>
          </div>
          <div className="formLogin">
            <Button
              id="startLogin"
              style={{
                fontWeight: "bold",
                // fontSize: '18px',
                margin: "0 auto",
                backgroundColor: "#fff",
                color: "#bd0014",
                border: "0px transparent"
              }}
              type="login"
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
