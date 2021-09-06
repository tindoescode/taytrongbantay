import styles from "../styles/Modal.module.css";

export default function Modal({
  title = "Modal Title",
  content = "lorem ipsum dolor sit amet",
  onProcess = { text: "Save", f: () => {} },
  onCancel = { text: "Cancel", f: () => {} },
}) {
  const onModalClick = (e) => {
    e.preventDefault();
    onProcess.f();
  };

  const onModalCancel = (e) => {
    e.preventDefault();
    onCancel.f();
  };
  return (
    <>
      <div className="absolute left-0 right-0 top-0 bottom-0 bg-purple-300 opacity-90 z-20"></div>
      <div id="Modal">
        <div
          className={`${styles.Modal} grid grid-rows-4 p-4 z-1 mx-4 md:mx-0 absolute md:w-1/2 h-1/2 top-1/4 md:left-1/4 bg-white shadow rounded-xl z-30 transform-gpu`}
        >
          <div className="text-2xl">{title}</div>
          <p className="row-span-3">{content}</p>

          <div className="flex justify-end">
            <button
              onClick={onModalClick}
              className="p-4 bg-green-500 hover:bg-green-400 transition transform hover:-translate-y-1 rounded shadow mr-1 px-4 text-white"
            >
              {onProcess.text}
            </button>
            <button
              onClick={onModalCancel}
              className="p-4 bg-red-500 hover:bg-red-400 transition transform hover:-translate-y-1 rounded shadow mr-1 px-4 text-white"
            >
              {onCancel.text}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
