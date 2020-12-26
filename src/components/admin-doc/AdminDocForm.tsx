import { TDoc, ImageTypes } from "../../shared/models";
import React, { useState } from "react";
import { Input, Label } from "reactstrap";
import { MyStrings } from "../../shared/myStrings";
import { MyConstants, styleMap } from "../../shared/Constants";
import { myGQL } from "../../shared/myQuery.gql";
import { useMutation } from "@apollo/client";
import { Loading } from "../LoadingComponent";
import {
  convertFromRaw,
  convertToRaw,
  DraftStyleMap,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";

type MyProps = {
  myDoc: TDoc | null;
};

const emptyForm: TDoc = {
  _id: undefined,
  title: "",
  description: "",
  image: undefined,
  duration: undefined,
};

export function DocForm(props: MyProps): JSX.Element {
  let initForm = emptyForm;
  if (props.myDoc) initForm = props.myDoc;
  const [myForm, setMyForm] = useState(initForm);
  const [isOverSized, setIsOverSized] = useState(false);
  let initEditorState = EditorState.createEmpty();
  if (props.myDoc?.description)
    initEditorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(props.myDoc.description))
    );
  const [editorState, setEditorState] = React.useState(() => initEditorState);

  const [submitDoc, { loading, error, data }] = useMutation(
    myGQL.DOC_CREATE_UPDATE
  );
  const [deleteDoc] = useMutation(myGQL.DOC_DELETE, {
    variables: {
      id: props.myDoc?._id,
    },
  });
  if (loading) return <Loading />;
  if (error) console.log(error);
  if (data) {
    window.location.reload();
    return <Loading />;
  }
  return (
    <form>
      <div className="form-group">
        <Label htmlFor="title">{MyStrings.admin_doc_form_title}</Label>
        <Input
          id="title"
          type="text"
          value={myForm.title}
          onChange={(ev) => setMyForm({ ...myForm, title: ev.target.value })}
        />
      </div>
      <div className="mt-5 form-group has-danger">
        <Label htmlFor="image">{MyStrings.admin_doc_form_image}</Label>
        <small>&nbsp;{MyStrings.admin_doc_form_title_placeholder}</small>
        <div
          style={{ position: "relative", display: "inline-block" }}
          className="w-25"
        >
          <input
            type="file"
            accept="image/*"
            style={{
              zIndex: 2,
              opacity: 0,
              width: "100%",
              position: "relative",
            }}
            alt={myForm.image?.name}
            onChange={(ev) => {
              if (ev.target.files![0].size > MyConstants.maxImageSize) {
                setIsOverSized(true);
                setMyForm({ ...myForm, image: null });
              } else {
                let fr = new FileReader();
                fr.readAsDataURL(ev.target.files![0]);
                fr.onload = () => {
                  setMyForm({
                    ...myForm,
                    image: {
                      name: ev.target
                        .files![0].name.split(".")
                        .slice(0, -1)
                        .join("."),
                      data: (fr.result as string).split(",")[1],
                      contentType: ev.target.files![0].type as ImageTypes,
                    },
                  });
                };
              }
            }}
          />
          <button
            className="w-100 btn btn-primary"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            {MyStrings.admin_doc_form_image_select}
          </button>
        </div>
        <span>&nbsp;{myForm.image?.name}</span>
        <div
          className="invalid-feedback"
          style={{ visibility: isOverSized ? "visible" : "hidden" }}
        >
          {MyStrings.admin_doc_form_image_error}
        </div>
      </div>
      <div className="form-group">
        <Label htmlFor="description">{MyStrings.admin_doc_form_desc}</Label>
        <div
          style={{ minHeight: "400px", height: "auto" }}
          className="form-control"
        >
          <button
            type="button"
            className={
              editorState.getCurrentInlineStyle().has("BOLD")
                ? "btn btn-outline-info"
                : "btn btn-outline-secondary"
            }
            onMouseDown={(e) => {
              e.preventDefault();
              setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
            }}
          >
            Bold
          </button>
          <button
            type="button"
            className={
              editorState.getCurrentInlineStyle().has("ITALIC")
                ? "btn btn-outline-info"
                : "btn btn-outline-secondary"
            }
            onMouseDown={(e) => {
              e.preventDefault();
              setEditorState(
                RichUtils.toggleInlineStyle(editorState, "ITALIC")
              );
            }}
          >
            Italic
          </button>
          <button
            type="button"
            className={
              editorState.getCurrentInlineStyle().has("UNDERLINE")
                ? "btn btn-outline-info"
                : "btn btn-outline-secondary"
            }
            onMouseDown={(e) => {
              e.preventDefault();
              setEditorState(
                RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
              );
            }}
          >
            Underline
          </button>
          <button
            type="button"
            className={
              editorState.getCurrentContent().getLastBlock().getType() ===
              "ordered-list-item"
                ? "btn btn-outline-info"
                : "btn btn-outline-secondary"
            }
            onMouseDown={(e) => {
              e.preventDefault();
              let emptiedEditorState = editorState;
              if (
                editorState.getCurrentContent().getLastBlock().getType() ===
                "unordered-list-item"
              ) {
                emptiedEditorState = RichUtils.toggleBlockType(
                  editorState,
                  "unordered-list-item"
                );
              }
              setEditorState(
                RichUtils.toggleBlockType(
                  emptiedEditorState,
                  "ordered-list-item"
                )
              );
            }}
          >
            O list
          </button>
          <button
            type="button"
            className={
              editorState.getCurrentContent().getLastBlock().getType() ===
              "unordered-list-item"
                ? "btn btn-outline-info"
                : "btn btn-outline-secondary"
            }
            onMouseDown={(e) => {
              e.preventDefault();
              let emptiedEditorState = editorState;
              if (
                editorState.getCurrentContent().getLastBlock().getType() ===
                "ordered-list-item"
              ) {
                emptiedEditorState = RichUtils.toggleBlockType(
                  editorState,
                  "ordered-list-item"
                );
              }
              setEditorState(
                RichUtils.toggleBlockType(
                  emptiedEditorState,
                  "unordered-list-item"
                )
              );
            }}
          >
            UnO List
          </button>
          <button
            type="button"
            className={
              editorState.getCurrentInlineStyle().has("H1")
                ? "btn btn-outline-info"
                : "btn btn-outline-secondary"
            }
            onMouseDown={(e) => {
              e.preventDefault();
              const emptiedEditorState = emptyFontSizesExcept(
                editorState,
                "H1"
              );
              setEditorState(
                RichUtils.toggleInlineStyle(emptiedEditorState, "H1")
              );
            }}
          >
            H1
          </button>
          <button
            type="button"
            className={
              editorState.getCurrentInlineStyle().has("H2")
                ? "btn btn-outline-info"
                : "btn btn-outline-secondary"
            }
            onMouseDown={(e) => {
              e.preventDefault();
              const emptiedEditorState = emptyFontSizesExcept(
                editorState,
                "H2"
              );
              setEditorState(
                RichUtils.toggleInlineStyle(emptiedEditorState, "H2")
              );
            }}
          >
            H2
          </button>
          <button
            type="button"
            className={
              editorState.getCurrentInlineStyle().has("H3")
                ? "btn btn-outline-info"
                : "btn btn-outline-secondary"
            }
            onMouseDown={(e) => {
              e.preventDefault();
              const emptiedEditorState = emptyFontSizesExcept(
                editorState,
                "H3"
              );
              setEditorState(
                RichUtils.toggleInlineStyle(emptiedEditorState, "H3")
              );
            }}
          >
            H3
          </button>
          <button
            type="button"
            className={
              editorState.getCurrentInlineStyle().has("H4")
                ? "btn btn-outline-info"
                : "btn btn-outline-secondary"
            }
            onMouseDown={(e) => {
              e.preventDefault();
              const emptiedEditorState = emptyFontSizesExcept(
                editorState,
                "H4"
              );
              setEditorState(
                RichUtils.toggleInlineStyle(emptiedEditorState, "H4")
              );
            }}
          >
            H4
          </button>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={(command, eState) => {
              const newState = RichUtils.handleKeyCommand(eState, command);
              if (newState) {
                setEditorState(newState);
                return "handled";
              } else return "not-handled";
            }}
            customStyleMap={styleMap}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        onClick={() => {
          let myDocInput: { [key: string]: any } = {};
          if (props.myDoc?.title !== myForm.title)
            myDocInput.title = myForm.title!;
          if (
            props.myDoc?.description !==
            JSON.stringify(convertToRaw(editorState.getCurrentContent()))
          )
            myDocInput.description = JSON.stringify(
              convertToRaw(editorState.getCurrentContent())
            );
          if (props.myDoc?.image !== myForm.image)
            myDocInput.image = myForm.image!;
          if (props.myDoc) myDocInput.id = myForm._id;
          submitDoc({
            variables: {
              docInput: myDocInput,
            },
          });
        }}
      >
        {props.myDoc
          ? MyStrings.admin_doc_form_submit2
          : MyStrings.admin_doc_form_submit1}
      </button>
      <button
        type="button"
        style={{ display: props.myDoc ? "block" : "none" }}
        className="btn btn-danger btn-block"
        onClick={() => {
          deleteDoc();
          window.location.reload();
        }}
      >
        {MyStrings.admin_doc_form_delete}
      </button>
    </form>
  );
}

function emptyFontSizesExcept(ed: EditorState, styleName: string): EditorState {
  let reEditorState = ed;
  if (ed.getCurrentInlineStyle().has("H1") && styleName !== "H1")
    reEditorState = RichUtils.toggleInlineStyle(reEditorState, "H1");

  if (ed.getCurrentInlineStyle().has("H2") && styleName !== "H2")
    reEditorState = RichUtils.toggleInlineStyle(reEditorState, "H2");

  if (ed.getCurrentInlineStyle().has("H3") && styleName !== "H3")
    reEditorState = RichUtils.toggleInlineStyle(reEditorState, "H3");

  if (ed.getCurrentInlineStyle().has("H4") && styleName !== "H4")
    reEditorState = RichUtils.toggleInlineStyle(reEditorState, "H4");

  return reEditorState;
}
