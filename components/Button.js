import tw, { styled } from "twin.macro";

const ButtonWrapper = styled.button`
  ${tw`rounded p-2 px-4 text-white transition`}
  ${(props) =>
    props.error
      ? tw`bg-red-400 hover:bg-red-300`
      : tw`bg-green-400 hover:bg-green-300`}
  ${(props) => {
    return props.type == "sm" ? tw`p-1 font-extralight` : "";
  }}
  & + & {
    margin-left: 0.5rem;
  }
`;

const Button = ({ onClick = null, children, ...props }) => {
  return (
    <ButtonWrapper onClick={onClick} {...props}>
      {children}
    </ButtonWrapper>
  );
};

export default Button;
