"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Logo from "./Logo";

export default function Footer() {
  const navigateExternalTab = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <footer className="flex flex-col p-12 md:p-20 bg-white text-black">
      {/* //Horizontal line */}
      <div className="h-[2px] bg-black mb-8 md:mb-10"></div>
      {/* //Logo, links, socials */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <div className="flex justify-start md:w-1/4">
          <Logo />
        </div>
        <div className="hidden md:block text-center">
          <span className="text-sm">
            &copy; 2024 Espresso18. All rights reserved.
          </span>
        </div>
        <div className="flex flex-row md:w-1/4 justify-end gap-x-5">
          <button
            onClick={() =>
              navigateExternalTab("https://www.instagram.com/espresso18cp/")
            }
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </button>
          <button
            onClick={() =>
              navigateExternalTab(
                "https://www.facebook.com/espresso18cp?mibextid=LQQJ4d"
              )
            }
          >
            <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
          </button>
        </div>
        <div className="md:hidden text-center">
          <span className="text-sm">
            &copy; 2024 Espresso18. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
