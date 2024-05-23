import Image from "next/image";
import Link from "next/link";

type ButtonProps = {
  type: "button" | "submit";
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
};

const Button = ({ type, title, icon, variant, full }: ButtonProps) => {
  return (
    <Link
      href={"/login"}
      className={`flexCenter gap-3 rounded-full border ${variant} ${
        full && "w-full"
      }`}
      // type={type}
      role="button"
    >
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <label className="bold-16 whitespace-nowrap cursor-pointer">
        {title}
      </label>
    </Link>
  );
};

export default Button;
