import { useRoute } from "wouter";

export function Private() {
    const [match] = useRoute("/app");

    if (!match) return null;

    return <div>You logged in</div>
}
