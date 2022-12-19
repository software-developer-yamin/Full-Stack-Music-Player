import React from "react";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";
import { Header, DashboardAlbum } from "../../components";
import Link from "next/link";
import { useRouter } from "next/router";

const DashboardAlbumPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto bg-primary">
      <Header />
      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        <Link href={"/dashboard/home"} legacyBehavior passHref>
          <a
            className={
              router.pathname.startsWith("/dashboard/home")
                ? isActiveStyles
                : isNotActiveStyles
            }
          >
            <IoHome className="text-2xl text-textColor" />
          </a>
        </Link>
        <Link href={"/dashboard/user"} legacyBehavior passHref >
          <a
            className={
              router.pathname.startsWith("/dashboard/user")
                ? isActiveStyles
                : isNotActiveStyles
            }
          >
            Users
          </a>
        </Link>
        <Link href={"/dashboard/songs"} legacyBehavior passHref>
          <a
            className={
              router.pathname.startsWith("/dashboard/songs")
                ? isActiveStyles
                : isNotActiveStyles
            }
          >
            Songs
          </a>
        </Link>
        <Link href={"/dashboard/artist"} legacyBehavior passHref>
          <a
            className={
              router.pathname.startsWith("/dashboard/artist")
                ? isActiveStyles
                : isNotActiveStyles
            }
          >
            Artist
          </a>
        </Link>
        <Link href={"/dashboard/albums"} legacyBehavior passHref>
          <a
            className={
              router.pathname.startsWith("/dashboard/albums")
                ? isActiveStyles
                : isNotActiveStyles
            }
          >
            Albums
          </a>
        </Link>
      </div>
      <div className="w-full p-4 my-4">
        <DashboardAlbum />
      </div>
    </div>
  );
};

export default DashboardAlbumPage;