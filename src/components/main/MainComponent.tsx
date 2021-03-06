import React, { Component, Fragment } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { Role } from "../../shared/models";
import { AdminDoc } from "../admin-doc/AdminDocComponent";
import AdminElection from "../admin-election/AdminElectionComponent";
import AdminComponent from "../admin-main/AdminComponent";
import { AdminUserComponent } from "../admin-user/AdminUserComponent";
import { DocumentComponent } from "../document/DocumentComponent";
import { DocumentsComponent } from "../document/DocumentsComponent";
import { HomeComponent } from "../home/HomeComponent";
import LoginComponent from "../login/LoginComponent";
import { ProfileComponent } from "../user-main/ProfileComponent";

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
          <Route path="/admin/election" component={AdminElection} />
          <Route path="/admin/doc" component={AdminDoc} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/profile" component={ProfileComponent} />
          <Route path="/admin" component={AdminComponent} />
          <Route path="/documents/:id" component={DocumentComponent} />
          <Route path="/documents" component={DocumentsComponent} />
          <Route path="/" component={HomeComponent} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(MainComponent);
