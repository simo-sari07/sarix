import React, { useState, useEffect } from "react";
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
  Globe,
  Award,
  Users
} from "lucide-react";

const techIcons = {
  React: <Code className="text-cyan-400" />,
  "Node.js": <Server className="text-green-400" />,
  "Three.js": <Settings className="text-purple-400" />,
  "Vue.js": <Code className="text-emerald-400" />,
  Firebase: <Database className="text-amber-400" />,
  Tailwind: <Layers className="text-sky-400" />,
  "Next.js": <Code className="text-white" />,
  Python: <Server className="text-yellow-400" />,
  TensorFlow: <Database className="text-orange-400" />,
};

const projects = [
  {
    id: "01",
    title: "FurniShop",
    subtitle: "E-commerce Revolution",
    description:
      "E-commerce platform for modern furniture with advanced filtering and 3D previews. Experience furniture shopping like never before with our immersive 3D visualization technology.",
    tech: ["React", "Node.js", "Three.js"],
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    stats: [
      { icon: <Globe />, value: "7", label: "Experience" },
      { icon: <Users />, value: "2", label: "Team size" },
      { icon: <Award />, value: "10k+", label: "Sales" },
      { icon: <Database />, value: "260+", label: "Products" },
    ],
    links: {
      github: "https://github.com/username/furnishop",
      live: "https://furnishop.demo",
    },
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "02",
    title: "TaskFlow",
    subtitle: "Seamless Collaboration",
    description:
      "Project management tool with real-time collaboration features. Streamline your workflow with intuitive task management and team coordination capabilities.",
    tech: ["Vue.js", "Firebase", "Tailwind"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    stats: [
      { icon: <Globe />, value: "5", label: "Months" },
      { icon: <Users />, value: "3", label: "Team size" },
      { icon: <Award />, value: "5k+", label: "Users" },
      { icon: <Database />, value: "100+", label: "Features" },
    ],
    links: {
      github: "https://github.com/username/taskflow",
      live: "https://taskflow.demo",
    },
    color: "from-emerald-600 to-teal-600",
  },
  {
    id: "03",
    title: "HealthTrack",
    subtitle: "AI-Powered Healthcare",
    description:
      "Healthcare management system with AI-powered diagnostics. Revolutionizing patient care through advanced machine learning algorithms and intuitive interfaces.",
    tech: ["Next.js", "Python", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    stats: [
      { icon: <Globe />, value: "12", label: "Months" },
      { icon: <Users />, value: "4", label: "Team size" },
      { icon: <Award />, value: "15k+", label: "Users" },
      { icon: <Database />, value: "50+", label: "Hospitals" },
    ],
    links: {
      github: "https://github.com/username/healthtrack",
      live: "https://healthtrack.demo",
    },
    color: "from-purple-600 to-pink-600",
  },
];

function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const paginate = (newDirection) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentProject(
      (prev) => (prev + newDirection + projects.length) % projects.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const project = projects[currentProject];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-violet-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <div className="relative">
              <div className="text-9xl font-mono font-bold text-gray-800 opacity-10">
                {project.id}
              </div>
              <h2 className="absolute bottom-0 text-5xl font-mono font-bold text-white">
                Featured
                <span className={`bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                  {" "}Projects
                </span>
              </h2>
            </div>
          </div>
          <div className="lg:pt-16">
            <p className="text-gray-400 text-lg">
              Crafting digital experiences through innovative solutions and cutting-edge technology. 
              Each project represents a unique challenge tackled with precision and creativity.
            </p>
          </div>
        </div>

        {/* Main Project Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Project Image */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Navigation Controls */}
            <div className="absolute -bottom-6 right-6 flex gap-4">
              <button
                onClick={() => paginate(-1)}
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
                disabled={isAnimating}
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
                disabled={isAnimating}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-4xl font-bold text-white mb-2">{project.title}</h3>
              <p className={`text-lg bg-gradient-to-r ${project.color} bg-clip-text text-transparent font-medium`}>
                {project.subtitle}
              </p>
            </div>

            <p className="text-gray-400 leading-relaxed">{project.description}</p>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h4 className="text-white font-medium">Technologies Used</h4>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors`}
                  >
                    {techIcons[tech]} {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <Github size={20} />
                View Code
              </a>
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${project.color} hover:opacity-90 text-white rounded-lg transition-opacity`}
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
            </div>
          </div>
        </div>

        {/* Project Navigation Dots */}
        <div className="flex justify-center gap-3">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentProject
                  ? `bg-gradient-to-r ${projects[index].color} scale-125`
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;