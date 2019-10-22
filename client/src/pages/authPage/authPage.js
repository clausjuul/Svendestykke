import React, { useEffect, useContext } from "react";
import { NavLink } from 'react-router-dom';
import Context from 'context/context';
import Breadcrumbs from "components/Breadcrums/Breadcrums";
import './authPage.scss';
import Login from './loginPage';
import Signup from './signupPage';

const SearchPage = (props) => {
  const { location } = props;

  const context = useContext(Context);

  // updating sideInfo' through global state/context
  // useEffect will only run on mount or/and when data changes
  // sideInfo = [title in hero, hero image id, show searchbar]
  // if hero image id is false, it will just keep the old one
  useEffect(() => {
      let sideInfo = [`Log ind side`, '40', true];
      context.setSideInfo(sideInfo);
      // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className="auth-page">
        <main className="content">
          <Breadcrumbs />
          <h2 className="content__title">Log ind</h2>
          <hr className="divider" />
          {location.pathname === "/login" && <Login {...props} />}
          {location.pathname === "/signup" && <Signup {...props} />}
        </main>
        <aside className="sidebar">
          <h3 className="sidebar__title">Problem med log ind?</h3>
          <ul className="sidebar__list">
            <li><NavLink to="/forgot">Glemt adgangskode?</NavLink></li>
            <li><NavLink to="/signup">Opret bruger</NavLink></li>
            <li><NavLink to="/login">Log ind</NavLink></li>
          </ul>
        </aside>
      </section>
    </>
  );
};
export default SearchPage;
