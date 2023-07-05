import { FormEventHandler, useState } from "react";
import Button from "../components/Button";
import Field from "../components/Field";
import { Input } from "../components/Input";
import Page from "../components/Page";
import { SignIn } from "../lib/sign-in";
import { fetchJson } from "../lib/api";
import { useRouter } from "next/router";

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState('alice@example.com');
    const [password, setPassword] = useState('Pass123');
    const [status, setStatus] = useState({
        loading: false,
        error: false,
    });

    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setStatus({ loading: true, error: false });
        try {
            await fetchJson('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            setStatus({ loading: false, error: false });
            router.push('/');
        } catch (error) {
            setStatus({ loading: false, error: true });
        }
    };

    return (
        <Page title="Sign In">
            <form onSubmit={handleSubmit}>
                <Field label={'Email'}>
                    <Input
                        type="email"
                        value={email}
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Field>
                <Field label={'Password'}>
                    <Input
                        type="password"
                        value={password}
                        required
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Field>
                {
                    status.error && (
                        <p className="text-red-700">
                            Invalid Credentials
                        </p>
                    )
                }
                <Button disabled={status.loading} type='submit'>
                    {status.loading ? 'Checking...' : 'Sign In'}
                </Button>
            </form>
        </Page>
    );
};

export default SignInPage;
