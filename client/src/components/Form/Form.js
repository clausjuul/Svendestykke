import React, { Fragment, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { EyeIcon, EyeSplashIcon } from './togglePasswordIcons';
import "./Form.scss";

export default (props) => {
  const [hidePassword, setHidePassword] = useState(true);

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
    return (
      <Fragment key={`formField-${input.key}-${input.name}`}>
        {input.label && <label>{input.label}</label>}
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
            render={prop => {
              const { field } = prop;
              return (
                <>
                <input
                  name={input.name}
                  style={{margin: '0.2rem 0.5rem 0.5rem 0.5rem'}}
                  type="checkbox"
                  value={input.initialValue}
                  checked={field.value}
                  onChange={field.onChange}
                />
                {input.text && <span style={{fontSize: '0.7rem'}}>{input.text}</span>}
                </>
              );
            }}
          />
          {errors[input.name] && <div className="has-error-feedback">{errors[input.name]}</div>}
        </div>
      </Fragment>
    );
  }

  const renderTextArea = (input, { errors, touched }) => {
    return (
      <Fragment key={`formField-${input.key}-${input.name}`}>
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
          />

          <span
            className={
              "focus-effect" +
              (touched[input.name] && errors[input.name] ? " focus-error" : "")
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
      <Fragment key={`formField-${input.key}-${input.name}`}>
        <label htmlFor={input.name}>{input.label}</label>
        <div
          className={
            errors[input.name] && touched[input.name]
              ? "form__field has-error"
              : "form__field "
          }
        >
          <Field
            name={input.name}
            component="select"
            className="form__field__input"
          >
            {input.options.map(option => (
              <option key={option} value={option}>
                {option}
                {/* {input.removeId ? removeIdFromUrl(option) : option} */}
              </option>
            ))}
          </Field>
          <span
            className={
              "focus-effect" + (errors[input.name] ? " focus-error" : "")
            }
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

  
  const renderDatepicker = (input, { errors, touched }) => {

    const toDay = () => {
      const dateObj = new Date();
      const date = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getYear();
      return `${date}/${month}/${year}`;
    };

    return (
      <Fragment key={`formField-${input.key}-${input.name}`}>
        <label htmlFor={input.name}>{input.label}</label>
        <div className="form__field">
          <Field
            name={input.name}
            render={prop => {
              const { field } = prop;
              return (
                <input
                  className="form__field__input"
                  name={input.name}
                  type="date"
                  placeholder={toDay()}
                  onChange={field.onChange}
                />
              );
            }}
          />
          <span
            className={
              "focus-effect" + (errors[input.name] ? " focus-error" : "")
            }
          />
        </div>
        <ErrorMessage
          name={input.name}
          component="div"
          className="has-error-feedback"
        />
      </Fragment>
    );
  };

  const renderPasswordField =  (input, { errors, touched }) => {

    return (
      <Fragment key={`formField-${input.key}-${input.name}`}>
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
            className={`form__field__input ${input.name}`}
            type={hidePassword ? "password" : "text"}
            placeholder={input.placeholder || ""}
            
          />
          <span
            className={
              "focus-effect" +
              (touched[input.name] && errors[input.name] ? " focus-error" : "")
            }
          />
          <div
            className="toggle-password"
            onClick={() => {
              setHidePassword(!hidePassword);
              document.querySelector(`.${input.name}`).focus();
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
    const renderRadioButtons = (input, { errors, touched }) => {
    return (
      <Fragment key={`formField-${input.key}-${input.name}`}>
        <label htmlFor={input.name}>{input.label}</label>
        <div className="form__field">
          <Field
            className="form__field__input"
            name={input.name}
            render={prop => {
              const { field } = prop;

              return input.options.map((option, i) => (
                <Fragment key={`radio-${input.name}-${i}`}>
                  <span
                    style={{
                      padding: "0.1rem 0 0 0.5rem",
                      fontSize: "0.8rem"
                    }}
                  >
                    {option}
                  </span>

                  <input
                    type="radio"
                    style={{ margin: "0.4rem 1rem 0.5rem 0.5rem" }}
                    name={input.name}
                    onChange={field.onChange}
                  />
                </Fragment>
              ));
            }}
          />

          <span
            className={
              "focus-effect" + (errors[input.name] ? " focus-error" : "")
              // (touched[input.name] && errors[input.name] ? " focus-error" : "")
            }
          />
        </div>
        <ErrorMessage
          name={input.name}
          component="div"
          className="has-error-feedback"
        />
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

      if (input.type === "radio") {
        return renderRadioButtons(input, { errors, touched });
      }

      if (input.type === "select") {
        return renderSelect(input, { errors, touched });
      }

      if (input.type === "date") {
        return renderDatepicker(input, { errors, touched });
      }

      if (input.type === "textarea") {
        return renderTextArea(input, { errors, touched });
      }

      return (
        <Fragment key={`formField-${input.key}-${input.name}`}>
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
              className="form__field__input"
              type={input.type}
              placeholder={input.placeholder || ""}
            />
            <span
              className={
                "focus-effect" +
                (touched[input.name] && errors[input.name]
                  ? " focus-error"
                  : "")
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
    });
  }

  const renderForm = (inputs, { errors, touched, isSubmitting, resetForm }) => {
    return (
      <Form className={props.class || 'form'}>
        <fieldset>
          { props.title && <legend>{ props.title }</legend> }
          {renderFields(inputs, {
            errors,
            touched
          })}
          <div className="form__submit">
            {props.cancelButton && (
              <button
                type="button"
                className="form__submit__btn form__submit__btn-secoundary"
                disabled={isSubmitting}
                onClick={props.reset ? () => resetForm() : props.onCancel}
              >
                {props.cancelButton}
              </button>
            )}
            <button
              type="submit"
              className="form__submit__btn form__submit__btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "loading" : props.submitButton || "Submit"}
            </button>
          </div>
        </fieldset>
      </Form>
    )
  }

  return (
    <Formik
      onSubmit={async (values, { setSubmitting, resetForm }) => {

        const addArgs = (args, val) => {
          if (args) {
            const newObj = {
              ...val,
              ...args,
            };
            return newObj
          } else {
            return val;
          }
        };
        try {
          const result = await props.handleSubmit({
            variables: addArgs(props.args, values),
            refetchQueries: props.refetch ? [{ query: props.refetch }] : null,
            awaitRefetchQueries: true
          });

          if (result) {
            props.onSuccess(result);
            resetForm();
            setSubmitting(false);

            if (props.redirect) {
              props.redirect();
            }
          }
        } catch (err) {
          props.onError && props.onError(err.message)
          setSubmitting(false);
        }
      }}
      validationSchema={buildSchema(props.fields)}
      initialValues={getInitialValues(props.fields)}
      render={formprops => renderForm(props.fields, formprops)}
    />
  );
}
