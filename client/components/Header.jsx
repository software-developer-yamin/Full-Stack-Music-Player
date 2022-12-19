import React, { useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { FaCrown } from "react-icons/fa";
import Link from "next/link";
import { setCookie } from "cookies-next";

const Header = () => {
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    router.replace("/login");
    setCookie("token", null);
  };

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <Link href={"/"}>
        <img src={"/img/logo.png"} className="w-16" alt="" />
      </Link>

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <Link href={"/"} legacyBehavior passHref>
            <a
              className={
                router.pathname.startsWith("/")
                  ? isActiveStyles
                  : isNotActiveStyles
              }
            >
              Home
            </a>
          </Link>
        </li>

        <li className="mx-5 text-lg">
          <Link href={"/musics"} legacyBehavior passHref>
            <a
              className={
                router.pathname.startsWith("/musics")
                  ? isActiveStyles
                  : isNotActiveStyles
              }
            >
              Musics
            </a>
          </Link>
        </li>

        <li className="mx-5 text-lg">
          <Link href={"/premium"} legacyBehavior passHref>
            <a
              className={
                router.pathname.startsWith("/premium")
                  ? isActiveStyles
                  : isNotActiveStyles
              }
            >
              Premium
            </a>
          </Link>
        </li>

        <li className="mx-5 text-lg">
          <Link href={"/contact"} legacyBehavior passHref>
            <a
              className={
                router.pathname.startsWith("/contact")
                  ? isActiveStyles
                  : isNotActiveStyles
              }
            >
              Contact
            </a>
          </Link>
        </li>
      </ul>

      <div
        className="relative flex items-center gap-2 ml-auto cursor-pointer"
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      >
        <img
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          src={user?.user?.imageURL}
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-textColor hover:text-headingColor">
            {user?.user.name}
          </p>
          <p className="flex items-center gap-2 text-xs font-normal text-gray-500">
            Premium Member.{" "}
            <FaCrown className="-ml-1 text-yellow-500 text-xm" />{" "}
          </p>
        </div>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute right-0 z-10 flex flex-col gap-4 p-4 rounded-lg shadow-lg top-12 w-275 bg-card backdrop-blur-sm"
          >
            <Link href={"/profile"} legacyBehavior passHref>
              <a className="text-base transition-all duration-150 ease-in-out text-textColor hover:font-semibold">
                Profile
              </a>
            </Link>
            <p className="text-base transition-all duration-150 ease-in-out text-textColor hover:font-semibold">
              My Favourites
            </p>
            <hr />
            {user?.user.role === "admin" && (
              <>
                <Link href={"/dashboard/home"} legacyBehavior passHref>
                  <p className="text-base transition-all duration-150 ease-in-out text-textColor hover:font-semibold">
                    Dashboard
                  </p>
                </Link>
                <hr />
              </>
            )}
            <p
              className="text-base transition-all duration-150 ease-in-out text-textColor hover:font-semibold"
              onClick={logout}
            >
              Sign out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
