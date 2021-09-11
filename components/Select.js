import tw, { styled } from "twin.macro";

export default function Select({
  register,
  name,
  required,
  children,
  ...rest
}) {
  return (
    <select
      tw="my-1 rounded p-2 ring-1 ring-green-500 text-black"
      {...register(name, { required })}
      {...rest}
    >
      {children}
    </select>
  );
}
