import tw, { styled } from "twin.macro";

export default function Input({ register, name, ...rest }) {
  return (
    <input
      tw="my-1 rounded p-2 ring-1 ring-green-500 text-black"
      {...register(name)}
      {...rest}
    />
  );
}
