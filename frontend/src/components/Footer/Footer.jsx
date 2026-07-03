import "./Footer.css";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footerTop">

        <h2>Task Manager</h2>

        <p>
          Organize your work efficiently with MERN Stack.
        </p>

      </div>

      <div className="footerMiddle">

        <p>

          Developed with <FaHeart className="heart" /> by

          <span> Krishna Jangid</span>

        </p>

        <div className="socialLinks">

          <a
            href="https:/github.com/krishna5511"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/krishna-jangid-baa236404?utm_source=share_via&utm_content=profile&utm_medium=member_android&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnhwiZDYw28r18MFa6Rtu7y23n5nN04Rcnl_1xnuq8BZjt-0vezc5yq4LIG4o_aem_pawwKzdmZIUHsu9LhyOgtg"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://instagram.com/krishnajangid__07?igsh=dmRmN3A3OTJjaXFv"
            target="_blank"
            rel="noreferrer"
            title="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="krjangid0123@gmail.com"
            title="Email"
          >
            <FaEnvelope />
          </a>

        </div>

      </div>

      <div className="footerBottom">

        © {new Date().getFullYear()} Krishna Jangid • All Rights Reserved

      </div>

    </footer>
  );
};

export default Footer;