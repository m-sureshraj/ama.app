import type { FC } from 'react';
import { Route, Redirect, RouteProps } from 'wouter';

import { userStore } from '../store';

interface PrivateRouteProps extends RouteProps {
    component: FC;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = userStore(state => ({ isLoggedIn: state.isLoggedIn }));

    return (
        <Route {...rest}>
            {params => (isLoggedIn ? <Component {...params} /> : <Redirect to="/" />)}
        </Route>
    );
};
