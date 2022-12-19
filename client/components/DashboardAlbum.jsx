import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";

import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { actionType } from "../Context/reducer";
import { getAllAlbums } from "../api";

const DashboardAlbum = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="relative flex flex-wrap w-full gap-3 p-4 py-12 my-4 border border-gray-300 rounded-md justify-evenly">
        {allAlbums &&
          allAlbums.map((data, index) => (
            <>
              <AlbumCard key={index} data={data} index={index} />
            </>
          ))}
      </div>
    </div>
  );
};

export const AlbumCard = ({ data, index }) => {
  const [isDelete, setIsDelete] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative flex flex-col items-center gap-3 px-2 py-4 overflow-hidden bg-gray-100 rounded-lg shadow-md cursor-pointer w-44 min-w-180 hover:shadow-xl hover:bg-card"
    >
      <img
        src={data?.imageURL}
        className="object-cover w-full h-40 rounded-md"
        alt=""
      />

      <p className="text-base text-textColor">{data.name}</p>

      <motion.i
        className="absolute bottom-2 right-2"
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >
        <MdDelete className="text-xl text-gray-400 cursor-pointer  hover:text-red-400" />
      </motion.i>

      {isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-2 bg-darkOverlay backdrop-blur-md"
        >
          <p className="text-base text-center text-gray-100">
            Are you sure do you want to delete this?
          </p>
          <div className="flex items-center justify-center w-full gap-3">
            <div className="px-3 bg-red-300 rounded-md">
              <p className="text-sm text-headingColor">Yes</p>
            </div>
            <div
              className="px-3 bg-green-300 rounded-md"
              onClick={() => setIsDelete(false)}
            >
              <p className="text-sm text-headingColor">No</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardAlbum;
