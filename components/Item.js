const Item = ({ onClick = null, style = "green", children }) => {
  return (
    <div
      onClick={onClick}
      className={`Item rounded p-2 bg-${style}-100 hover:bg-${style}-200 transition`}
    >
      {children}

      <style jsx>
        {`
          .Item + .Item {
            margin-top: 0.5rem;
        `}
      </style>
    </div>
  );
};

export default Item;
