import styles from "../styles/Modal.module.css";
import tw, { css, styled } from "twin.macro";

export default function Modal({
  title = "Modal Title",
  onProcess = { text: "Save", f: () => {} },
  onCancel = { text: "Cancel", f: () => {} },
  noSubmitButton = false,
  children,
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
      <div
        onClick={onModalCancel}
        tw="z-10 fixed h-screen left-0 right-0 top-0 bottom-0 bg-pink-400 opacity-90"
      ></div>
      <div
        id={styles.Modal}
        css={[
          tw`w-screen p-3 overflow-y-auto md:w-11/12`,
          css`
            position: fixed;
            left: 50%;
            top: 50%;
            max-height: 80%;
            transform: translate(-50%, -50%);
            z-index: 50;
          `,
        ]}
      >
        <div
          className={`${styles.Modal}`}
          tw="p-4 mx-0 md:mx-4 bg-white shadow rounded-xl transform-gpu flex flex-col"
        >
          <div tw="flex">
            <div tw="flex-grow text-2xl mb-5">{title}</div>
            <a
              onClick={onModalCancel}
              tw="hover:cursor-pointer hover:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                tw="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>
          </div>

          <p tw="row-span-3">{children}</p>

          <div tw="flex justify-end">
            {!noSubmitButton && (
              <button
                onClick={onModalClick}
                tw="p-4 bg-green-500 hover:bg-green-400 transition transform hover:-translate-y-1 rounded shadow mr-1 px-4 text-white"
              >
                {onProcess.text}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
