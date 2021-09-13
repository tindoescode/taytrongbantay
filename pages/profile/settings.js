import { Widget } from "@uploadcare/react-widget";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useState } from "react";
import tw, { styled } from "twin.macro";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserSettings() {
  const [avatar, setAvatar] = useState(null);

  const onAvatarChange = (e) => {
    e.preventDefault();

    axios
      .put("/api/user/change_avatar", { avatarUrl: avatar })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          toast.success("Thay avatar thành công");
        } else {
          toast.error("Thay avatar không thành công");
        }
      });
  };

  const uploadToClient = (e) => {
    console.log(e);
    setAvatar(e.originalUrl);
    setCreateObjectURL(URL.createObjectURL(e.originalUrl));
  };

  return (
    <>
      <Title>Thay avatar</Title>
      <div tw="flex flex-col justify-center items-center p-4">
        {avatar && <img src={avatar} tw="mb-3 w-96" />}
        <Widget
          publicKey="533d4b8f6a11de77ba81"
          onChange={uploadToClient}
          clearable
        />
        {avatar && (
          <Button tw="mt-4" onClick={onAvatarChange}>
            Thay Avatar
          </Button>
        )}
      </div>
    </>
  );
}
