const UploadInput = ({ onChange }) => {
  return (
    <div className="UploadInput">
      <div className="flex w-full items-center justify-center bg-grey-lighter">
        <label className="w-64 flex flex-col items-center px-4 py-2 bg-pink-200 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-pink-500 hover:text-white">
            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Chọn file</span>
            <input onChange={onChange} type='file' className="hidden" />
        </label>
      </div>
    </div>
  )
}

export default UploadInput
