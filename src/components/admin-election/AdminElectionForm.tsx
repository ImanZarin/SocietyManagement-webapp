import React, { Fragment, useState } from "react";
import { FormFeedback, Input, Label } from "reactstrap";
import { MyStrings } from "../../shared/myStrings";
import { PersianMonths } from "../../shared/PersianMonths";
import { IElection } from "../../shared/models";
import { useMutation } from "@apollo/client";
import { myGQL } from "../../shared/myQuery.gql";
import { Loading } from "../LoadingComponent";
import {
  ConvertDateToIranPersian,
  DateSeperator,
  ParseIntFromPersian,
  PersianDateToUTC,
} from "../../shared/Constants";

type formType = {
  startY: string;
  startM: string;
  startD: number;
  startH: number;
  endY: string;
  endM: string;
  endD: number;
  endH: number;
  title: string | undefined;
  options: string[] | undefined;
};

let initForm: formType = {
  startY: "00",
  startM: "",
  startD: 1,
  startH: 1,
  endY: "00",
  endM: "",
  endD: 1,
  endH: 1,
  title: "",
  options: [],
};

type MyProps = {
  myElection: IElection | undefined;
};

export function ElectionForm(props: MyProps): JSX.Element {
  let myQueryCommand = myGQL.CREATE_ELECTION;
  if (props.myElection) {
    myQueryCommand = myGQL.DELETE_ELECTION;
    const persianDateStart = DateSeperator(
      ConvertDateToIranPersian((props.myElection as IElection).start)
    );
    const persianDateEnd = DateSeperator(
      ConvertDateToIranPersian((props.myElection as IElection).end)
    );
    console.log("splits array: ", persianDateStart);
    const sY = ParseIntFromPersian(persianDateStart[0]) - 1400;
    const eY = ParseIntFromPersian(persianDateEnd[0]) - 1400;
    initForm = {
      title: props.myElection?.title,
      startY: sY > 9 ? sY.toString() : "0" + sY.toString(),
      startM: PersianMonths[ParseIntFromPersian(persianDateStart[1]) - 1].name,
      startD: ParseIntFromPersian(persianDateStart[2]),
      startH: ParseIntFromPersian(persianDateStart[3]),
      endY: eY > 9 ? eY.toString() : "0" + sY.toString(),
      endM: PersianMonths[ParseIntFromPersian(persianDateEnd[1]) - 1].name,
      endD: ParseIntFromPersian(persianDateEnd[2]),
      endH: ParseIntFromPersian(persianDateEnd[3]),
      options: props.myElection?.options.map((op) => op.name),
    };
  } else {
    initForm = {
      startY: "00",
      startM: "",
      startD: 1,
      startH: 1,
      endY: "0",
      endM: "",
      endD: 1,
      endH: 1,
      title: "",
      options: [],
    };
  }
  const [myform, setMyform] = useState(initForm);
  const [newOption, setNewOption] = useState("");
  const [startM, setStartM] = useState(PersianMonths[0]);
  const [endM, setEndM] = useState(PersianMonths[0]);
  const [createOrDeleteElection, { loading, error, data }] = useMutation(
    myQueryCommand
  );
  let yearOptions: JSX.Element[] = [];
  let timeOptions: JSX.Element[] = [];
  let startDayOptions: JSX.Element[] = [];
  let endDayOptions: JSX.Element[] = [];

  for (let i = 0; i < 100; i++) {
    yearOptions.push(
      <option value={i > 9 ? i.toString() : "0" + i.toString()}>
        {i > 9 ? i.toString() : "0" + i.toString()}
      </option>
    );
  }
  for (let h = 1; h < 25; h++) {
    timeOptions.push(
      <option value={h} key={h}>
        {h}
      </option>
    );
  }
  for (let j = 1; j <= startM.days; j++) {
    startDayOptions.push(
      <option value={j} key={j}>
        {j}
      </option>
    );
  }
  for (let l = 1; l <= endM.days; l++) {
    endDayOptions.push(
      <option value={l} key={l}>
        {l}
      </option>
    );
  }

  if (loading) return <Loading />;
  if (error) console.log("the error is: ", error);
  if (data) {
    window.location.reload();
    return <Loading />;
  }
  return (
    <Fragment>
      <form>
        <div>
          <Label htmlFor="title">{MyStrings.admin_election_form_title}</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={myform.title}
            disabled={props.myElection ? true : false}
            onChange={(ev) => setMyform({ ...myform, title: ev.target.value })}
          />
        </div>
        <div className="mt-4" style={{ lineHeight: "50px" }}>
          <Label htmlFor="startY">{MyStrings.admin_election_form_start}</Label>
          <div className="row">
            <div className="input-group col-md-3 col-4">
              <span className="input-group-prepend mr-1 ml-1 mt-auto mb-auto">
                14
              </span>
              <select
                className={"custom-select mt-auto mb-auto"}
                id="startY"
                name="startY"
                style={{ maxWidth: "70px" }}
                disabled={props.myElection ? true : false}
                onChange={(ev) => {
                  setMyform({ ...myform, startY: ev.target.value });
                }}
              >
                {!props.myElection ? (
                  yearOptions
                ) : (
                  <option selected>{myform.startY}</option>
                )}
              </select>
            </div>
            <div className="col-md-4 col-5">
              <select
                className={"custom-select"}
                id="startM"
                name="startM"
                disabled={props.myElection ? true : false}
                onChange={(ev) => {
                  setStartM(PersianMonths[parseInt(ev.target.value)]);
                  setMyform({ ...myform, startM: ev.target.value });
                }}
              >
                {props.myElection ? (
                  PersianMonths.map((j) => (
                    <option value={PersianMonths.indexOf(j)}>{j.name}</option>
                  ))
                ) : (
                  <option selected>{myform.startM}</option>
                )}
              </select>
            </div>
            <div className="col-md-2 col-3">
              <select
                className={"custom-select"}
                id="startD"
                name="startD"
                style={{ maxWidth: "70px" }}
                disabled={props.myElection ? true : false}
                onChange={(ev) => {
                  setMyform({ ...myform, startD: parseInt(ev.target.value) });
                }}
              >
                {!props.myElection ? (
                  startDayOptions
                ) : (
                  <option selected>{myform.startD}</option>
                )}
              </select>
            </div>
            <div className="input-group col-md-3 col-12">
              <select
                className={"custom-select mt-auto mb-auto"}
                id="startH"
                name="startH"
                style={{ maxWidth: "70px" }}
                disabled={props.myElection ? true : false}
                onChange={(ev) => {
                  setMyform({ ...myform, startH: parseInt(ev.target.value) });
                }}
              >
                {timeOptions}
              </select>
              <span className="input-group-prepend mr-1 ml-1 mt-auto mb-auto">
                :00
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4" style={{ lineHeight: "50px" }}>
          <Label htmlFor="endY">{MyStrings.admin_election_form_end}</Label>
          <div className="row">
            <div className="input-group col-4 col-md-3">
              <span className="input-group-prepend mr-1 ml-1 mt-auto mb-auto">
                14
              </span>
              <select
                className={"custom-select mt-auto mb-auto"}
                id="endY"
                name="endY"
                style={{ maxWidth: "70px" }}
                disabled={props.myElection ? true : false}
                onChange={(ev) => {
                  setMyform({ ...myform, endY: ev.target.value });
                }}
              >
                {props.myElection ? (
                  <option selected>{myform.endY}</option>
                ) : (
                  yearOptions
                )}
              </select>
            </div>
            <div className="col-5 col-md-4">
              <select
                className={"custom-select"}
                id="endM"
                name="endM"
                disabled={props.myElection ? true : false}
                onChange={(ev) => {
                  setEndM(PersianMonths[parseInt(ev.target.value)]);
                  setMyform({ ...myform, endM: ev.target.value });
                }}
              >
                {props.myElection ? (
                  <option selected>{myform.endM}</option>
                ) : (
                  PersianMonths.map((j) => (
                    <option value={PersianMonths.indexOf(j)}>{j.name}</option>
                  ))
                )}
              </select>
            </div>
            <div className="col-3 col-md-2">
              <select
                className={"custom-select"}
                id="endD"
                name="endD"
                style={{ maxWidth: "70px" }}
                disabled={props.myElection ? true : false}
                onChange={(ev) => {
                  setMyform({ ...myform, endD: parseInt(ev.target.value) });
                }}
              >
                {props.myElection ? (
                  <option selected>{myform.endD}</option>
                ) : (
                  endDayOptions
                )}
              </select>
            </div>
            <div className="input-group col-md-3 col-12">
              <select
                className={"custom-select mt-auto mb-auto"}
                id="endH"
                name="endH"
                style={{ maxWidth: "70px" }}
                disabled={props.myElection ? true : false}
                onChange={(ev) => {
                  setMyform({ ...myform, endH: parseInt(ev.target.value) });
                }}
              >
                {timeOptions}
              </select>
              <span className="input-group-prepend mr-1 ml-1 mt-auto mb-auto">
                :00
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="options">
            {MyStrings.admin_election_form_options}
          </Label>
          <div className="input-group">
            <Input
              id="option"
              name="option"
              placeholder={MyStrings.admin_election_form_new_placeholder}
              invalid={myform.options?.includes(newOption)}
              className="input-group-append"
              disabled={props.myElection ? true : false}
              onChange={(ev) => setNewOption(ev.target.value)}
              value={newOption}
            />
            <button
              className="btn btn-outline-primary input-group-append"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("option")?.focus();
                if (myform.options?.includes(newOption)) return;
                myform.options?.push(newOption);
                setMyform({ ...myform, options: myform.options });
                setNewOption("");
              }}
            >
              +
            </button>
            <FormFeedback tooltip>
              {MyStrings.admin_election_form_new_error}
            </FormFeedback>
          </div>
          <p className="mt-4">
            {myform.options?.map((o) => (
              <div key={o}>{o}</div>
            ))}
          </p>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block mr-auto ml-auto mt-5"
          style={{ display: props.myElection ? "none" : "block" }}
          onClick={() => {
            const st = new Date(
              PersianDateToUTC(
                parseInt("14" + myform.startY),
                PersianMonths.indexOf(startM) + 1,
                myform.startD,
                myform.startH
              )
            );
            const en = new Date(
              PersianDateToUTC(
                parseInt("14" + myform.endY),
                PersianMonths.indexOf(endM) + 1,
                myform.endD,
                myform.endH
              )
            );
            const op = myform.options?.map((item) => {
              return { name: item };
            });
            console.log("title is: ", myform.title);
            createOrDeleteElection({
              variables: {
                election: {
                  start: st.toISOString(),
                  end: en.toISOString(),
                  options: op,
                  title: myform.title,
                },
              },
            });
          }}
        >
          {MyStrings.admin_election_form_submit}
        </button>
        <button
          type="button"
          className="btn btn-danger btn-block mr-auto ml-auto mt-5"
          style={{ display: props.myElection ? "block" : "none" }}
          onClick={() => {
            createOrDeleteElection({
              variables: {
                id: props.myElection?._id,
              },
            });
          }}
        >
          {MyStrings.admin_election_form_delete}
        </button>
      </form>
    </Fragment>
  );
}
