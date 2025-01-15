import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Code,
  Server,
  Database,
  Layers,
  Settings,
} from "lucide-react";
import FurniShop from "../../../public/1.png";
import TaskFlow from "../../../public/2.webp";
import HealthTrack from "../../../public/3.png";
import PageTransition from "../Transition/PageTransition";

const techIcons = {
  React: <Code />,
  "Node.js": <Server />,
  "Three.js": <Settings />,
  "Vue.js": <Code />,
  Firebase: <Database />,
  Tailwind: <Layers />,
  "Next.js": <Code />,
  Python: <Server />,
  TensorFlow: <Database />,
};

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      id: "01",
      title: "FurniShop",
      description:
        "E-commerce platform for modern furniture with advanced filtering and 3D previews",
      tech: ["React", "Node.js", "Three.js"],
      image: FurniShop,
      stats: [
        { value: "7", label: "Experience" },
        { value: "2", label: "Team size" },
        { value: "10k+", label: "Sales" },
        { value: "260+", label: "Products" },
      ],
      links: {
        github: "https://github.com/username/furnishop",
        live: "https://furnishop.demo",
      },
    },
    {
      id: "02",
      title: "TaskFlow",
      description:
        "Project management tool with real-time collaboration features",
      tech: ["Vue.js", "Firebase", "Tailwind"],
      image: TaskFlow,
      stats: [
        { value: "5", label: "Months" },
        { value: "3", label: "Team size" },
        { value: "5k+", label: "Users" },
        { value: "100+", label: "Features" },
      ],
      links: {
        github: "https://github.com/username/taskflow",
        live: "https://taskflow.demo",
      },
    },
    {
      id: "03",
      title: "HealthTrack",
      description: "Healthcare management system with AI-powered diagnostics",
      tech: ["Next.js", "Python", "TensorFlow"],
      image: HealthTrack,
      stats: [
        { value: "12", label: "Months" },
        { value: "4", label: "Team size" },
        { value: "15k+", label: "Users" },
        { value: "50+", label: "Hospitals" },
      ],
      links: {
        github: "https://github.com/username/healthtrack",
        live: "https://healthtrack.demo",
      },
    },
  ];

  const paginate = (newDirection) => {
    setCurrentProject(
      (prev) => (prev + newDirection + projects.length) % projects.length
    );
  };

  return (
    <PageTransition>
    <div className="min-h-screen bg-gradient-to-b from-black to-violet-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="text-8xl font-mono font-bold text-gray-800 opacity-20">
            {projects[currentProject].id}
          </div>
          <h2 className="text-4xl font-mono font-bold text-white -mt-16">
            Frontend Project
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl">
            Bringing ideas to life through clean code and creative design. Each
            project represents a unique challenge solved with modern
            technologies.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-xl bg-gray-800/50 border border-gray-700 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center p-6">
              <div className="relative rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={projects[currentProject].image}
                  alt={projects[currentProject].title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  {projects[currentProject].title}
                </h3>

                <p className="text-gray-400">
                  {projects[currentProject].description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {projects[currentProject].tech.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-violet-600 to-fuchsia-600/10 text-white rounded-full text-sm"
                    >
                      {techIcons[tech]} {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {projects[currentProject].stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={projects[currentProject].links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <Github size={20} />
                    Code
                  </a>
                  <a
                    href={projects[currentProject].links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 text-white hover:bg-gradient-to-r from-violet-600 to-fuchsia-600/50 transition-colors"
            onClick={() => paginate(-1)}
          >
            <ArrowLeft size={24} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 text-white hover:bg-gradient-to-r from-violet-600 to-fuchsia-600/50 transition-colors"
            onClick={() => paginate(1)}
          >
            <ArrowRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentProject
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Projects;
