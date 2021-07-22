import type { FC } from 'react';
import { Route, Redirect, RouteProps } from "wouter";

interface PublicRouteProps extends RouteProps  {
  component: any
}

export const PublicRoute: FC<PublicRouteProps> = ({ component: Component, ...rest }) => {
  const isLoggedIn = false;

  return (
    <Route {...rest}>
      {(params) =>
        isLoggedIn ? <Redirect to="/app"/> : <Component {...params} />
      }
    </Route>
  );
};
