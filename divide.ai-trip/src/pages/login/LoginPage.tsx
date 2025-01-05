import { LoginForm } from "../../components/form/Loginform";
import SignUpForm  from "../../components/form/SignUpForm";

export function LoginPage() {
    return (
        <div className="w-full h-screen  bg-[#cde9e9] flex justify-center items-center max-lg:w-full max-lg:h-screen">
            <SignUpForm  hidden="max-lg:hidden"/>
            <LoginForm />
           
        </div>
    );
}