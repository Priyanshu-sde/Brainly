import { ReactElement } from "react";

interface ButtonProps {
    variant : "primary" | "secondary";
    text: string;
    startIcon: ReactElement;
}

const variantClasses = {
    "primary" : "bg-purple-600 text-white p-4",
    "secondary" : "bg-purple-200 text-purple-400 p-4"
}

const defaultStyles = "px-4 py-2 rounded-md flex font-light items-center";

export function Button({variant, text, startIcon}: ButtonProps) {
    return <button className={ variantClasses[variant] +  " " + defaultStyles }>
        <div className="p-2">
        {startIcon}
        </div>
        {text}
    </button>
}