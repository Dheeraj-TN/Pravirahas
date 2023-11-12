import "./Footer.css";
import {
  PhoneOutlined,
  MailOutlined,
  WhatsAppOutlined,
  CopyrightCircleOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
function Footer() {
  return (
    <div className="footer">
      <div className="footer__info">
        <h2>Contact Us</h2>
        <div className="contact__info">
          <p>
            {" "}
            <PhoneOutlined rotate={90} className="social__icons" /> +91
            9876560934
          </p>
          <p>
            <MailOutlined className="social__icons" />
            abcd@gmail.com
          </p>
          <p>
            <WhatsAppOutlined className="social__icons" /> +91 9876450834
          </p>
          <p>
            <InstagramOutlined className="social__icons" />
            Praviras
          </p>
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
