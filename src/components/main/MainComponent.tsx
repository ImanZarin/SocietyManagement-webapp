import React, { Component, Fragment } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import AdminHomeComponent from "../admin-home/AdminHomeComponent";

type MyProps1 = {};

type MyProps = MyProps1 & RouteComponentProps<{}>;

class MainComponent extends Component<MyProps> {
  constructor(props: MyProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <Fragment>
        <Switch>
          <Route path="/admin/owners">//admin-owners page</Route>
          <Route path="/admin" component={AdminHomeComponent} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(MainComponent);
