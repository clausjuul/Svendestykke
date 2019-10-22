import React, { useState } from "react";
import Form from "components/Form/Form";
import * as Yup from "yup";
import Backdrop from 'components/Backdrop/Backdrop';

export default (props) => {
  const { user: { _id, fullname, firstname, lastname, email, role }, match } = props;

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };


  const fields = [
    {
      label: "firstname",
      type: "input",
      name: "firstname",
      initialValue: firstname,
      autofocus: true

      // validation: Yup.string().required("title is required"),
    },
    {
      label: "lastname",
      type: "input",
      name: "lastname",
      initialValue: lastname,
      autofocus: true

      // validation: Yup.string().required("title is required"),
    },
    {
      label: "email",
      type: "input",
      name: "email",
      initialValue: email
      // validation: Yup.string().required("description is required"),
    },
    {
      label: "role",
      type: "input",
      name: "role",
      initialValue: role
      // validation: Yup.string(),
    }
  ];

  return (
    <>
      <div className="project__list__item">
        <span> {_id}</span>
        <span>
          {firstname} {lastname}
        </span>
        <span> {email}</span>
        <span> {role}</span>
        <button onClick={() => props.delete(_id)}>X</button>
        <button onClick={() => setIsOpen(true)}>O</button>
        {/* <span>cb: {cb}</span> */}
      </div>
      {isOpen && (
        <>
          <div className="modal">
            <span className="modal__close" onClick={() => closeModal()}>
              X
            </span>
            <Form
              title={"Edit user"}
              // class={"form"}
              submitButton={"update"}
              onSubmit={props.update}
              onCancel={closeModal}
              // secoundValue={_id}
              fields={fields}
              // callback={callB}
              validation={Yup.object().shape({
                title: Yup.string().required("title is required"),
                description: Yup.string().required("description is required"),
                category: Yup.string()
              })}
            />
          </div>
          <Backdrop close={closeModal} />
        </>
      )}
    </>
  );
}