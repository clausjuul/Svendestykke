import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from 'react-apollo-hooks';

import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import { EditIcon, DeleteIcon } from './icons';

import "./users.scss";

export const GET_USERS = gql`
  query getAllUsers {
    users {
      _id
      firstname
      lastname
      email
      role
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($_id: ID) {
    deleteUser(_id: $_id) {
      firstname
    }
  }
`;

const Users = forwardRef((props, ref) => {
  const { location, history, match: { path, params } } = props;

  const [deleteUserMutation] = useMutation(DELETE_USER);
  const { error, data } = useQuery(GET_USERS, { suspend: true });

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [createBtnRect, setCreateBtnRect] = useState(null)
  const createBtnRef = useRef();
  const _url = '/admin/users';

  useEffect(() => {

    if (path === `${_url}/:action` && params.action === 'create') {
      setCreateBtnRect(createBtnRef.current.getBoundingClientRect());
      setShowCreate(true);
    } 

    else if (path === `${_url}/:user/:action` && params.action === 'edit') {
      setShowEdit(true);
    } 

    else if (location.pathname !== _url) {
      history.push(_url);
    } 

    else {
      showCreate && setShowCreate(false);
      showEdit && setShowEdit(false);
    }
  // eslint-disable-next-line
  }, [path, params, location])

  return (
    <>
      {error && <div className="error">{error.message}</div>}
      <ul className="users-container">
        <li ref={createBtnRef} data-createbtn>
          <Link to={`${_url}/create`} className="create-button color-btn">
            CreateUser
          </Link>
        </li>
        <li className="user user__headings">
          <span> fullname: </span>
          <span> email: </span>
          <span> role: </span>
          <span className="user-row-icon"> Edit </span>
          <span className="user-row-icon"> Delete </span>
        </li>

        {data &&
          data.users.map(user => (
            <li key={`usersListItem-${user._id}`} className="user">
              <span>
                {user.firstname} {user.lastname}
              </span>
              <span>{user.email}</span>
              <span>{user.role}</span>
              <span className="user-row-icon">
                <Link
                  to={{
                    pathname: `users/${user.fullname}/edit`,
                    state: { user }
                  }}
                >
                  <EditIcon />
                </Link>
              </span>
              <span
                className="user-row-icon"
                onClick={() =>
                  deleteUserMutation({
                    variables: { _id: user._id },
                    refetchQueries: ["getAllUsers"]
                  })
                }
              >
                <DeleteIcon />
              </span>
            </li>
          ))}

        <CreateUser
          show={showCreate}
          rect={createBtnRect}
          setShow={setShowCreate}
          {...props}
        />

        {location.state && location.state.user && (
          <EditUser show={showEdit} setShow={setShowEdit} {...props} />
        )}
      </ul>
    </>
  );
})
export default Users