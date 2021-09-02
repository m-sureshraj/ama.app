import type { ReactElement } from 'react';

import style from './avatar.module.scss';

interface Props {
    url: string;
    name: string;
}

export function Avatar(props: Props): ReactElement {
    return (
        <div className={style.avatar}>
            <img src={props.url} alt={props.name} width="120" height="120" />
            <span>{props.name}</span>
        </div>
    );
}
