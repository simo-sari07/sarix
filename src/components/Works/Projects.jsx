"use client"

import { useState, useEffect, useRef } from "react"
import { X, Github, ExternalLink, Code, Server, Database, Layers, Settings, ArrowRight } from "lucide-react"
import { useMediaQuery } from "./use-mobile"
import React from "react"
// Import images from your file structure
import site1 from "../../../public/websites/site1.png"
import site2 from "../../../public/websites/site2.png"
import site3 from "../../../public/websites/site3.png"
import site4 from "../../../public/websites/site4.png"
import wp1 from "../../../public/websites/wp1.png"
import wp2 from "../../../public/websites/wp2.png"
import wp3 from "../../../public/websites/wp3.png"

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
  JavaScript: <Code className="text-yellow-500" />,
  "scrollReveal.js": <Code className="text-purple-500" />,
  "Express.js": <Server className="text-gray-500" />,
  MongoDB: <Database className="text-green-500" />,
  WordPress: <Code className="text-blue-400" />,
  PHP: <Code className="text-indigo-400" />,
}

const projects = [
  {
    id: "01",
    title: "E-commerce Revolution",
    description:
      "Créer une plateforme e-commerce sur mesure pour la vente d'huiles essentielles nécessite une approche structurée qui répond aux besoins spécifiques de votre client tout en offrant une expérience utilisateur fluide et engageante.",
    tech: ["HTML", "CSS", "JavaScript", "scrollReveal.js"],
    image: site1,
    links: {
      github: "https://github.com/username/furnishop",
      live: "https://bio-et-bien-etre.vercel.app/index.html",
    },
  },
  {
    id: "02",
    title: "MERN E-commerce Platform",
    description:
      "Créer une plateforme e-commerce sur mesure pour la vente d'huiles essentielles avec une architecture MERN stack pour une performance optimale et une expérience utilisateur exceptionnelle.",
    tech: ["React", "MongoDB", "Tailwind", "Express.js", "Node.js"],
    image: site2,
    links: {
      github: "https://github.com/username/taskflow",
      live: "#",
    },
  },
  {
    id: "03",
    title: "Centre Kech",
    description:
      "Soutien et Accompagnement scolaire à Marrakech - Une plateforme éducative complète offrant des ressources pédagogiques et un suivi personnalisé pour les étudiants.",
    tech: ["React", "Tailwind"],
    image: site3,
    links: {
      github: "https://github.com/username/healthtrack",
      live: "https://centerkech.vercel.app/",
    },
  },
  {
    id: "04",
    title: "Brandbuzz Agency ",
    description:
      "Site vitrine moderne pour une agence digitale mettant en valeur les services et réalisations avec une interface interactive et des animations fluides.",
    tech: ["React", "Tailwind", "Three.js"],
    image: site4,
    links: {
      github: "https://github.com/username/agency",
      live: "https://brandbuzz-eta.vercel.app/",
    },
  },
  {
    id: "05",
    title: "Aitassou Travel agency in Marrakech",
    description:
      "Aitassou Travel is a leading travel agency in Marrakech, offering tailored tours, desert adventures, and authentic Moroccan experiences. Explore Morocco with us today!",
    tech: ["WordPress"],
    image: wp1,
    links: {
      github: "#",
      live: "https://aitassoutravel.ma/",
    },
  },
  {
    id: "06",
    title: " travel agency in Morocco",
    description:
      "Journey and Memory is a travel agency in Morocco dedicated to crafting authentic and personalized travel experiences",
    tech: ["WordPress"],
    image: wp2,
    links: {
      github: "#",
      live: "https://journeymemory.ma/",
    },
  },
  {
    id: "07",
    title: "Cabinet de Kinésithérapie à Marrakech",
    description:
      "Notre équipe de kinésithérapeutes qualifiés vous accueille dans un espace dédié à la rééducation, aux massages thérapeutiques et aux soins personnalisés",
    tech: ["WordPress"],
    image: wp3,
    links: {
      github: "#",
      live: "https://cabinetkanzaizarane.com/",
    },
  },
]

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-overlay")) onClose()
    }

    // Animation on mount
    if (modalRef.current) {
      modalRef.current.style.opacity = 0
      setTimeout(() => {
        if (modalRef.current) modalRef.current.style.opacity = 1
      }, 10)
    }

    document.addEventListener("keydown", handleEsc)
    document.addEventListener("click", handleClickOutside)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "" // Restore scrolling
    }
  }, [onClose])

  if (!project) return null

  // Mobile view - just show the image with close button
  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 modal-overlay transition-all duration-300">
        <div ref={modalRef} className="w-full h-full flex flex-col transition-opacity duration-300">
          <div className="relative flex-1 flex items-center justify-center">
            <button
              onClick={onClose}
              className="absolute right-2 top-2 text-white hover:text-gray-300 z-10 bg-black/40 p-2 rounded-full backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="mt-auto flex justify-between p-4 bg-black/80">
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
            <div className="flex gap-3">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} className="text-white" />
              </a>
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop view - compact modal
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay transition-all duration-300">
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-gray-900 to-black rounded-xl max-w-3xl w-full overflow-hidden border border-gray-800/50 shadow-2xl transition-opacity duration-300"
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-white hover:text-gray-300 z-10 bg-black/40 p-1.5 rounded-full backdrop-blur-sm"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <div className="relative h-[200px] md:h-full">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:w-1/2 p-5">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-md text-gray-300 text-xs"
                  >
                    {techIcons[tech]}
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-all border border-white/5 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-all group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const projectsRef = useRef(null)

  // Animation for project cards on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const projectCards = document.querySelectorAll(".project-card")
    projectCards.forEach((card) => {
      observer.observe(card)
    })

    return () => {
      projectCards.forEach((card) => {
        observer.unobserve(card)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8" ref={projectsRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of my recent work across web development, design, and digital experiences.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="project-card group cursor-pointer opacity-0 translate-y-8 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700 transition-all hover:shadow-lg h-full">
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                </div>

                {/* Content Container */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 px-2 py-1 bg-black/30 rounded-md text-gray-300 text-xs"
                      >
                        {techIcons[tech]}
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-black/30 rounded-md text-gray-300 text-xs">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-md text-white text-sm transition-all flex items-center justify-center gap-2">
                    <span>View Project</span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                  </button>
                </div>
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
