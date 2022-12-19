import "../styles/globals.css";
import { StateProvider } from "../Context/StateProvider";
import { initialState } from "../Context/initalState";
import reducer from "../Context/reducer";
import { motion, AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
    </StateProvider>
  );
}
