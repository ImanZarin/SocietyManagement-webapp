import { Fragment, useState } from "react";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { myGQL } from "../../shared/myQuery.gql";
import { Loading } from "../LoadingComponent";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { MyStrings } from "../../shared/myStrings";
import { DocForm } from "./AdminDocForm";
import { TDoc } from "../../shared/models";
import { ConvertToSrc } from "../../shared/Constants";

type MyProps = {};

export function AdminDoc(props: MyProps): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const { loading, error, data } = useQuery<{ docs: TDoc[] }>(myGQL.GET_Docs);
  const [currentDoc, setCurrentDoc]: [TDoc | null, any] = useState(null);
  if (loading) return <Loading />;
  if (error) console.log(error);
  if (data) {
    //const myBase64 = Buffer.from(data.docs[0].image.data, "base64");
    //console.log(myBase64);
    //const sourceImg = "data:image/jpeg;base64," + data.docs[0].image?.data;
    return (
      <Fragment>
        <table className="table table-hover">
          <thead>
            <tr>
              <th style={{ width: "50px" }}></th>
              <th>{MyStrings.admin_doc_table_title2}</th>
            </tr>
          </thead>
          <tbody>
            {data?.docs?.map((d: TDoc) => {
              return (
                <tr
                  key={d._id}
                  onClick={() => {
                    setCurrentDoc(d);
                    setModalOpen(true);
                  }}
                >
                  <td>
                    <img
                      style={{padding: "5px", width: "50px", height: "50px"}}
                      src={ConvertToSrc(d.image)}
                      alt={d.image!.name}
                    />
                  </td>
                  <td style={{verticalAlign: "middle"}}>{d.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="btn btn-outline-primary m-auto btn-circle"
          onClick={() => {
            setCurrentDoc(null);
            setModalOpen(true);
          }}
        >
          +
        </button>
        <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
          <ModalHeader>{MyStrings.admin_doc_modal_header}</ModalHeader>
          <ModalBody>
            <DocForm myDoc={currentDoc} />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
  return <Loading />;
}
