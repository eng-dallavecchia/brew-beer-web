import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Drawer,
  MenuItem,
  Menu,
  Typography,
  Divider
} from "@material-ui/core";
import {
  ExitToApp,
  Menu as MenuIcon,
  ChevronRight,
  ChevronLeft,
  Home,
  Assessment,
  LocationCity,
  Build
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
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    isLogoutModalOpen: false
  };

  constructor(props) {
    super(props);
    this.renderNavbar = this.renderNavbar.bind(this);
    this.renderDrawer = this.renderDrawer.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderChangeFranchise = this.renderChangeFranchise.bind(this);
    this.handleFranchiseClick = this.handleFranchiseClick.bind(this);
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

  renderDrawer() {
    const { classes, theme } = this.props;
    const { windowWidth } = this.props.uiContext;
    return (
      <Drawer
        variant={windowWidth > 600 ? "permanent" : "temporary"}
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !this.state.open && classes.drawerPaperClose
          )
        }}
        open={this.state.open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRight nativeColor="white" />
            ) : (
              <ChevronLeft nativeColor="white" />
            )}
          </IconButton>
        </div>
        {this.renderMenu()}
      </Drawer>
    );
  }

  renderMenu() {
    const { pathname } = this.props.location;
    const { classes } = this.props;
    return (
      <List className={this.props.classes.drawerList}>
        <ListItem
          className={
            pathname === "/brew/main" ? classes.activeDrawerRoute : null
          }
          button
          onClick={() => this.handleDrawerClick("/brew/main")}
        >
          <ListItemIcon>
            <Home
              className={
                pathname === "/brew/main" ? classes.activeDrawerIcon : null
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary:
                pathname === "/brew/main" ? classes.activeDrawerText : null
            }}
          >
            Principal
          </ListItemText>
        </ListItem>

        <ListItem
          className={
            pathname === "/brew/graph" ? classes.activeDrawerRoute : null
          }
          button
          onClick={() => this.handleDrawerClick("/brew/graph")}
        >
          <ListItemIcon>
            <Assessment
              className={
                pathname === "/brew/graph" ? classes.activeDrawerIcon : null
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary:
                pathname === "/brew/graph" ? classes.activeDrawerText : null
            }}
          >
            Gráficos
          </ListItemText>
        </ListItem>

        <ListItem
          className={
            pathname === "/brew/calibration" ? classes.activeDrawerRoute : null
          }
          button
          onClick={() => this.handleDrawerClick("/brew/calibration")}
        >
          <ListItemIcon>
            <Build
              className={
                pathname === "/brew/calibration"
                  ? classes.activeDrawerIcon
                  : null
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary:
                pathname === "/brew/calibration"
                  ? classes.activeDrawerText
                  : null
            }}
          >
            Calibragem
          </ListItemText>
        </ListItem>

        <Divider />
        <ListItem
          button
          onClick={() => this.setState({ isLogoutModalOpen: true })}
        >
          <ListItemIcon>
            <ExitToApp className={classes.logoutIcon} />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.logoutIcon }}>
            Sair
          </ListItemText>
        </ListItem>
      </List>
    );
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleFranchiseClick = companyBranch => {
    this.props.loggedContext.setCompany(companyBranch);
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    localStorage.setItem("token", null);
    window.location.replace("/");
  };

  renderChangeFranchise() {
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
              onClick={() => this.handleFranchiseClick(item)}
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
    return (
      <AppBar
        position="absolute"
        className={classNames(
          classes.appBar,
          this.state.open && classes.appBarShift
        )}
      >
        <Toolbar className={classes.toolbar} disableGutters={!this.state.open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              this.state.open && classes.hide
            )}
          >
            <MenuIcon nativeColor="white" />
          </IconButton>
          <img
            className={classes.logo}
            // src={require("assets/images/logo.png")}
            alt=""
          />
          <div className={classes.space} />
          {this.renderChangeFranchise()}
        </Toolbar>
        <Typography className={classes.franchise}>
          {this.props.loggedContext.companyBranche.city}
        </Typography>
      </AppBar>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          {this.renderNavbar()}
          {this.renderDrawer()}
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
