import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Page1Question from "./pages/Page1Question";
import Page2Apology from "./pages/Page2Apology";
import Page3TicTacToe from "./pages/Page3TicTacToe";
import Page4MemoryMatch from "./pages/Page4MemoryMatch";
import Page5LoveClicker from "./pages/Page5LoveClicker";
import Page6Quiz from "./pages/Page6Quiz";
import Page7WordScramble from "./pages/Page7WordScramble";

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.99 },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="*"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <Page1Question />
            </motion.div>
          }
        />
        <Route
          path="/page-2"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <Page2Apology />
            </motion.div>
          }
        />
        <Route
          path="/page-3"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <Page3TicTacToe />
            </motion.div>
          }
        />
        <Route
          path="/page-4"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <Page4MemoryMatch />
            </motion.div>
          }
        />
        <Route
          path="/page-5"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <Page5LoveClicker />
            </motion.div>
          }
        />
        <Route
          path="/page-6"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <Page6Quiz />
            </motion.div>
          }
        />
        <Route
          path="/page-7"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <Page7WordScramble />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden romantic-bg text-rose-900">
      <AnimatedRoutes />
    </div>
  );
}
