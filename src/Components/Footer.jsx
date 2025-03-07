import React from "react";
import appStore from "../../images/Appstore.png";
import playStore from "../../images/playstore.png";

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="leftFooter">
          <h4>Download Our App</h4>
          <p>Download App for Android and IOS mobile phone</p>
          <img src={appStore} alt="PlayStore" />
          <img src={playStore} alt="AppStore" />
        </div>
        <div className="midFooter">
          <h1>E-Commerce</h1>
          <p>We offer good quality products.</p>
          <p>Copyrights 2025 &copy;</p>
        </div>
        <div className="rightFooter">
          <h4>Contact Me</h4>
          <a href="https://x.com/PriyamK05820674">X</a>
          <a href="https://www.linkedin.com/in/priyam-kumar-154ab1340/">
            Linkedin
          </a>
          <a href="https://github.com/priyamkumar">Github</a>
        </div>
      </div>
    </footer>
  );
}
