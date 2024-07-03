"use client";

import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;

  size?: "large" | "small";
  value?: string | string[] | FileList | undefined;
  require?: boolean;
  id?: string;

  placeholder?: string;
  validation?: object;
  label?: string;
  className?: string;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
 
  require,
  placeholder,
  validation,
  label,
  className,
}: IInput) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? (
        <label className="text-sm   font-medium text-gray-700">{label}</label>
      ) : null}
      <br />
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <input
              type={type}
              className={className}
              placeholder={placeholder}
              {...field}
              // autoComplete="false"
              value={value ? value : field.value}
            />
          ) : type === "file" ? (
            <input
              required={require}
              type={type}
              className="file-input file-input-bordered file-input-primary w-full mt-3"
              placeholder={placeholder}
              {...field}
              onChange={(e) => field.onChange(e.target.files)}
              // autoComplete="false"
              // value={value ? value : field.value}
            />
          ) : (
            <input
              required={require}
              type={type}
              className={className}
              placeholder={placeholder}
              {...field}
             
              // autoComplete="false"
              value={value ? value : field.value}
            />
          )
        }
      />
    </>
  );
};

export default FormInput;
