export default function Input({ style = "green", register, name, ...rest }) {
  return (
    <input
      className={`my-1 rounded p-2 ring-1 ring-${style}-500 text-black`}
      {...register(name)}
      {...rest}
    />
  );
}
