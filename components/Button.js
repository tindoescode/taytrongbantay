
const Button = ({ onClick = null, style = "green", children }) => {
  return (
    <button
      onClick={onClick}
      className={`Button rounded p-2 px-4 bg-${style}-300 hover:bg-${style}-500 text-white transition`}
    >
      {children}

      <style jsx>
        {`
          .Button + .Button {
            margin-left: 0.5rem;
        `}
      </style>
    </button>
  );
};

export default Button;
