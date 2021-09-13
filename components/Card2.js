import tw, { css, styled } from "twin.macro";
import Link from "next/link";

const CardWrapper = styled.div`
  background: url(${(props) => props.thumbnail}) no-repeat center center / cover;
  background-position: center;
  transition: transform 0.4s;
  &:hover {
    transform: scale(1.05);
  }
  ${tw`relative mb-3 bg-red-200 rounded-xl h-52 md:h-80 left-0 right-0 mx-auto shadow-2xl`}
`;
const Card2 = ({
  href = "#",
  title,
  description,
  category = {},
  thumbnail = "https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium.png",
}) => {
  return (
    <Link href={href}>
      <a>
        <CardWrapper thumbnail={thumbnail}>
          <div tw="absolute left-0 right-0 mx-auto bottom-0 bg-opacity-90 bg-white m-2 p-2 rounded shadow-xl">
            <a tw="" href="#">
              <div tw="flex items-center justify-between">
                <h2 tw="font-medium">{title}</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  tw="block text-gray-500 h-10 w-10 hover:opacity-80"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </a>
            <div tw="mt-2 flex gap-2 text-yellow-700">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  tw="inline h-5 w-5"
                  viewbox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span tw="font-semibold">4</span>
              </span>

              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  tw="inline h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clipRule="evenodd"
                  />
                </svg>
                <span tw="font-semibold">15</span>
              </span>
            </div>

            {/* <!-- <p tw="">HTTLVN.ORG – Năm 2021, chúng ta một lần nữa tiếp tục đối diện với những biến động thời cuộc. Thế nhưng, giữa những lo toan bộn bề ấy, một kỳ trại đặc biệt đã được tổ chức, vì tấm lòng cưu mang dành cho những người trẻ – “một thế hệ mới nổi lên” với nhiều khác biệt, cũng là thế hệ tiếp nối đức tin, là hi vọng và là một phần không thể tách rời của Hội Thánh.</p> --> */}
          </div>
        </CardWrapper>
      </a>
    </Link>
  );
};

export default Card2;
