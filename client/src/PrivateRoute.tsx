import type { FC } from 'react';
import { Route, Redirect, RouteProps } from "wouter";

interface PrivateRouteProps extends RouteProps  {
  component: any
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const isLoggedIn = false;

  return (
    <Route {...rest}>
      {(params) =>
          isLoggedIn ? <Component {...params} /> : <Redirect to="/" />
      }
    </Route>
  );
};
