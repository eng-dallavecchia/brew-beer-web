import React from "react";

const { Provider, Consumer } = React.createContext();

export class UIProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      isDrawerCollapsed: props.isDrawerCollapsed,
      toggleDrawer: () =>
        this.setState({ isDrawerCollapsed: !this.state.isDrawerCollapsed })
    };
  }
  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export const withUIContext = Component => props => (
  <UIConsumer>
    {context => <Component {...props} uiContext={context} />}
  </UIConsumer>
);

export const UIConsumer = Consumer;
