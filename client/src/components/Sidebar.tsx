import type { ReactChild, ReactElement } from 'react';
import { Link } from '@reach/router';

interface Props {
    header: ReactChild;
}

export function Sidebar({ header }: Props): ReactElement {
    return (
        <>
            <>{header}</>
            <ul>
                <li>
                    <Link to="./">Watch List</Link>
                </li>
                <li>
                    <Link to="popular-ama-repos">Popular AMAs</Link>
                </li>
                <li>
                    <Link to="search">Search</Link>
                </li>
                <li>
                    <Link to="settings">Settings</Link>
                </li>
            </ul>
        </>
    );
}
