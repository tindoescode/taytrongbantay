import tw from "twin.macro";

export default function TextArea({
  style = "green",
  rows = 6,
  register,
  name,
  ...rest
}) {
  return (
    <textarea
      tw="my-1 rounded p-2 ring-1 ring-green-500 text-black overflow-y-auto"
      rows={rows}
      {...register(name)}
      {...rest}
    />
  );
}
