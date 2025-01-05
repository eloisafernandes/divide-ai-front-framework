import SignUpForm  from "../../components/form/SignUpForm";

export function RegisterPage() {
    return (
        <div className="w-full h-screen bg-[#fff] flex justify-center items-center max-lg:w-full max-lg:h-screen">
            <SignUpForm/>
        </div>
    );
}