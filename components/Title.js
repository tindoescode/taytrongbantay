import tw, { styled } from "twin.macro";

const Title = ({ children, ...rest }) => {
  console.log(rest);
  return (
    <div
      tw="p-2 bg-green-400 text-white font-bold border-green-400 rounded-t"
      {...rest}
    >
      {children}
    </div>
  );
};

export default Title;
