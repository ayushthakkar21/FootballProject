import React from "react";

const Footer = () => {
  return (
    <footer className="footer py-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 text-center">
     
          {/* Footer Links */}
          <p className="mt-4 ">
            © 2024 Football App. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <a
              href="#"
              className=" hover:text-mainColor transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className=" hover:text-mainColor transition-colors"
            >
              Contact
            </a>
            <a
              href="#"
              className=" hover:text-mainColor transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
