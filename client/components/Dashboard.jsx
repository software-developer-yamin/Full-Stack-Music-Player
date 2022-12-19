import React from "react";
import { IoHome } from "react-icons/io5";
import { DashboardNewSong } from ".";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardAlbum from "./DashboardAlbum";
import DashboardArtist from "./DashboardArtist";
import DashBoardHome from "./DashBoardHome";
import DashboardSongs from "./DashboardSongs";
import DashboardUser from "./DashboardUser";
import Header from "./Header";
import Link from "next/link";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto bg-primary">
      <Header />

      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        <Link href={"/dashboard/home"}>
          <IoHome className="text-2xl text-textColor" />
        </Link>
        <Link href={"/dashboard/user"} legacyBehavior passHref>
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

      {/* <div className="w-full p-4 my-4">
        <Routes>
          <Route path="/home" element={<DashBoardHome />} />
          <Route path="/user" element={<DashboardUser />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/artist" element={<DashboardArtist />} />
          <Route path="/albums" element={<DashboardAlbum />} />
          <Route path="/newSong" element={<DashboardNewSong />} />
        </Routes>
      </div> */}
    </div>
  );
};

export default Dashboard;
