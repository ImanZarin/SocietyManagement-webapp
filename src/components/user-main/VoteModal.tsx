import { ElectionOption, IElection } from "../../shared/models";
import React, { Fragment, useState } from "react";
import { useMutation } from "@apollo/client";
import { myGQL } from "../../shared/myQuery.gql";
import { Loading } from "../LoadingComponent";
import { MyStrings } from "../../shared/myStrings";

type MyProps = {
  election: IElection;
};

export function VoteModal(props: MyProps): JSX.Element {
  const [selectedOption, setSelectedOption]: [
    null | ElectionOption,
    any
  ] = useState(null);
  const [submitVote, { loading, error, data }] = useMutation(myGQL.VOTE_UPDATE);
  console.log(props.election.options);
  if (loading) return <Loading />;
  if (error) throw error;
  if (data) {
    window.location.reload();
    return <Loading />;
  }
  return (
    <Fragment>
      <div className="form-group">
        {props.election.options.map((op) => (
          <div className="custom-control custom-radio" key={op.name}>
            <input
              className="custom-control-input"
              id={op.name}
              name="election-options"
              type="radio"
              onChange={() => setSelectedOption(op)}
            />
            <label className="custom-control-label" htmlFor={op.name}>
              {op.name}
            </label>
          </div>
        ))}
      </div>
      <button
        className="btn btn-block btn-primary"
        type="submit"
        onClick={() => {
          console.log(props.election, selectedOption);
          submitVote({
            variables: {
              voteInput: {
                electionId: props.election._id,
                vote: selectedOption!.name,
              },
            },
          });
        }}
      >
        {MyStrings.user_modal_election_submit}
      </button>
    </Fragment>
  );
}
