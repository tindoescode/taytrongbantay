import tw, { styled } from "twin.macro";

const Button = ({ onClick = null, children }) => {
  return (
    <button
      onClick={onClick}
      className={`Button`}
      tw="rounded p-2 px-4 bg-green-300 hover:bg-green-500 text-white transition"
    >
      {children}

      <style jsx>
        {`
          .Button + .Button {
            margin-left: 0.5    return (
              <p tw="flex items-center justify-center text-lg">
                Loading... <FacebookLoading />
              </p>
            );rem;
        `}
      </style>
    </button>
  );
};

export default Button;
