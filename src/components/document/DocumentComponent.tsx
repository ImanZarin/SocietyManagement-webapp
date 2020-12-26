import { useQuery } from "@apollo/client";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { ConvertToSrc, styleMap } from "../../shared/Constants";
import { TDoc } from "../../shared/models";
import { myGQL } from "../../shared/myQuery.gql";
import { Loading } from "../LoadingComponent";

export function DocumentComponent(): JSX.Element {
  const params = useParams<{ id: string }>();
  const { data, error, loading } = useQuery<{ doc: TDoc }, { docId: string }>(
    myGQL.GET_DOC,
    {
      variables: {
        docId: params.id,
      },
    }
  );
  if (loading) return <Loading />;
  if (error) console.log(error);
  if (data) {
    console.log(data);
    return (
      <Fragment>
        <img
          style={{ padding: "5px", width: "auto", maxHeight:"200px"}}
          src={ConvertToSrc(data?.doc.image)}
          alt="img"
        />
        <div className="form-control" style={{ height: "auto" }}>
          <Editor
            editorState={EditorState.createWithContent(
              convertFromRaw(JSON.parse(data?.doc.description!))
            )}
            readOnly
            customStyleMap={styleMap}
            onChange={() => {}}
          />
        </div>
      </Fragment>
    );
  } else return <Loading />;
}
