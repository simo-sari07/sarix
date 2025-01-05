import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Resume from "./components/resumex/Resume";
import Projects from "./components/Works/Projects";
import Contact from "./components/contact/Contact";
import Hero from "./components/hero/hero";
import WelcomePopup from "./components/hero/WelcomePopup";

const App = () => {
  return (
    <Router>
      <WelcomePopup />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="Resume" element={<Resume />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;