import type { ReactChild, ReactElement } from 'react';
import { Link } from '@reach/router';

interface Props {
    header: ReactChild;
    onLogout: () => void;
}

export function Sidebar({ header, onLogout }: Props): ReactElement {
    return (
        <>
            {header}
            <button onClick={onLogout}>logout</button>
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
