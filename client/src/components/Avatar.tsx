interface Props {
    url: string;
    name: string;
}

export function Avatar(props: Props) {
    return (
        <div className="avatar">
            <img src={props.url} alt={props.name} width="120" height="120" />
            <span>{props.name}</span>
        </div>
    );
}
