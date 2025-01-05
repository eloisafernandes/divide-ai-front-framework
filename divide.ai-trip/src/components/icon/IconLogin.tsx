import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple, faFacebook } from "@fortawesome/free-brands-svg-icons";

export function IconLogin(props: { icon: any }) {
  return (
    <div className="bg-[] border-solid border-[#c5c5c5] border-[1px] w-[60px] h-[48px] flex justify-center items-center rounded-lg  max-md:h-[40px] max-md:w-[50px] max-md:px-[12px] max-md:py-[10px]">
      <FontAwesomeIcon icon={props.icon} className="fa-2xl text-[#2A7C76]" />
    </div>
  );
}