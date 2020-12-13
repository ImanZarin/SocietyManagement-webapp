import { useQuery } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ConvertDateToIranPersian } from "../../shared/Constants";
import { IElection } from "../../shared/models";
import { myGQL } from "../../shared/myQuery.gql";
import { MyStrings } from "../../shared/myStrings";
import { Loading } from "../LoadingComponent";
import { ElectionForm } from "./AdminElectionForm";

function AdminElection(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentElection, setCurrentElection]: [
    undefined | IElection,
    any
  ] = useState(undefined);
  const { loading, error, data } = useQuery<{ elections: IElection[] }>(
    myGQL.GET_ELECTIONS
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
              <th>{MyStrings.admin_election_table_1}</th>
              <th>{MyStrings.admin_election_table_2}</th>
              <th>{MyStrings.admin_election_table_3}</th>
              <th>{MyStrings.admin_election_table_4}</th>
            </tr>
          </thead>
          <tbody>
            {data?.elections?.map((el: IElection) => {
              return (
                <tr
                  key={el._id}
                  onClick={() => {
                    setCurrentElection(el);
                    console.log(currentElection);
                    setModalOpen(true);
                  }}
                  className={
                    el.end < new Date().toISOString() ? "table-active" : ""
                  }
                >
                  <td>{el.title}</td>
                  <td>{ConvertDateToIranPersian(el.start)}</td>
                  <td>{ConvertDateToIranPersian(el.end)}</td>
                  <td>
                    {el.options.map((option) => (
                      <div key={option.name}>
                        {option.name}:&nbsp;{option.percent}%
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="btn btn-outline-primary m-auto btn-circle"
          onClick={() => {
            setCurrentElection(undefined);
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
          <ModalHeader>{MyStrings.admin_election_modal_header}</ModalHeader>
          <ModalBody>
            <ElectionForm myElection={currentElection} />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
export default AdminElection;
