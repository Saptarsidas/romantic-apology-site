import { AnimatePresence, motion } from "framer-motion";
import { Link, Navigate, Routes, Route, useLocation } from "react-router-dom";
import Page1Question from "./pages/Page1Question";
import Page2Apology from "./pages/Page2Apology";
import Page3TicTacToe from "./pages/Page3TicTacToe";
import Page4MemoryMatch from "./pages/Page4MemoryMatch";
import Page5LoveClicker from "./pages/Page5LoveClicker";
import Page6Quiz from "./pages/Page6Quiz";
import Page7WordScramble from "./pages/Page7WordScramble";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import { SiteContentProvider } from "./content/SiteContentContext";
import { AdminAuthProvider, useAdminAuth } from "./auth/AdminAuthContext";

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.99 },
};

function ProtectedAdmin() {
  const { ready, authenticated } = useAdminAuth();

  if (!ready) {
    return <div className="min-h-screen p-10 text-center text-rose-800">Loading secure admin...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return <AdminPage />;
}

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
        <Route
          path="/admin"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <ProtectedAdmin />
            </motion.div>
          }
        />
        <Route
          path="/admin-login"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <AdminLoginPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <SiteContentProvider>
        <div className="min-h-screen overflow-x-hidden romantic-bg text-rose-900">
          <Link
            to="/admin-login"
            className="fixed right-4 top-4 z-20 rounded-full border border-rose-300 bg-white/85 px-4 py-2 text-xs font-bold text-rose-800 backdrop-blur hover:bg-white"
          >
            Edit Content
          </Link>
          <AnimatedRoutes />
        </div>
      </SiteContentProvider>
    </AdminAuthProvider>
  );
}
