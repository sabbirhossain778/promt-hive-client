
import SignInForm from "./SignInForm";

export default async function SignInPage({ searchParams }) {
    const params = await searchParams;
    const redirectTo = params?.redirect || "/";

    return <SignInForm redirectTo={redirectTo} />;
}