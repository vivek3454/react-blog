import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  return (
    <section className="relative overflow-hidden py-10 bg-white dark:bg-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col">
              <div className="mb-4 inline-flex items-center">
                <Link>
                  <Logo width="90px" />
                </Link>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2023. All Rights Reserved by .blog.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12 ">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium dark:text-gray-600 text-gray-900 dark:hover:text-[#9ED5CB] hover:text-[#9ED5CB]"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium dark:text-gray-600 text-gray-900 dark:hover:text-[#9ED5CB] hover:text-[#9ED5CB]"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium dark:text-gray-600 text-gray-900 dark:hover:text-[#9ED5CB] hover:text-[#9ED5CB]"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium dark:text-gray-600 text-gray-900 dark:hover:text-[#9ED5CB] hover:text-[#9ED5CB]"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase dark:text-gray-400 text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium dark:text-gray-600 text-gray-900 dark:hover:text-[#9ED5CB] hover:text-[#9ED5CB]"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium dark:text-gray-600 text-gray-900 dark:hover:text-[#9ED5CB] hover:text-[#9ED5CB]"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium dark:text-gray-600 text-gray-900 dark:hover:text-[#9ED5CB] hover:text-[#9ED5CB]"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium dark:text-gray-600 text-gray-900 dark:hover:text-[#9ED5CB] hover:text-[#9ED5CB]"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase dark:text-gray-400 text-gray-500">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium dark:text-gray-600 text-gray-900 dark:hover:text-[#9ED5CB] hover:text-[#9ED5CB]"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium dark:text-gray-600 text-gray-900 dark:hover:text-[#9ED5CB] hover:text-[#9ED5CB]"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium dark:text-gray-600 text-gray-900 dark:hover:text-[#9ED5CB] hover:text-[#9ED5CB]"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;