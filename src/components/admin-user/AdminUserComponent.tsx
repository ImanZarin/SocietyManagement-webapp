import { useQuery } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { Role, IUser, IHouse } from "../../shared/models";
import { MyStrings } from "../../shared/myStrings";
import { Loading } from "../LoadingComponent";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import UserForm from "./AdminUserForm";
import { myGQL } from "../../shared/myQuery.gql";

type MyProps = {
  role: Role;
};

interface userData {
  users: IUser[];
  vacants: IHouse[];
}

export function AdminUserComponent(props: MyProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser]: [undefined | IUser, any] = useState();
  let myQueryCommand;
  if (props.role === Role.staff) myQueryCommand = myGQL.GET_STAFF;
  else myQueryCommand = myGQL.GET_USERS_VACANTS;
  const { loading, error, data } = useQuery<userData, { role: string }>(
    myQueryCommand,
    {
      variables: { role: props.role },
    }
  );

  if (loading) return <Loading />;
  else if (error) {
    console.log("my error: ", error);
    return <div>{MyStrings.error_general}</div>;
  } else {
    return (
      <Fragment>
        <table className="table table-hover">
          <thead>
            <tr>
              <th
                style={{
                  display: props.role === Role.staff ? "block" : "none",
                }}
              >
                {MyStrings.admin_user_table_1_staff}
              </th>
              <th
                style={{
                  display: props.role === Role.staff ? "none" : "block",
                }}
              >
                {MyStrings.admin_user_table_1_user}
              </th>
              <th>{MyStrings.admin_user_table_2}</th>
              <th>{MyStrings.admin_user_table_3}</th>
              <th>{MyStrings.admin_user_table_4}</th>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user) => {
              return (
                <tr
                  key={user._id}
                  onClick={() => {
                    setCurrentUser(user);
                    setModalOpen(true);
                  }}
                >
                  <td>
                    {props.role === Role.staff
                      ? user.position
                      : user.house?.flatNo}
                  </td>
                  <td>
                    {user.firstName} &nbsp;
                    {user.lastName}
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="btn btn-outline-primary m-auto btn-circle"
          onClick={() => {
            setCurrentUser(undefined);
            setModalOpen(true);
          }}
        >
          +
        </button>
        <Modal
          isOpen={modalOpen}
          toggle={() => {
            setModalOpen(!modalOpen);
          }}
        >
          <ModalHeader>
            {props.role === "owner"
              ? MyStrings.admin_user_modal_header_owner
              : props.role === "tenant"
              ? MyStrings.admin_user_modal_header_tenant
              : MyStrings.admin_user_modal_header_staff}
          </ModalHeader>
          <ModalBody>
            <UserForm
              role={props.role}
              successForm={() => {
                window.location.reload();
              }}
              vacantHouses={data?.vacants}
              user={currentUser}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
