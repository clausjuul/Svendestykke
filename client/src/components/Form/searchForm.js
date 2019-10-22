import React, { Fragment, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import removeIdFromUrl from 'helpers/removeIdFromUrl';
import { EyeIcon, EyeSplashIcon } from './togglePasswordIcons';
import "./simple-form.scss";

export default (props) => {
  const [hidePassword, setHidePassword] = useState(true);
  // const [checkError, setCheckError] = useState(null);

  const getInitialValues = inputs => {
    const initialValues = {};
    inputs.forEach(field => {
      if (!initialValues[field.name]) {
        initialValues[field.name] = field.initialValue;
      }
    });
    return initialValues;
  };

  const buildSchema = fields => {
    const validations = {};
    fields.forEach(field => {
      if (validations[field.name] || !field.validation) {
        return;
      }
      validations[field.name] = field.validation;
    });
    return Yup.object().shape(validations);
  };

  const renderCheckBox = (input, { errors, touched }) => {
// renderCheckBox(input) {
    return (
      <Fragment key={"formField-" + input.name}>
        <label>{input.label}</label>
        <Field
          name={input.name}
          render={prop => {
            const { field } = prop;
            return (
              <input
                name={input.name}
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
              />
            );
          }}
        />
      </Fragment>
    );
  }

  const renderTextArea = (input, { errors, touched }) => {
    return (
      <Fragment key={"formField-" + input.name}>
        <label htmlFor={input.name}>{input.label}</label>
        <div
          className={
            "form__field" +
            (errors[input.name] && touched[input.name]
              ? " has-error headShake"
              : "")
          }
        >
          <Field
            name={input.name}
            component="textarea"
            className="form__field__input"
            // className={
            //   errors[input.name] && touched[input.name]
            //     ? "form__field__input has-error"
            //     : "form__field__input "
            // }
          />
          {/* <Field
            name={input.name}
            render={props => {
              const { field } = props;
              // const { errors, touched } = props.form;
              // const hasError =
              //   errors[input.name] && touched[input.name]
              //     ? "form__field__input has-error"
              //     : "form__field__input ";
              return <textarea {...field} className="form__field__input"></textarea>;
            }}
          /> */}
          <span
            className={
              "focus-effect" +
              (touched[input.name] && errors[input.name] ? " error" : "")
            }
          />
        <ErrorMessage
          name={input.name}
          component="div"
          className="has-error-feedback"
        />
        </div>
      </Fragment>
    );
  }

  const renderSelect = (input, { errors, touched }) => {
    return (
      <Fragment key={"formField-searchbar-" + input.name}>
        <div className="form__field">
          <label htmlFor={input.name}>{input.label}</label>
          <Field name={input.name} component="select">
            {/* <option key="" value="" ></option> */}

            {/* {input.initialValue && (
              <option
                key={input.initialValue}
                value={input.initialValue}
                // disabled
              >
                {input.initialValue}
              </option>
            )} */}
            {input.options.map(option => (
              <option key={option} value={option}>
                {input.removeId ? removeIdFromUrl(option) : option}
              </option>
            ))}
          </Field>
        </div>
        <ErrorMessage
          name={input.name}
          component="div"
          className="has-error-feedback"
        />
      </Fragment>
    );
  }

  const renderDatepicker = (input, { errors, touched }) => {
    const toDay = () => {
      const dateObj = new Date();
      const date = dateObj.getDate()
      const month = dateObj.getMonth() + 1
      const year = dateObj.getYear()
      return `${date}/${month}/${year}`
    }
    return (
      <Fragment key={"formField-searchbar-" + input.name}>
        <div className="form__field">
          <label htmlFor={input.name}>{input.label}</label>
          <Field
            name={input.name}
            render={prop => {
              const { field } = prop;
              return (
                <input
                  name={input.name}
                  type="date"
                  //TODO:
                  //only show from today and forward

                  // value={toDay()}
                  placeholder={toDay()}
                  // placeholder="YYYY-MM-DD"
                  onChange={field.onChange}
                  // pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                />
              );
            }}
          />
        </div>
        <ErrorMessage
          name={input.name}
          component="div"
          className="has-error-feedback"
        />
      </Fragment>
    );
  }

  // const renderSelect = (input, { errors, touched }) => {
  //   return (
  //     <Fragment key={"formField-" + input.name}>
  //       <label>{input.label}</label>
  //       <div
  //         className={
  //           errors[input.name] && touched[input.name]
  //             ? "form__field__input has-error"
  //             : "form__field__input "
  //         }
  //       >
  //         <Field
  //           name={input.name}
  //           render={props => {
  //             const { field } = props;
  //             // const { errors, touched } = props.form;
  //             const hasError =
  //               errors[input.name] && touched[input.name]
  //                 ? " has-error headShake"
  //                 : "";
  //             const defaultOption = (
  //               <option key="default" value="Please Select">
  //                 Please Select
  //               </option>
  //             );
  //             const options = input.options.map(i => (
  //               <option key={i} value={i}>
  //                 {" "}
  //                 {i}{" "}
  //               </option>
  //             ));
  //             const selectOptions = [defaultOption, ...options];
  //             return (
  //               <div className="dropdown">
  //                 <select value={field.value} {...field} className={hasError}>
  //                   {selectOptions}
  //                 </select>
  //               </div>
  //             );
  //           }}
  //         />
  //         <span
  //           className={
  //             "focus-effect" +
  //             (touched[input.name] && errors[input.name] ? " error" : "")
  //           }
  //         />
  //       </div>
  //     </Fragment>
  //   );
  // }

  const renderPasswordField = (input, { errors, touched }) => {
    return (
      <Fragment key={"formField-" + input.name}>
        <label htmlFor={input.name}>{input.label}</label>
        <div
          className={
            "form__field" +
            (errors[input.name] && touched[input.name]
              ? " has-error headShake"
              : "")
          }
        >
          <Field
            name={input.name}
            autoFocus={input.autofocus ? true : false}
            className={`form__field__input .passwordToggleRef`}
            type={hidePassword ? "password" : "text"}
            placeholder={input.placeholder || ""}
            id="passwordId"
          />
          <span
            className={
              "focus-effect" +
              (touched[input.name] && errors[input.name] ? " error" : "")
            }
          />
          <div
            className="toggle-password"
            onClick={() => {
              setHidePassword(!hidePassword);
              document.querySelector('.passwordToggleRef').focus();

            }}
          >
            {hidePassword ? <EyeSplashIcon /> : <EyeIcon />}
          </div>
          <ErrorMessage
            name={input.name}
            component="div"
            className="has-error-feedback"
          />
        </div>
      </Fragment>
    );
  };

  const renderFields = (inputs, { errors, touched }) => {

    return inputs.map(input => {

      if (input.type === "password") {
        return renderPasswordField(input, { errors, touched });
      }

      if (input.type === "checkbox") {
        return renderCheckBox(input, { errors, touched });
      }

      if (input.type === "select") {
        return renderSelect(input, { errors, touched });
      }

      if (input.type === "textarea") {
        return renderTextArea(input, { errors, touched });
      }

      if (input.type === "datepicker") {
        return renderDatepicker(input, { errors, touched });
      }


      const fieldClass = "form__field" +
      (errors[input.name] && touched[input.name]
        ? " has-error headShake"
        : "") + (!errors[input.name] && touched[input.name]
          ? " is-valid"
          : "")


      return (
        <Fragment key={"formField-" + input.name}>
          <label htmlFor={input.name}
            className={ fieldClass }
            onClick={() => document.querySelector(`.${input.name}Ref`).focus()}
            // onClick={() => document.querySelector(`#${input.name}Idsimple`).focus()}
            >
            { input.label }
            <Field
              name={input.name}
              autoFocus={input.autofocus ? true : false}
              className={`form__field__input + ${input.name}Ref`}
              type={input.type}
              placeholder={input.placeholder || ""}
              // id={`${input.name}Ref`}
            />
            <ErrorMessage
              name={input.name}
              component="div"
              className="has-error-feedback"
            />
          </label>
        </Fragment>
      );
    });
  }

  const renderForm = (inputs, { errors, touched, isSubmitting, resetForm }) => {
    return (
      <Form key={`searchbar-`} className={props.class || "searchbar__form"}>
        {/* <fieldset> */}
        {props.title && <legend>{props.title || "Form"}</legend>}
        {renderFields(inputs, {
          errors,
          touched
        })}
        <div className="searchbar__form__submit">
          {props.cancelButton && (
            <button
              type="button"
              className="searchbar__form__submit__btn searchbar__form__submit__btn-secoundary"
              disabled={isSubmitting}
              onClick={props.reset ? () => resetForm() : props.onCancel}
            >
              {props.cancelButton}
            </button>
          )}
          <span></span>
          <button
            type="submit"
            className="searchbar__form__submit__btn searchbar__form__submit__btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "loading" : props.submitButton || "Submit"}
          </button>
        </div>
        {/* </fieldset> */}
      </Form>
    );
  }

  return (
    <Formik
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false)
        props.history.push(`/search?destination=${values.destination}&checkin=${values.checkin}&checkout=${values.checkout}&quantity=${values.quantity}`);
      }}
      validationSchema={buildSchema(props.fields)}
      initialValues={getInitialValues(props.fields)}
      render={formprops => renderForm(props.fields, formprops)}
    />
  );
}
