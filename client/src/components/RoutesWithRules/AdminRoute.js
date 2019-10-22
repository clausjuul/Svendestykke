import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from 'context/context';

// export component and rest props
export default ({ component: Component, ...rest }) => {
    // getting context
    const context = useContext(Context)
    // return route & render with props
    return <Route {...rest} render={props => {
        const user = context.user;
        // render components if user's role = admin
        if (user && user.role === 'admin') {
            return <Component {...props} />
        } else {
            // else redirect to login with props to redirect back after login
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
    }} />
}