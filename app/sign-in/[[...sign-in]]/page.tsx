import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-120px)] py-12">
            <SignIn path="/sign-in" />
        </div>
    );
}
