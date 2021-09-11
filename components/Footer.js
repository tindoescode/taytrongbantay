import React from "react";
import { useEffect } from "react";
import tw, { styled } from "twin.macro";

const FooterWrapper = styled.div`
  ${tw`w-screen py-4 opacity-60 fixed bottom-0 italic font-light text-center`};
`;
function Footer() {
  const loadFacebookSDK = () => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: "575780820222948",
        cookie: true,
        xfbml: true,
        version: "v11.0",
      });

      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  useEffect(() => {
    loadFacebookSDK();
  }, []);

  return (
    <FooterWrapper>
      Taytrongbantay, bản thử nghiệm không chính thức
    </FooterWrapper>
  );
}

export default Footer;
