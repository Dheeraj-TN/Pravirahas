/* eslint-disable react/no-unescaped-entities */
import "./AboutUs.css";
import Header from "./Header";
import aboutLogo from "/praviras.png?url";
import { Fade } from "react-reveal";
function AboutUs() {
  return (
    <>
      <Header />
      <div className="about__us">
        <div className="aboutus__img">
          <Fade left>
            <img src={aboutLogo} alt="" />
          </Fade>
        </div>

        <div className="aboutus__info">
          <Fade>
            <h1>
              About Us
              <Fade left>
                <div className="underline"></div>
              </Fade>
            </h1>
          </Fade>
          <Fade right>
            <p>
              Pravira's the elegance was born out of a mother's curiosity to
              instill the concept of Independence in her child. Let me
              elaborate, 2 choices were in front of me. One my career & the
              other my daughter. I chose my princess. But I didn't realize that
              my daughter was observing me each day. One day she comes to me and
              says Amma, I want to be like you. What a happy day for a mother
              but the next few words shook me hard. She added that she wanted to
              do all the house chores & stay at home. Just like me. Not wrong at
              all, BUT being my daughter's hope I wanted her to see my
              entrepreneur skills too. That's how my venture was born. A world
              filled with handcrafted jewellery's. That's done with same love
              and care that a mother shows to her child. Converting my passion
              into profession is the first step towards our journey. Pravira's
              is home of jewellery's our design, your designs anything u say can
              be done. So do visit us. And support a mother's passion.
            </p>
          </Fade>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
