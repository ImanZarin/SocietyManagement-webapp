import { IElection, IUser, VoteElection } from "../../shared/models";
import React, { Fragment, useState } from "react";
import { MyStrings } from "../../shared/myStrings";
import { useQuery } from "@apollo/client";
import { myGQL } from "../../shared/myQuery.gql";
import { Loading } from "../LoadingComponent";
import { ConvertDateToIranPersian } from "../../shared/Constants";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { VoteModal } from "./VoteModal";

type MyProps = {
  //user: IUser;
};

export function ProfileComponent(props: MyProps): JSX.Element {
  const [electionModalOpen, setElectionModalOpen] = useState(false);
  const [currentElection, setCurrentElection]: [
    null | IElection,
    any
  ] = useState(null);
  const { loading, error, data } = useQuery<
    { user: IUser; vote: VoteElection },
    { token: string }
  >(myGQL.GET_PROFILE);
  if (error) return <div>{error.message}</div>;
  else if (!data) return <Loading />;
  return (
    <Fragment>
      <div className="card bg-primary text-white w-75 mt-5 mr-auto ml-auto">
        <div className="card-header">{MyStrings.user_personal_title}</div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              {data.user.firstName}&nbsp;{data.user.lastName}
            </div>
            <div className="col-6">
              {MyStrings.user_persoanl_national}:&nbsp;{data.user.nationalNO}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              {MyStrings.user_personal_email}:&nbsp;
              {data.user.email ? data.user.email : "___"}
            </div>
            <div className="col-6">
              {MyStrings.user_personal_phone}:&nbsp;{data.user.phone}
            </div>
          </div>
          <div>
            {MyStrings.user_personal_houseNO}:&nbsp;{data.user.house.flatNo}
          </div>
        </div>
      </div>
      <div className="card bg-primary text-white w-75 mt-5 mr-auto ml-auto">
        <div className="card-header">{MyStrings.user_election_title}</div>
        <div className="card-body">
          {data.vote.elections.map((e) => {
            return (
              <div
                key={e._id}
                onClick={() => {
                  setCurrentElection(e);
                  setElectionModalOpen(true);
                }}
                className="row"
              >
                <div className="col-3">{e.title}</div>
                <div className="col-3">{ConvertDateToIranPersian(e.start)}</div>
                <div className="col-3">{ConvertDateToIranPersian(e.end)}</div>
                <div className="col-3">
                  {e.options.map((option) => (
                    <div key={option.name}>
                      {option.name}:&nbsp;{option.percent}%
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        isOpen={electionModalOpen}
        toggle={() => setElectionModalOpen(!electionModalOpen)}
      >
        <ModalHeader>
          {currentElection === null ? "" : currentElection!.title}
        </ModalHeader>
        <ModalBody>
          <VoteModal election={currentElection!} />
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
