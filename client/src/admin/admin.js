import React, { Suspense } from "react";
import { Route, Link, Switch } from "react-router-dom";

import Loading from "components/Loading/Loading";
import styles from './admin.module.scss';

const Users = React.lazy(() => import("./users/users"));

const Admin = (props) => {
  const { match } = props;

  return (
    <div className={styles.admin}>
      <nav className={styles.nav}>
        <ul className={styles.navbar}>
          <li className={styles.item}>
            <Link to={`${match.url}`}>index</Link>
          </li>
          <li className={styles.item}>
            <Link to={`${match.url}/users`}>Users</Link>
          </li>
        </ul>
      </nav>

      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path={match.url} render={() => "admin"} exact />

          <Route
            path={`${match.url}/users/:user/:action`}
            component={Users}
            exact
          />
          <Route path={`${match.url}/users/:action`} component={Users} exact />
          <Route path={`${match.url}/users`} component={Users} exact />
        </Switch>
      </Suspense>
    </div>
  );
}
export default Admin;