import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import UserRoute from "components/RoutesWithRules/UserRoute";
import Loading from "components/Loading/Loading";
import HomePage from "pages/homePage/homePage";
// import AuthPage from 'pages/authPage/authPage';
// import SearchPage from "pages/searchPage/searchPage";
// import ReservationPage from "pages/reservationPage/reservationPage";

const AuthPage = React.lazy(() => import("pages/authPage/authPage"));
const SearchPage = React.lazy(() => import("pages/searchPage/searchPage"));
const ReservationPage = React.lazy(() =>
  import("pages/reservationPage/reservationPage")
);
const ProfilePage = React.lazy(() => import("./pages/profilePage/profilePage"));
const HotelsDestinationsPage = React.lazy(() =>
  import("pages/hotelsDestinations/hotelsDestinationsPage")
);

const Routes = (props) => {
  const { location } = props;

  return (
    <Suspense fallback={<Loading />}>
      <Switch location={location}>
        <Route path="/" component={HomePage} exact />

        <Route
          path="/hoteller-og-destinationer"
          component={HotelsDestinationsPage}
          exact
        />

        <Route
          path="/hoteller-og-destinationer/:country"
          component={HotelsDestinationsPage}
          exact
        />

        <Route
          path="/hoteller-og-destinationer/:country/:city"
          component={HotelsDestinationsPage}
          exact
        />

        <Route
          path="/hoteller-og-destinationer/:country/:city/:hotel"
          component={HotelsDestinationsPage}
          exact
        />

        <Route path="/signup" component={AuthPage} exact />
        <Route path="/login" component={AuthPage} exact />
        <Route path="/search" component={SearchPage} exact />
        <Route path="/reservation" component={ReservationPage} exact />
        <UserRoute path="/bruger-side/edit" component={ProfilePage} exact />
        <UserRoute path="/bruger-side/booking/:edit" component={ProfilePage}  />
        <UserRoute path="/bruger-side" component={ProfilePage} exact />
        <Route
          render={() => (
            <h3>
              No match for <code>{location.pathname}</code>
            </h3>
          )}
        />
      </Switch>
    </Suspense>
  )
}
export default Routes