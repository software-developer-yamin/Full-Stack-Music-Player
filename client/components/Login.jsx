import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useRouter } from "next/router";
import { validateUser } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window?.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              window.localStorage.setItem("auth", "true");
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            router.replace("/");
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            router.replace("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") router.replace("/");
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <video
        src={"/video/login_bg.mp4"}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="object-cover w-full h-full"
      ></video>
      <div className="absolute inset-0 flex items-center justify-center p-4 bg-darkOverlay">
        <div className="flex flex-col items-center justify-center w-full p-4 rounded-md shadow-2xl md:w-375 bg-lightOverlay backdrop-blur-md">
          <div
            onClick={loginWithGoogle}
            className="flex items-center justify-center gap-2 px-4 py-2 transition-all duration-100 ease-in-out rounded-md cursor-pointer bg-cardOverlay hover:bg-card hover:shadow-md"
          >
            <FcGoogle className="text-xl" />
            <p>Signin with Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
