import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Partners from "../components/Partners";
import ResearchAreas from "../components/ResearchAreas";
import Contact from "../components/Contact";
import Process from "../components/Process";
import Publications from "../components/Publications";
// import Solutions from "../components/Solutions";
import Projects from "../components/Projects";
import Events from "../components/Events";
import Team from "../components/Team";
import Collaborators from "../components/Collaborators";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import TechStack from "../components/TechStack";
import Reveal from "../components/Reveal"; // <-- Import the Reveal component

export default function Home() {
  const { hash } = useLocation();

  // Scroll to the specific section when navigating back with a hash
  useEffect(() => {
    if (hash) {
      // Small delay ensures the components have rendered fully
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-vapor"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        {/* Hero shows instantly on load, so we don't wrap it */}
        <Hero />

        {/* Wrap the rest in the Reveal component */}
        <Reveal>
          <Features />
        </Reveal>

        <Reveal>
          <About />
        </Reveal>

        <Reveal>
          <Partners />
        </Reveal>

        <Reveal>
          <ResearchAreas />
        </Reveal>

        <Reveal>
          <Contact />
        </Reveal>

        <Reveal>
          <Process />
        </Reveal>

        <Reveal>
          <Publications />
        </Reveal>

        {/* <Reveal>
          <Solutions />
        </Reveal> */}

        <Reveal>
          <Projects />
        </Reveal>

        <Reveal>
          <Events />
        </Reveal>

        <Reveal>
          <Team />
        </Reveal>

        <Reveal>
          <Collaborators />
        </Reveal>

        <Reveal>
          <TechStack />
        </Reveal>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
