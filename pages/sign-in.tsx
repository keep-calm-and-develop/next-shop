import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import Button from "../components/Button";
import Field from "../components/Field";
import { Input } from "../components/Input";
import Page from "../components/Page";
import { useSignIn } from "../hooks/user";

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState('alice@example.com');
    const [password, setPassword] = useState('Pass123');
   
    const router = useRouter();
    const { signIn, signInError, signInLoading } = useSignIn();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const isLoginSuccessful = await signIn(email, password);
        if (isLoginSuccessful) {
            router.push('/');
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
                    signInError && (
                        <p className="text-red-700">
                            Invalid Credentials
                        </p>
                    )
                }
                <Button disabled={signInLoading} type='submit'>
                    {signInLoading ? 'Checking...' : 'Sign In'}
                </Button>
            </form>
        </Page>
    );
};

export default SignInPage;
