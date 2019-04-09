import React from "react";
import { instance } from "config/axios";

const { Provider, Consumer } = React.createContext();

export class LoggedProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      companyBranches: [],
      companyBranche: {},
      setCompany: companyBranche => this.setState({ companyBranche })
    };
  }

  async componentDidMount() {
    const companyBranches = await instance().get("/company-branch");
    this.setState({
      loading: false,
      companyBranches: companyBranches.data,
      companyBranche: companyBranches.data[0]
    });
  }

  render() {
    return (
      <Provider value={this.state}>
        {!this.state.loading ? this.props.children : null}
      </Provider>
    );
  }
}

export const withLoggedContext = Component => props => (
  <LoggedConsumer>
    {context => <Component {...props} loggedContext={context} />}
  </LoggedConsumer>
);

export const LoggedConsumer = Consumer;
