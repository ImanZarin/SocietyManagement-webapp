import React from "react";
import { useHistory } from "react-router-dom";
import { MyStorage } from "../../shared/Enums";
import { MyStrings } from "../../shared/myStrings";

function AdminHomeComponent(): JSX.Element {
  const history = useHistory();
  return (
    <div className="row mt-3">
      <button
        className="btn btn-primary btn-large btn-block col-5 mr-auto  ml-auto mt-5"
        onClick={() => history.push("/admin/owner")}
      >
        {MyStrings.admin_home_btn_owner}
      </button>
      <button
        className="btn btn-primary btn-large btn-block col-5 mr-auto  ml-auto mt-5"
        onClick={() => history.push("/admin/tenant")}
      >
        {MyStrings.admin_home_btn_tenant}
      </button>
      <button
        className="btn btn-primary btn-large btn-block col-5 mr-auto  ml-auto mt-5"
        onClick={() => history.push("/admin/staff")}
      >
        {MyStrings.admin_home_btn_staff}
      </button>
      <button
        className="btn btn-primary btn-large btn-block col-5 mr-auto  ml-auto mt-5"
        onClick={() => history.push("/admin/")}
      >
        {MyStrings.admin_home_btn_house}
      </button>
      <button
        className="btn btn-primary btn-large btn-block col-5 mr-auto ml-auto mt-5"
        onClick={() => {
          localStorage.setItem(MyStorage.prePg, "/admin");
          history.push("/login");
        }}
      >
        {MyStrings.admin_home_btn_news}
      </button>
      <button
        className="btn btn-primary btn-large btn-block col-5 mr-auto  ml-auto mt-5"
        onClick={() => history.push("/admin/")}
      >
        {MyStrings.admin_home_btn_election}
      </button>
    </div>
  );
}

export default AdminHomeComponent;
