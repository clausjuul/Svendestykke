import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { LogoIcon } from 'components/Icons/LogoIcon';
import { Tween } from 'react-gsap';

import Context from "context/context";
import './Navigation.scss';

const NavData = [
  {
    to: "/",
    label: "Forside",
    exact: true
  },
  {
    to: "/hoteller-og-destinationer",
    label: "Hoteller & destinationer",
    exact: false
  },
  {
    to: "/rooms",
    label: "Værelser",
    exact: false
  },
  {
    to: "/reservation",
    label: "Reservation",
    exact: false
  }
];

const Logo = () => (
  <li className="nav__logo">
    <Link to="/">
      <LogoIcon />
    </Link>
  </li>
);

const NavItem = ({ to, label, exact }) => (
  <li className="navbar__item">
    <NavLink exact={exact ? true : false} to={to}>
      {label}
    </NavLink>
  </li>
);

const Navigation = () => {
  const context = useContext(Context);

  return (
    <div className="nav-wrapper">
      <Tween
        from={{ y: "10%" }}
        to={{ y: "0%" }}
        duration={0.5}
        playState={context.showSearchbar ? "play" : "reverse"}
      >
        <nav className="nav">
          <Logo />
          <ul className="navbar">
            {NavData.map((item, i) => (
              <NavItem key={`navItem-${i}`} to={item.to} label={item.label} exact={item.exact} />
            ))}
            {!!context.user ? (
              <NavItem to={`/bruger-side`} label={"Bruger side"} />
            ) : (
              <NavItem to={"/login"} label={"Log ind"} />
            )}
            {context && context.user && context.user.role && context.user.role === "admin" && (
              <NavItem to={"/admin"} label={"Admin"} />
            )}
          </ul>
        </nav>
      </Tween>
    </div>
  );
};
export default Navigation
