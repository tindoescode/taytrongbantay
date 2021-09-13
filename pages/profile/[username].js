/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import tw, { styled } from "twin.macro";
import FacebookLoading from "../../components/FacebookLoading";
import Head from "next/head";
import Image from "next/image";

const ProfileWrapper = styled.div`
  ${tw`h-6 w-full bg-purple-300`};
`;
const Cover = styled.div`
  background-image: url(${(props) => props.url});
  background-size: cover;
  ${tw`h-60 bg-cover bg-center relative rounded-t`};
`;

const Avatar = styled.div`
  ${tw`w-24 h-24 absolute bottom-0 left-0 right-0 mx-auto shadow rounded-full -mb-6`};
  background-image: url(${(props) => props.url});
  background-size: contain;
  background-repeat: no-repeat;
`;

const MainInfo = styled.div`
  ${tw`text-center bg-gray-700 pt-7 pb-3 rounded-b shadow`};
`;

const StyledImage = styled(Image)`
  display: inline;
`;

const UserProfile = () => {
  let router = useRouter();
  const { username } = router.query;
  let [targetUser, setTargetUser] = useState(null);

  useEffect(() => {
    if (username) {
      axios.post(`/api/user/get_user`, { username }).then((res) => {
        setTargetUser(res.data);
      });
    }
  }, [username]);

  if (!targetUser)
    return (
      <p tw="flex items-center justify-center text-lg">
        Loading... <FacebookLoading />
      </p>
    );
  return (
    <ProfileWrapper>
      <Cover
        url={
          targetUser.cover ||
          "https://github.com/tindoescode/taytrongbantay/raw/master/images/ttbt_cover.jpg"
        }
      >
        <Avatar url={targetUser.avatar} />
      </Cover>
      <MainInfo>
        <div tw="flex items-center justify-center gap-2">
          <h2 tw="inline text-2xl text-white">{targetUser.username}</h2>
        </div>
        <p tw="text-center text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-red-600">
          {targetUser.status}
        </p>
      </MainInfo>
      <style jsx>{`
        .inline {
          display: inline;
        }
      `}</style>
    </ProfileWrapper>
  );
};

export default UserProfile;
