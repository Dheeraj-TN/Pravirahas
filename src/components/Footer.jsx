import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";
import {
  PhoneOutlined,
  MailOutlined,
  WhatsAppOutlined,
  CopyrightCircleOutlined,
  InstagramOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import ProgressBar from "@badrap/bar-of-progress";
function Footer() {
  const progressor = new ProgressBar({
    size: 5,
    color: "rgb(113, 56, 3)",
    delay: 100,
    width: 50,
  });
  const navigate = useNavigate();
  const goToAboutus = () => {
    progressor.start();
    setTimeout(() => {
      progressor.finish();
      navigate("/aboutus");
    }, 1000);
  };
  return (
    <div className="footer">
      <div className="footer__info">
        <h2>Contact Us</h2>
        <div className="contact__info">
          <p onClick={goToAboutus}>
            <InfoCircleOutlined className="social__icons" />
            About Us
          </p>
          <p>
            {" "}
            <PhoneOutlined rotate={90} className="social__icons" /> +91
            9535241999
          </p>
          <p>
            <MailOutlined className="social__icons" />
            praviras16@gmail.com
          </p>
          <p>
            <WhatsAppOutlined className="social__icons" /> +91 9535241999
          </p>
          <Link to="https://www.instagram.com/__praviras__?igsh=Ymx2dmVnZWM4ZTB5">
            <p>
              <InstagramOutlined className="social__icons" />
              __praviras__
            </p>
          </Link>
        </div>
        {/* <PhoneOutlined rotate={90} className="social__icons" />
        <MailOutlined className="social__icons" />
        <WhatsAppOutlined className="social__icons" />
        <InstagramOutlined className="social__icons" /> */}
      </div>
      <div className="footer__copyright">
        <p>
          <CopyrightCircleOutlined /> Praviras 2023 , all rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
