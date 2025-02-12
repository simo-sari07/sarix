"use client"

import { useState, useEffect } from "react"
import { X, Github, ExternalLink, Code, Server, Database, Layers, Settings } from "lucide-react"

import project1 from "../../../public/bio1.png"
import project2 from "../../../public/bio2.png"
import project3 from "../../../public/center.png"

const techIcons = {
  React: <Code className="text-blue-500" />,
  "Node.js": <Server className="text-green-500" />,
  "Three.js": <Settings className="text-purple-500" />,
  "Vue.js": <Code className="text-emerald-500" />,
  Firebase: <Database className="text-orange-500" />,
  Tailwind: <Layers className="text-sky-500" />,
  "Next.js": <Code className="text-white" />,
  Python: <Server className="text-yellow-500" />,
  TensorFlow: <Database className="text-red-500" />,
  HTML: <Code className="text-orange-500" />,
  CSS: <Layers className="text-blue-500" />,
  js: <Code className="text-yellow-500" />,
  "scrollReveal.js": <Code className="text-purple-500" />,
  "Express Js": <Server className="text-gray-500" />,
  MongoDb: <Database className="text-green-500" />,
}

const projects = [
  {
    id: "01",
    title: "E-commerce Revolution",
    badge: "FEATURED 2024",
    description:
      "Créer une plateforme e-commerce sur mesure pour la vente d'huiles essentielles nécessite une approche structurée qui répond aux besoins spécifiques de votre client tout en offrant une expérience utilisateur fluide et engageante.",
    tech: ["HTML", "CSS", "js", "scrollReveal.js"],
    image: project1,
    stats: {
      experience: "5",
      teamSize: "4",
      users: "5k+",
      features: "100+",
    },
    links: {
      github: "https://github.com/username/furnishop",
      live: "https://bio-et-bien-etre.vercel.app/index.html",
    },
  },
  {
    id: "02",
    title: "MERN E-commerce Platform",
    badge: "NEW",
    description: "Créer une plateforme e-commerce sur mesure pour la vente d'huiles essentielles.",
    tech: ["React.js", "MongoDb", "Tailwind", "Express Js", "Node.js"],
    image: project2,
    stats: {
      experience: "5",
      teamSize: "3",
      users: "5k+",
      features: "100+",
    },
    links: {
      github: "https://github.com/username/taskflow",
      live: "https://taskflow.demo",
    },
  },
  {
    id: "03",
    title: "Centre Kech",
    badge: "TRENDING",
    description: "Soutien et Accompagnement scolaire à Marrakech",
    tech: ["React.js", "Tailwind"],
    image: project3,
    stats: {
      experience: "5",
      teamSize: "3",
      users: "5k+",
      features: "100+",
    },
    links: {
      github: "https://github.com/username/healthtrack",
      live: "https://centerkech.vercel.app/",
    },
  },
]

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-overlay")) onClose()
    }

    document.addEventListener("keydown", handleEsc)
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [onClose])

  if (!project) return null

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay">
      <div className="bg-[#111] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button onClick={onClose} className="absolute right-4 top-4 text-white hover:text-gray-300 z-10">
            <X size={24} />
          </button>
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={300}
            className="w-full h-[300px] object-cover"
          />
        </div>
        <div className="p-8">
          <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
          <p className="text-gray-300 mb-6">{project.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {project.tech.map((tech) => (
              <span key={tech} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm text-white">
                {techIcons[tech]}
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
            >
              <Github size={20} />
              View Code
            </a>
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
            >
              <ExternalLink size={20} />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Crafting digital experiences through innovative solutions and cutting-edge technology. Each project
            represents a unique challenge tackled with precision and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} onClick={() => setSelectedProject(project)} className="group cursor-pointer">
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800">
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md z-10">
                  {project.badge}
                </div>

                {/* Content Container */}
                <div className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2 mt-8">{project.title}</h3>
                      <p className="text-gray-400 text-sm">{project.description}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span key={tech} className="flex items-center gap-1 text-gray-300 text-sm">
                          {techIcons[tech]}
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Image with arch design */}
                    <div className="relative w-full h-48 mb-6">
                      <div className="absolute inset-0 overflow-hidden rounded-lg">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="bg-white/5 rounded-lg p-3 text-center">
                          <div className="text-xl font-bold text-white">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* View Details Button */}
                    <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-colors mt-auto">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  )
}

export default Projects

