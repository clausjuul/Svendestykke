import React from "react";
import { Link, Route } from "react-router-dom";

import './Breadcrums.scss';

const crumb = (part, partIndex, parts) => {
  const path = ["", ...parts.slice(0, partIndex + 1)].join("/");
  return (
    <li key={path}>
      <Link className="crum" to={path}>
        {part}
      </Link>
    </li>
  );
};

const Breadcrumbs = () => (
    <Route
      path="*"
      render={props => {
        let parts = props.location.pathname.split("/");
        const place = parts[parts.length - 1];
        parts = parts.slice(1, parts.length - 1);
        return (
          <ul className="breadcrums">
            {parts.map(crumb)} > {place}
          </ul>
        );
      }}
    />
);
export default Breadcrumbs;