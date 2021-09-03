import React from 'react'
import { useEffect } from 'react'

function Footer() {
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '575780820222948',
          cookie     : true,
          xfbml      : true,
          version    : 'v11.0'
        });
          
        FB.AppEvents.logPageView();   
          
      };
    
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    } 

    useEffect(() => {
      loadFacebookSDK();
    }, [])

    return (

        <div className="w-screen bg-green-100 p-1 fixed bottom-0 italic font-light text-center">
            Taytrongbantay, bản thử nghiệm không chính thức 
        </div>
    )
}

export default Footer
