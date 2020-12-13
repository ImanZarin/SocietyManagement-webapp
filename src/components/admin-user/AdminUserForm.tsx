import {
  IHouse,
  IUser,
  Role,
  userInput,
  userUpdateInput,
} from "../../shared/models";
import React, { Fragment, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useMutation } from "@apollo/client";
import { myGQL } from "../../shared/myQuery.gql";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
} from "reactstrap";
import * as yup from "yup";
import { MyStrings } from "../../shared/myStrings";
import { Loading } from "../LoadingComponent";
import { MyConstants } from "../../shared/Constants";

type MyProps = {
  role: Role;
  successForm: () => void;
  vacantHouses: IHouse[] | undefined;
  user: IUser | undefined;
};

let initForm: userInput | userUpdateInput = {
  _id: "",
  nationalNO: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  position: "",
  houseId: "",
  role: "",
};

const mySchema = yup.object().shape({
  email: yup
    .string()
    // eslint-disable-next-line no-useless-escape
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      MyStrings.form_user_email_error
    ),
  nationalNO: yup
    .string()
    .required(MyStrings.form_required_error)
    .matches(/^([0-9]+)$/, MyStrings.form_user_national_error),
  firstName: yup.string().required(MyStrings.form_required_error),
  lastName: yup.string().required(MyStrings.form_required_error),
  phone: yup
    .string()
    .required(MyStrings.form_required_error)
    .matches(/^(([0-9\+]{0,1})([0-9]+))$/, MyStrings.form_user_number_error)
    .min(MyConstants.minPhoneLength, MyStrings.form_user_short_error)
    .max(MyConstants.maxPhoneLength, MyStrings.form_user_long_error),
});

function UserForm(props: MyProps): JSX.Element {
  let myQueryCommand = myGQL.CREATE_USER;
  if (props.user) {
    initForm = {
      _id: props.user._id,
      nationalNO: props.user.nationalNO,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      role: props.user.role,
      position: props.user.position,
      phone: props.user.phone,
      houseId: props.user.house._id,
    };
    myQueryCommand = myGQL.UPDATE_USER;
  } else {
    initForm = {
      _id: "",
      nationalNO: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      houseId: "",
      role: "",
    };
  }

  const [minitForm, setMinitForm] = useState(initForm);
  const [dropdowmOpen, setDropdownOpen] = useState(false);
  const [dropdownText, setDropdownText] = useState(
    MyStrings.form_user_dropdown
  );
  const [createOrUpdateUser, { loading, error, data }] = useMutation(
    myQueryCommand
  );
  const [deleteUser] = useMutation(myGQL.DELETE_USER);
  if (loading) return <Loading />;
  if (error) return <div>my error is: {error.message}</div>;
  if (data) {
    props.successForm();
    return <Loading />;
  }
  return (
    <Fragment>
      <Formik
        initialValues={minitForm}
        onSubmit={(values) => {
          console.log(values);
          setMinitForm(values);
          createOrUpdateUser({
            variables: {
              userInput: {
                _id: props.user?._id,
                nationalNO: values.nationalNO,
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
                role: props.role.toString(),
                houseId: minitForm.houseId,
                email: values.email,
                position: values.position,
              },
            },
          });
        }}
        validationSchema={mySchema}
      >
        {({ errors, touched }): JSX.Element => (
          <Form>
            <div>
              <Label htmlFor="nationalNO">
                {MyStrings.form_user_nationalNO}
              </Label>
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
              <Label htmlFor="firstName">{MyStrings.form_user_firstname}</Label>
              <Field
                type="text"
                className={
                  errors.firstName && touched.firstName
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder=""
                id="firstName"
                name="firstName"
              />
              <div
                style={{
                  visibility:
                    errors.firstName && touched.firstName
                      ? "visible"
                      : "hidden",
                }}
                className="invalid-feedback"
              >
                &nbsp;
                {errors.firstName}
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">{MyStrings.form_user_lastname}</Label>
              <Field
                type="text"
                className={
                  errors.lastName && touched.lastName
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder=""
                id="lastName"
                name="lastName"
              />
              <div
                style={{
                  visibility:
                    errors.lastName && touched.lastName ? "visible" : "hidden",
                }}
                className="invalid-feedback"
              >
                &nbsp;
                {errors.lastName}
              </div>
            </div>
            <div>
              <Label htmlFor="phone">{MyStrings.form_user_phone}</Label>
              <Field
                type="text"
                className={
                  errors.phone && touched.phone
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder=""
                id="phone"
                name="phone"
              />
              <div
                style={{
                  visibility:
                    errors.phone && touched.phone ? "visible" : "hidden",
                }}
                className="invalid-feedback"
              >
                &nbsp;
                {errors.phone}
              </div>
            </div>
            <div>
              <Label htmlFor="email">{MyStrings.form_user_email}</Label>
              <Field
                type="text"
                className={
                  errors.email && touched.email
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="email"
                name="email"
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div
              style={{
                display:
                  props.role === Role.owner || props.role === Role.tenent
                    ? "block"
                    : "none",
              }}
            >
              <Label htmlFor="houseId">{MyStrings.form_user_house}</Label>
              <Dropdown
                isOpen={dropdowmOpen}
                toggle={() => setDropdownOpen(!dropdowmOpen)}
              >
                <DropdownToggle caret={true}>{dropdownText}</DropdownToggle>
                <DropdownMenu>
                  {props.vacantHouses?.map((vh) => (
                    <DropdownItem
                      typeof="text"
                      key={vh._id}
                      onClick={() => {
                        setDropdownText(vh.flatNo.toString());
                        setMinitForm({ ...minitForm, houseId: vh._id });
                      }}
                    >
                      {vh.flatNo}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div
              style={{ display: props.role === Role.staff ? "block" : "none" }}
            >
              <Label htmlFor="position">{MyStrings.form_user_position}</Label>
              <Field
                type="text"
                className="form-control"
                id="position"
                name="position"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mr-auto ml-auto mt-5"
            >
              {props.user
                ? MyStrings.form_user_submit_update
                : MyStrings.form_user_submit_create}
            </button>
            <button
              style={{ display: props.user ? "block" : "none" }}
              type="button"
              className="btn btn-danger btn-block mr-auto ml-auto mt-5"
              onClick={() => {
                deleteUser({
                  variables: {
                    userId: props.user?._id,
                  },
                });
                window.location.reload();
              }}
            >
              {MyStrings.form_user_delete}
            </button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}

export default UserForm;
