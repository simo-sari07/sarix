import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, FileText, Folder, Mail, Server, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../Loader/Loader";
import PageTransition from "../Transition/PageTransition";
import SpaceDevCursor from "../CosmicDevCursor/CosmicDevCursor";

const Layout = () => {
  const [activePage, setActivePage] = useState("/");
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    setActivePage(location.pathname);
    setIsMobileMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/Resume", label: "Resume", icon: FileText },
    { path: "/projects", label: "Projects", icon: Folder },
    // { path: "/Services", label: "Services", icon: Server },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <PageTransition>
      <SpaceDevCursor />

      <div className="min-h-screen bg-gradient-to-b from-black to-violet-800 flex flex-col">
        <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>

        {/* Top Navbar - Desktop */}
        <motion.nav
          className="fixed top-0 w-full z-40 hidden md:block "
          initial={{ y: 0 }}
          animate={{ y: visible ? 0 : -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-center relative">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-violet-600/10 blur-3xl opacity-50" />

              {/* Main navigation container */}
              <div className="relative flex space-x-8 px-8 py-3 rounded-2xl">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative px-4 py-2 group"
                    onMouseEnter={() => {
                      setActivePage(link.path);
                      setHoveredPath(link.path);
                    }}
                    onMouseLeave={() => {
                      setActivePage(location.pathname);
                      setHoveredPath(null);
                    }}
                  >
                    {/* Hover effect background */}
                    <motion.div
                      className="absolute inset-0 bg-violet-600/20 rounded-lg -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredPath === link.path ? 1 : 0,
                        scale: hoveredPath === link.path ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Link text */}
                    <span
                      className={`text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                          ? "text-violet-300"
                          : "text-gray-300 hover:text-violet-200"
                        }`}
                    >
                      {link.label}
                    </span>

                    {/* Active indicator */}
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400"
                      animate={{
                        opacity: activePage === link.path ? 1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />

                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-lg ring-2 ring-violet-400/20"
                      animate={{
                        opacity: hoveredPath === link.path ? 1 : 0,
                        scale: hoveredPath === link.path ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Hamburger Menu Button */}
        <motion.div
          className="fixed top-4 right-4 z-50 md:hidden mobile-menu-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={toggleMobileMenu}
            className="p-3 backdrop-blur-xl bg-gradient-to-r from-gray-900/90 via-violet-950/90 to-gray-900/90 rounded-xl border border-violet-500/20 shadow-2xl shadow-violet-500/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-violet-300" />
              ) : (
                <Menu size={24} className="text-violet-300" />
              )}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Mobile Menu */}
              <motion.div
                className="fixed top-20 right-4 z-50 md:hidden mobile-menu-container"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="backdrop-blur-xl bg-gradient-to-b from-gray-900/95 via-violet-950/95 to-gray-900/95 rounded-2xl border border-violet-500/20 shadow-2xl shadow-violet-500/20 p-4 min-w-[200px]">
                  {/* Glowing background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-fuchsia-600/5 to-violet-600/5 blur-xl opacity-50 rounded-2xl" />

                  <div className="relative space-y-2">
                    {navLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.1 }}
                        >
                          <Link
                            to={link.path}
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-violet-600/20 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon
                              size={20}
                              className={`transition-colors duration-200 ${location.pathname === link.path
                                  ? "text-violet-400"
                                  : "text-gray-300 group-hover:text-violet-300"
                                }`}
                            />
                            <span
                              className={`font-medium transition-colors duration-200 ${location.pathname === link.path
                                  ? "text-violet-300"
                                  : "text-gray-300 group-hover:text-violet-200"
                                }`}
                            >
                              {link.label}
                            </span>

                            {/* Active indicator */}
                            {location.pathname === link.path && (
                              <motion.div
                                className="ml-auto w-2 h-2 bg-violet-400 rounded-full"
                                layoutId="mobile-active-indicator"
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 30,
                                }}
                              />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        {/* Footer */}
        <footer
          className="bg-gradient-to-r from-[#0a0f24] via-[#0d1638] to-[#0a0f24] text-white text-center py-4 w-full md:relative"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #1c2b54, #0a0f24)",
          }}
        >
          <p className="text-sm font-light px-4" style={{ fontWeight: "600" }}>
            &copy; {new Date().getFullYear()} -- Mohamed Sari -- Built with ❤️
            and React - tailwind - three js .
          </p>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Layout;
