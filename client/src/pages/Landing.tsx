import type { FC } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';

import { userStore } from '../user';
import { apiHost } from '../utils/constants';

const signupUrl = `${apiHost}/auth/signup`;

export const Landing: FC<RouteComponentProps> = () => {
    const { isLoggedIn } = userStore(state => ({ isLoggedIn: state.isLoggedIn }));

    if (isLoggedIn) return <Redirect to="/app" noThrow />;

    return (
        <div>
            <h1>Welcome</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam fugiat hic
                quisquam, rem soluta temporibus? A et explicabo magnam quidem sed! Dignissimos
                doloribus fugiat laboriosam nesciunt optio quas quia sapiente?
            </p>

            <a href={signupUrl}>Sign up with Github</a>
        </div>
    );
};
