export default function TextArea({
  style = "green",
  rows = 6,
  register,
  name,
  ...rest
}) {
  return (
    <textarea
      className={`my-1 rounded p-2 ring-1 ring-${style}-500 text-black`}
      rows={rows}
      {...register(name)}
      {...rest}
    />
  );
}
