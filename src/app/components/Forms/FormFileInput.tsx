"use client";

import { useFormContext, Controller } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | FileList | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  className?: string;
}

const FormFileInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  className,
}: IInput) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <input
            type={type}
            className="file-input file-input-bordered file-input-primary w-full mt-3"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            // autoComplete="false"
            // value={value ? value : field.value}
          />
        )}
      />
    </>
  );
};

export default FormFileInput;
