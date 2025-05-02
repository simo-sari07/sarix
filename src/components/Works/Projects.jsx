"use client"

import { useState, useEffect, useRef } from "react"
import { X, Github, ExternalLink, ArrowRight } from 'lucide-react'
import { useMediaQuery } from "./use-mobile"

// Import real programming language icons
import {
  SiReact,
  SiNodedotjs,
  SiThreedotjs,
  SiVuedotjs,
  SiFirebase,
  SiTailwindcss,
  SiNextdotjs,
  SiPython,
  SiTensorflow,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiWordpress,
  SiPhp,
} from "react-icons/si"

// Tech icons mapping with real icons
const techIcons = {
  React: <SiReact className="text-[#61DAFB]" />,
  "Node.js": <SiNodedotjs className="text-[#339933]" />,
  "Three.js": <SiThreedotjs className="text-[#000000] bg-white rounded-sm" />,
  "Vue.js": <SiVuedotjs className="text-[#4FC08D]" />,
  Firebase: <SiFirebase className="text-[#FFCA28]" />,
  Tailwind: <SiTailwindcss className="text-[#06B6D4]" />,
  "Next.js": <SiNextdotjs className="text-white" />,
  Python: <SiPython className="text-[#3776AB]" />,
  TensorFlow: <SiTensorflow className="text-[#FF6F00]" />,
  HTML: <SiHtml5 className="text-[#E34F26]" />,
  CSS: <SiCss3 className="text-[#1572B6]" />,
  JavaScript: <SiJavascript className="text-[#F7DF1E]" />,
  "scrollReveal.js": <SiJavascript className="text-[#F7DF1E]" />,
  "Express.js": <SiExpress className="text-white" />,
  MongoDB: <SiMongodb className="text-[#47A248]" />,
  WordPress: <SiWordpress className="text-[#21759B]" />,
  PHP: <SiPhp className="text-[#777BB4]" />,
}

// Project data
const projects = [
  {
    id: "01",
    title: "E-commerce Revolution",
    description:
      "Créer une plateforme e-commerce sur mesure pour la vente d'huiles essentielles nécessite une approche structurée qui répond aux besoins spécifiques de votre client tout en offrant une expérience utilisateur fluide et engageante.",
    tech: ["HTML", "CSS", "JavaScript", "scrollReveal.js"],
    image: "/websites/site1.png",
    links: {
      github: "https://github.com/username/furnishop",
      live: "https://bio-et-bien-etre.vercel.app/index.html",
    },
    category: "Web Development",
  },
  {
    id: "02",
    title: "MERN STACK | E-commerce Platform",
    description:
      "Créer une plateforme e-commerce sur mesure pour la vente d'huiles essentielles avec une architecture MERN stack pour une performance optimale et une expérience utilisateur exceptionnelle.",
    tech: ["React", "MongoDB", "Tailwind", "Express.js", "Node.js"],
    image: "/websites/site3.png",
    links: {
      github: "https://github.com/username/taskflow",
      live: "#",
    },
    category: "Full Stack",
  },
  {
    id: "03",
    title: "MERN STACK| Centre Kech",
    description:
      "Soutien et Accompagnement scolaire à Marrakech - Une plateforme éducative complète offrant des ressources pédagogiques et un suivi personnalisé pour les étudiants.",
    tech: ["React", "MongoDB", "Tailwind", "Express.js", "Node.js"],
    image: "/websites/site2.png",
    links: {
      github: "https://github.com/username/healthtrack",
      live: "https://centerkech.vercel.app/",
    },
    category: "Full Stack",
  },
  {
    id: "04",
    title: "Brandbuzz Agency ",
    description:
      "Site vitrine moderne pour une agence digitale mettant en valeur les services et réalisations avec une interface interactive et des animations fluides.",
    tech: ["React", "Tailwind", "Three.js"],
    image: "/websites/site4.png",
    links: {
      github: "https://github.com/username/agency",
      live: "https://brandbuzz-eta.vercel.app/",
    },
    category: "Frontend",
  },
  {
    id: "05",
    title: "Aitassou Travel agency in Marrakech",
    description:
      "Aitassou Travel is a leading travel agency in Marrakech, offering tailored tours, desert adventures, and authentic Moroccan experiences. Explore Morocco with us today!",
    tech: ["WordPress", "PHP"],
    image: "/websites/wp1.png",
    links: {
      github: "#",
      live: "https://aitassoutravel.ma/",
    },
    category: "CMS",
  },
  {
    id: "06",
    title: "Journey and Memory Travel Agency",
    description:
      "Journey and Memory is a travel agency in Morocco dedicated to crafting authentic and personalized travel experiences",
    tech: ["WordPress", "PHP"],
    image: "/websites/wp2.png",
    links: {
      github: "#",
      live: "https://journeymemory.ma/",
    },
    category: "CMS",
  },
  {
    id: "07",
    title: "Cabinet de Kinésithérapie à Marrakech",
    description:
      "Notre équipe de kinésithérapeutes qualifiés vous accueille dans un espace dédié à la rééducation, aux massages thérapeutiques et aux soins personnalisés",
    tech: ["WordPress", "PHP"],
    image: "/websites/wp3.png",
    links: {
      github: "#",
      live: "https://cabinetkanzaizarane.com/",
    },
    category: "CMS",
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
              src={project.image || "/placeholder.svg?height=400&width=600"}
              alt={project.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="mt-auto flex justify-between p-4 bg-black/80 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
            <div className="flex gap-3">
              {project.links.github !== "#" && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={20} className="text-white" />
                </a>
              )}
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
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

  // Desktop view - enhanced modal
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay transition-all duration-300">
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-gray-900 to-black rounded-xl max-w-4xl w-full overflow-hidden border border-gray-800/50 shadow-2xl transition-opacity duration-300"
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
              <div className="relative h-[250px] md:h-full">
                <img
                  src={project.image || "/placeholder.svg?height=400&width=600"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md text-xs text-white">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-6">
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-5">{project.description}</p>

              <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-gray-300 text-xs"
                    >
                      {techIcons[tech]}
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {project.links.github !== "#" && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-all border border-white/10 hover:border-white/20 group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </a>
                )}
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-lg text-white text-sm transition-all group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
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

  // Apply animation classes on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const projectCards = document.querySelectorAll(".project-card")
      projectCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("animate-in")
        }, index * 100)
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8" ref={projectsRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-xs font-medium text-white mb-3">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my creative work across web development, design, and digital experiences.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="project-card group cursor-pointer opacity-0 translate-y-8 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/30 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full">
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md text-xs text-white">
                    {project.category}
                  </span>
                </div>

                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg?height=400&width=600"}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80" />
                </div>

                {/* Content Container */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-5 line-clamp-2">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 px-2 py-1 bg-black/30 rounded-md text-gray-300 text-xs"
                      >
                        {techIcons[tech]}
                        <span className="hidden sm:inline">{tech}</span>
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-black/30 rounded-md text-gray-300 text-xs">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <button className="w-full py-2.5 bg-gradient-to-r from-purple-600/20 to-blue-500/20 hover:from-purple-600/30 hover:to-blue-500/30 rounded-lg text-white text-sm transition-all flex items-center justify-center gap-2 border border-white/5 group-hover:border-white/10">
                    <span>View Project</span>
                    <ArrowRight
                      size={14}
                      className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
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
