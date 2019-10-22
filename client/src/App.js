import React, { Suspense } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
// import { useQuery } from "react-apollo-hooks";
// import gql from "graphql-tag";
// import { TimelineLite as timeline } from "gsap";
// import { Transition } from "react-transition-group";
// import Context from "context/context";

import Routes from 'routes';
import Navigation from 'components/Navigation/Navigation';
import Searchbar from "components/Searchbar/Searchbar";
import Loading from 'components/Loading/Loading';
import Hero from "components/Hero/Hero";
import AdminRoute from "components/RoutesWithRules/AdminRoute";

const Admin = React.lazy(() => import("./admin/admin"));

const App = (props) => {

  return (
    <>
      <Navigation {...props} />
      <Searchbar {...props} />
      <Hero {...props} />
      
      <Suspense fallback={<Loading {...props} />}>
        <Switch>
          <AdminRoute path="/admin" component={Admin} />
          <Route path="/" component={Routes} />
        </Switch>
      </Suspense>
    </>
  );
}
export default withRouter(App);
