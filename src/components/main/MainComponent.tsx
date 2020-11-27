import React, { Component, Fragment } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { Role } from "../../shared/models";
import AdminHomeComponent from "../admin-home/AdminHomeComponent";
import { AdminUserComponent } from "../admin-user/AdminUserComponent";

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
          <Route
            path="/admin/owner"
            component={(): JSX.Element => (
              <AdminUserComponent role={Role.owner}></AdminUserComponent>
            )}
          />
          <Route
            path="/admin/tenant"
            component={(): JSX.Element => (
              <AdminUserComponent role={Role.tenent}></AdminUserComponent>
            )}
          />
          <Route
            path="/admin/staff"
            component={(): JSX.Element => (
              <AdminUserComponent role={Role.staff}></AdminUserComponent>
            )}
          />
          <Route path="/admin" component={AdminHomeComponent} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(MainComponent);
