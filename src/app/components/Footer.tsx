import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="flex flex-col p-20 bg-white text-black">
      {/* //Logo, links, socials */}
      <div className="flex justify-between mb-16 items-center">
        {/* Logo */}
        <div className="flex justify-start w-1/4">
          <Logo />
        </div>
        {/* Links */}
        <div className="flex flex-row w-1/2 justify-center">
          <div className="flex flex-row gap-x-5">
            <div>Link One</div>
            <div>Link Two</div>
            <div>Link Three</div>
            <div>Link Four</div>
            <div>Link Five</div>
          </div>
        </div>
        {/* Socials */}
        <div className="flex flex-row w-1/4 justify-end gap-x-5">
          <div>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </div>
          <div>
            <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
          </div>
        </div>
      </div>
      {/* //Horizontal line */}
      <div className="h-[2px] bg-black mb-10"></div>
      {/* //Copyright */}
      <div className="flex flex-row gap-x-5 justify-center">
        <div>© 2024 Espresso18. All rights reserved.</div>
        <div className="underline">Privacy Policy</div>
        <div className="underline">Terms of Service</div>
        <div className="underline">Cookie Settings</div>
      </div>
    </footer>
  );
}