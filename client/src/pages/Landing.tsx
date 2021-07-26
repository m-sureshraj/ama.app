import { useRoute } from "wouter";

const signupUrl = `${process.env.REACT_APP_API_HOST}/auth/signup`;

export default function Landing() {
    const [match] = useRoute("/");
    if (!match) return null;

    return (
        <div>
            <h1>Welcome</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam fugiat hic quisquam,
                rem soluta temporibus? A et explicabo magnam quidem sed! Dignissimos doloribus fugiat laboriosam
                nesciunt optio quas quia sapiente?</p>

            <a href={signupUrl}>Sign up with Github</a>
        </div>
    )
}
