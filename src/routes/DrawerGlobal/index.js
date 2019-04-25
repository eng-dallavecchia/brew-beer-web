import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Toolbar, AppBar, Typography } from "@material-ui/core";
import {
  Menu as MenuIcon,
  Home,
  Assessment,
  Build,
  LocationCity
} from "@material-ui/icons";
import browserRouterService from "routes/browserRouterService";
import { withUIContext } from "contexts/UIContext";
import { withLoggedContext } from "contexts/LoggedContext";
import { withRouter } from "react-router";
import { compose } from "recompose";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  root2: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    backgroundColor: theme.palette.primary.main,
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: 80,
    marginTop: 85
  },
  logo: {
    width: 32,
    marginLeft: 32
  },
  space: {
    flexGrow: 1
  },
  franchise: {
    flexGrow: 1,
    color: "white",
    fontSize: 14,
    height: 35,
    lineHeight: 2.5,
    textAlign: "center",
    backgroundColor: theme.palette.primary.dark
  },
  button: {
    width: "100%"
  },
  drawerList: {
    marginTop: 28
  },
  activeDrawerRoute: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  },
  activeDrawerIcon: {
    color: "white"
  },
  activeDrawerText: {
    color: "white"
  },
  logoutIcon: {
    color: theme.palette.primary.dark
  },
  contentTabs: {
    justifyContent: "space-around"
  },
  profileIcon: {
    marginRight: 24
  },
  colorBranch: {
    color: "white",
    fontFamily: "Helvetica",
    fontSize: 16,
    marginRight: 16
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    isLogoutModalOpen: false,
    anchorEl: null,
    value: 0
  };

  constructor(props) {
    super(props);
    this.renderNavbar = this.renderNavbar.bind(this);
    this.handleBranchClick = this.handleBranchClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDrawerClick = this.handleDrawerClick.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDrawerClick = path => {
    browserRouterService.push(path);
    this.setState({ open: false });
  };

  renderTab() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root2}>
        <AppBar position="static" color="default">
          <Tabs
            classes={{ flexContainer: classes.contentTabs }}
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              onClick={() => this.handleDrawerClick("/brew/main")}
              label="Principal"
              icon={<Home />}
            />
            <Tab
              onClick={() => this.handleDrawerClick("/brew/graph")}
              label="Gráficos"
              icon={<Assessment />}
            />
            <Tab
              onClick={() => this.handleDrawerClick("/brew/calibration")}
              label="Calibração"
              icon={<Build />}
            />
          </Tabs>
        </AppBar>
      </div>
    );
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleBranchClick = companyBranch => {
    this.props.loggedContext.setCompany(companyBranch);
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    localStorage.setItem("token", null);
    window.location.replace("/");
  };

  handleMenuEl = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  renderChangeBranch() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <LocationCity nativeColor="white" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleClose}
        >
          {this.props.loggedContext.companyBranches.map(item => (
            <MenuItem
              key={item.id}
              onClick={() => this.handleBranchClick(item)}
            >
              {item.city}
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  }

  renderNavbar() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const Open = Boolean(anchorEl);
    return (
      <AppBar
        position="absolute"
        className={classNames(
          classes.appBar,
          this.state.open && classes.appBarShift
        )}
      >
        <Toolbar className={classes.toolbar} disableGutters={!this.state.open}>
          <img
            className={classes.logo}
            // src={require("assets/images/logo.png")}
            alt=""
          />
          <div className={classes.space} />
          {/* {this.renderChangeBranch()} */}

          <div className={classes.colorBranch}>
            {this.props.loggedContext.companyBranche.city}
          </div>

          <div className={classes.profileIcon}>
            <IconButton
              aria-owns={Open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenuEl}
            >
              <AccountCircle nativeColor="white" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Open}
              onClose={this.handleCloseEl}
            >
              <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
            </Menu>
          </div>
        </Toolbar>
        {this.renderTab()}
      </AppBar>
    );
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleCloseEl = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;

    console.log(this.props.history.location.pathname);

    return (
      <React.Fragment>
        <div className={classes.root}>
          {this.renderNavbar()}
          <main className={classes.content}>{this.props.children}</main>
        </div>
        <Dialog
          open={this.state.isLogoutModalOpen}
          onClose={() => this.setState({ isLogoutModalOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Sair?</DialogTitle>
          <DialogContent>
            <DialogContentText>Você realmente deseja sair?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ isLogoutModalOpen: false })}>
              Cancelar
            </Button>
            <Button onClick={this.handleLogout} autoFocus>
              Sair
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default compose(
  withUIContext,
  withRouter,
  withLoggedContext,
  withStyles(styles, { withTheme: true })
)(MiniDrawer);
