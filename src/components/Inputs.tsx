import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	placeholder: string;
	type?: string;
	className?: string;
}

const Inputs: FC<InputProps> = ({
	name,
	type = "text",
	placeholder,
	className,
	...props
}) => {
	return (
		<input
			required
			name={name}
			type={type}
			autoComplete="off"
			placeholder={placeholder}
			className={`tracking-wider text-gray-500 placeholder:text-gray-500 py-3 px-4 rounded-md
      outline-none dark:bg-transparent dark:text-gray-300 dark:placeholder:text-gray-300 bg-transparent border border-gray-400 dark:border-gray-700 ${className}`}
			{...props}
		/>
	);
};

export default Inputs;
