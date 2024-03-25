import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="flex flex-col p-12 md:p-20 bg-white text-black">
      {/* //Logo, links, socials */}
      <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-16 items-center gap-4">
        {/* Logo */}
        <div className="flex justify-start md:w-1/4">
          <Logo />
        </div>
        {/* Links */}
        <div className="flex flex-row md:w-1/2 justify-center w-[100%]">
          <div className="flex md:flex-row flex-wrap gap-x-5 justify-center">
            <div>Link One</div>
            <div>Link Two</div>
            <div>Link Three</div>
            <div>Link Four</div>
            <div>Link Five</div>
          </div>
        </div>
        {/* Socials */}
        <div className="flex flex-row md:w-1/4 justify-end gap-x-5">
          <div>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </div>
          <div>
            <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
          </div>
        </div>
      </div>
      {/* //Horizontal line */}
      <div className="h-[2px] bg-black mb-8 md:mb-10"></div>
      {/* //Copyright */}
      <div className="flex flex-wrap md:flex-row gap-x-5 justify-center">
        <div className="text-center">
          <span>&copy; 2024 Espresso18. All rights reserved.</span>
        </div>
        <div className="underline">Privacy Policy</div>
        <div className="underline">Terms of Service</div>
        <div className="underline">Cookie Settings</div>
      </div>
    </footer>
  );
}
