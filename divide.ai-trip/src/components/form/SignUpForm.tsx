
import { useRegisterMutate } from "@/hooks/authentication/UseRegister";
import { IUserRegister } from "@/interfaces/IUser";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  hidden?: string; 
}

const SignUpForm: React.FC<RegisterProps> = (props) => {
  const { mutate, isSuccess } = useRegisterMutate();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IUserRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFormData = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName, 
      password: formData.password,
      phoneNumber: formData.phoneNumber,
    };
    try {
      mutate(newFormData);
    } catch {
      console.error("Error");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      message.success("Cadastro realizado com sucesso!");
    }
  }, [isSuccess]);

  return (
    <div
      className={`bg-[#2A7C76] shadow-xl  w-3/12 h-[573px] flex flex-col justify-center items-center ${props.hidden} max-lg:bg-[#fff] max-lg:w-full max-lg:h-full `}
    >
      <h1 className="text-[#F7F6F6] font-semibold text-3xl  mb-[15px] mx-[auto] max-lg:text-[40px] max-lg:mb-[25px] max-lg:text-[#2A7C76]">
        Cadastro
      </h1>
      <form className="flex flex-col w-full max-lg:items-center " onSubmit={handleSubmit}>
      
        <input
          type="text"
          name="firstName"
          className="w-9/12 h-[46px] mx-[auto] mb-[15px] px-[20px] bg-[#F1F0F3] text-[#6C6A6A] font-regular border-solid border-2 border-[#6C6A6A]/[.6] hover:border-[#6C6A6A] focus:border-[#6C6A6A] outline-none rounded-lg placeholder:text-[#6C6A6A] placeholder:font-regular max-md:mx-[25px] max-lg:w-8/12 max-lg:bg-[#fff]"
          placeholder="Nome"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          className="w-9/12 h-[46px] mx-[auto] mb-[15px] px-[20px] bg-[#F1F0F3] text-[#6C6A6A] font-regular border-solid border-2 border-[#6C6A6A]/[.6] hover:border-[#6C6A6A] focus:border-[#6C6A6A] outline-none rounded-lg placeholder:text-[#6C6A6A] placeholder:font-regular max-md:mx-[25px] max-lg:w-8/12 max-lg:bg-[#fff]"
          placeholder="Sobrenome"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="w-9/12 h-[46px] mx-[auto] mb-[15px] px-[20px] bg-[#F1F0F3] text-[#6C6A6A] font-regular border-solid border-2 border-[#6C6A6A]/[.6] hover:border-[#6C6A6A] focus:border-[#6C6A6A] outline-none rounded-lg placeholder:text-[#6C6A6A] placeholder:font-regular max-md:mx-[25px] max-lg:w-8/12 max-lg:bg-[#fff]"
          placeholder="E-mail"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="w-9/12 h-[46px] mx-[auto] mb-[15px] px-[20px] bg-[#F1F0F3] text-[#6C6A6A] font-regular border-solid border-2 border-[#6C6A6A]/[.6] hover:border-[#6C6A6A] focus:border-[#6C6A6A] outline-none rounded-lg placeholder:text-[#6C6A6A] placeholder:font-regular max-md:mx-[25px] max-lg:w-8/12 max-lg:bg-[#fff]"
          placeholder="Senha"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          className="w-9/12 h-[46px] mx-[auto] mb-[15px] px-[20px] bg-[#F1F0F3] text-[#6C6A6A] font-regular border-solid border-2 border-[#6C6A6A]/[.6] hover:border-[#6C6A6A] focus:border-[#6C6A6A] outline-none rounded-lg placeholder:text-[#6C6A6A] placeholder:font-regular max-md:mx-[25px] max-lg:w-8/12 max-lg:bg-[#fff]"
          placeholder="Celular"
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Cadastrar"
          className="w-9/12 h-[46px] mx-[auto] cursor-pointer	 bg-[#F1F0F3] text-[#2A7C76] text-[18px] font-semibold rounded-lg max-md:mx-[30px] max-lg:w-8/12 max-lg:bg-[#2A7C76] max-lg:text-[#fff]"
        />
      </form>
    </div>
  );
};

export default SignUpForm;