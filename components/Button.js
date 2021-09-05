const Button = ({ onClick = null, style = "green", children }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded p-2 bg-${style}-300 hover:bg-${style}-500 text-white transition`}
    >
      {children}
    </button>
  );
};

export default Button;
