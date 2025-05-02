import React, { useState } from 'react';
import { Code, Database, Layout, Server, Globe } from 'lucide-react';

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const services = [
    {
      id: 1,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with modern web technologies.",
      icon: <Layout size={28} />,
      technologies: ["HTML", "CSS", "JavaScript"],
      accentColor: "from-orange-400 to-pink-500",
      hoverColor: "group-hover:text-pink-400"
    },
    {
      id: 2,
      title: "Frontend Frameworks",
      description: "Building dynamic web applications with modern JavaScript frameworks.",
      icon: <Code size={28} />,
      technologies: ["React.js", "Next.js"],
      accentColor: "from-blue-400 to-indigo-500",
      hoverColor: "group-hover:text-indigo-400"
    },
    {
      id: 3,
      title: "Backend Development",
      description: "Creating robust server-side applications and APIs to power your web solutions.",
      icon: <Server size={28} />,
      technologies: ["PHP", "Node.js"],
      accentColor: "from-purple-400 to-purple-600",
      hoverColor: "group-hover:text-purple-400"
    },
    {
      id: 4,
      title: "Backend Frameworks",
      description: "Accelerating development with powerful backend frameworks for scalable applications.",
      icon: <Server size={28} />,
      technologies: ["Laravel", "Express.js"],
      accentColor: "from-red-400 to-pink-600",
      hoverColor: "group-hover:text-red-400"
    },
    {
      id: 5,
      title: "WordPress Development",
      description: "Creating custom WordPress themes and plugins for content-managed websites.",
      icon: <Globe size={28} />,
      technologies: ["WordPress", "PHP", "Custom Plugins"],
      accentColor: "from-cyan-400 to-blue-500",
      hoverColor: "group-hover:text-cyan-400"
    },
    {
      id: 6,
      title: "Database Management",
      description: "Designing and implementing database solutions for your applications.",
      icon: <Database size={28} />,
      technologies: ["MySQL", "MongoDB"],
      accentColor: "from-green-400 to-emerald-500",
      hoverColor: "group-hover:text-emerald-400"
    }
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-black to-violet-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">My Services</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group relative bg-opacity-60 bg-[#17153C] backdrop-blur-md rounded-2xl p-8 border border-white/10 
                transition-all duration-500 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Accent Corner */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${service.accentColor} opacity-80
                transition-transform duration-500 ${hoveredCard === service.id ? 'scale-110' : ''}`}></div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`flex items-center gap-3 mb-6 transition-colors duration-300 ${service.hoverColor}`}>
                  <div className="text-white text-3xl">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-6">{service.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className={`px-3 py-1 bg-white/10 rounded-full text-sm text-white
                        transition-all duration-300 ${hoveredCard === service.id ? 'bg-white/20' : ''}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
