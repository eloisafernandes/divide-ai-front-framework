import { faGoogle, faApple, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconLogin } from '../icon/IconLogin';
import { useLoginMutate } from "@/hooks/authentication/UseLogin";
import { message } from "antd";
import { ILogin } from "@/interfaces/IUser";

export function LoginForm() {
    const [formData, setFormData] = useState<ILogin>({ email: '', password: '' });
    const { mutate, isSuccess } = useLoginMutate();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            mutate(formData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/dashboard');
            message.success("Login successful!");
        }
    }, [isSuccess]);

    return (
        <div className="bg-[#fff]  shadow-xl w-5/12 h-[573px] flex flex-col items-center justify-center max-lg:h-full max-lg:w-full">
            <h1 className=" w-5/12 mb-[20px] text-center text-[60px] text-[#29756F] font-medium  max-md:mb-[10px] max-md:w-6/12 ">
                Divide.<span className="text-[#8D8D8D] font-bold">ai</span>
            </h1>
            <form className="w-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="w-5/12 h-[46px] mb-[20px] px-[20px] bg-[#fff] text-[#6C6A6A] font-regular border-solid border-2 border-[#6C6A6A]/[.6] hover:border-[#6C6A6A] focus:border-[#6C6A6A] outline-none rounded-lg placeholder:text-[#6C6A6A] placeholder:font-regular  max-md:w-6/12"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite o email"
                />
                <input
                    type="password"
                    className="w-5/12 h-[46px]  mb-[10px] px-[20px] bg-[#fff] text-[#6C6A6A] font-regular border-solid border-2 border-[#6C6A6A]/[.6] hover:border-[#6C6A6A] focus:border-[#6C6A6A] outline-none rounded-lg placeholder:text-[#6C6A6A] placeholder:font-regular max-md:w-6/12"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Digite a senha"
                />

                <a
                    href="#"
                    className="w-5/12 cursor-pointer text-[#29756F] font-regular text-end max-md:text-[14px] max-md:w-6/12"
                >
                    Esqueceu a senha?
                </a>
                <input
                    type="submit"
                    value="Entrar"
                    className="w-5/12 h-[46px] cursor-pointer mt-[20px] bg-[#29756F] text-[#FFFFFF] text-[18px] font-regular rounded-lg max-md:w-6/12"
                />
            </form>
            <p className="w-5/12 text-center  text-[#757171] mx-[315px] mt-[15px] mb-[20px]  max-md:text-[14px] max-md:w-6/12">
                Logar com
            </p>

            <div className="w-5/12 flex gap-[22px] justify-center max-md:mx-[50px] max-md:w-6/12">
                <IconLogin icon={faGoogle} />
                <IconLogin icon={faApple} />
                <IconLogin icon={faFacebook} />
            </div>

            <Link
                to={"/register"}
                className="hidden  cursor-pointer mt-[15px] text-center underline text-[15px] text-[#29756F] max-lg:block max-md:w-6/12"
            >
                Register
            </Link>
        </div>
    );
}