import React , { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { myGQL } from "../../shared/myQuery.gql";
import { Loading } from "../LoadingComponent";
import { MyStrings } from "../../shared/myStrings";
import { TDoc } from "../../shared/models";
import { ConvertToSrc } from "../../shared/Constants";
import { useHistory } from "react-router-dom";

type MyProps = {};

export function DocumentsComponent(props: MyProps): JSX.Element {
  const { loading, error, data } = useQuery<{ docs: TDoc[] }>(myGQL.GET_Docs);
  const history = useHistory();
  if (loading) return <Loading />;
  if (error) console.log(error);
  if (data) {
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
                    history.push("/documents/" + d._id);
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
      </Fragment>
    );
  }
  return <Loading />;
}
