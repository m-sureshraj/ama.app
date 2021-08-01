import type { FC } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';

import { userStore } from '../store';

interface Props extends RouteComponentProps {}

const signupUrl = `${process.env.REACT_APP_API_HOST}/auth/signup`;

export const Landing: FC<Props> = () => {
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
