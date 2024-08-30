import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", icon, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full ">
      <div className="flex items-center gap-1 select-none font-semibold">
        {icon && <span>{icon}</span>}
        {label && (
          <label className=" inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      <input
        type={type}
        className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
