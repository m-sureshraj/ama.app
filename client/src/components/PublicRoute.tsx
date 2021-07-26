import type { FC } from 'react';
import { Route, Redirect, RouteProps } from 'wouter';

import { userStore } from '../store';

interface PublicRouteProps extends RouteProps {
    component: FC;
}

export const PublicRoute: FC<PublicRouteProps> = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = userStore(state => ({ isLoggedIn: state.isLoggedIn }));

    return (
        <Route {...rest}>
            {params => (isLoggedIn ? <Redirect to="/app" /> : <Component {...params} />)}
        </Route>
    );
};
