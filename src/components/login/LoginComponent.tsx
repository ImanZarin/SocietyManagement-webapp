import { useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Label } from "reactstrap";
import * as yup from "yup";
import { MyConstants } from "../../shared/Constants";
import { MyStorage } from "../../shared/Enums";
import { myGQL } from "../../shared/myQuery.gql";
import { MyStrings } from "../../shared/myStrings";
import { Loading } from "../LoadingComponent";

let initForm = {
  nationalNO: "",
  password: "",
};

const mySchema = yup.object().shape({
  nationalNO: yup
    .string()
    .required(MyStrings.form_required_error)
    .min(MyConstants.minIdLength, MyStrings.form_login_id_short)
    .max(MyConstants.maxIdLength, MyStrings.form_login_id_long),
  password: yup
    .string()
    .required(MyStrings.form_required_error)
    .min(MyConstants.minPassLength, MyStrings.form_login_pass_short)
    .max(MyConstants.maxPassLength, MyStrings.form_login_pass_long),
});

function LoginComponent(): JSX.Element {
  const history = useHistory();
  const [loginUser, { loading, error, data }] = useMutation(myGQL.LOGIN);
  if (loading) return <Loading />;
  if (error) return <div>my error is: {error.message}</div>;
  if (data) {
    localStorage.setItem(MyStorage.token, data.accessToken);
    console.log(data);
    if (localStorage.getItem(MyStorage.prePg))
      history.push(localStorage.getItem(MyStorage.prePg) as string);
    else history.push("/home");
    return <Loading />;
  }
  return (
    <Fragment>
      <Formik
        initialValues={initForm}
        onSubmit={(values) => {
          loginUser({
            variables: {
              nationalNO: values.nationalNO,
              password: values.password,
            },
          });
        }}
        validationSchema={mySchema}
      >
        {({ errors, touched }): JSX.Element => (
          <Form className={"content"}>
            <div>
              <Label htmlFor="nationalNO">{MyStrings.form_login_id}</Label>
              <Field
                type="text"
                className={
                  errors.nationalNO && touched.nationalNO
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder=""
                id="nationalNO"
                name="nationalNO"
              />
              <div
                style={{
                  visibility:
                    errors.nationalNO && touched.nationalNO
                      ? "visible"
                      : "hidden",
                }}
                className="invalid-feedback"
              >
                &nbsp;
                {errors.nationalNO}
              </div>
            </div>
            <div>
              <Label htmlFor="password">{MyStrings.form_login_pass}</Label>
              <Field
                type="password"
                className={
                  errors.password && touched.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder=""
                id="password"
                name="password"
              />
              <div
                style={{
                  visibility:
                    errors.password && touched.password ? "visible" : "hidden",
                }}
                className="invalid-feedback"
              >
                &nbsp;
                {errors.password}
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-5">
              {MyStrings.form_login_submit}
            </button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}

export default LoginComponent;
