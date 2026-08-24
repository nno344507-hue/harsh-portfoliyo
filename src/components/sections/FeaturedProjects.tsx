import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { PROJECTS, Project } from '../../data/projectsData';
import { useAudio } from '../../context/AudioContext';

export const FeaturedProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { playHoverSound, playClickSound } = useAudio();

  const handleOpenProject = (project: Project) => {
    playClickSound();
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    playClickSound();
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative py-20 sm:py-28 px-4 sm:px-12 md:px-16 z-10">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Title & Disclaimer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/15 gap-6 p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-2">
              Portfolio // Selected Case Studies
            </span>
            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              Featured Work
            </h3>
          </div>
          <p className="text-sm sm:text-base text-zinc-200 max-w-md drop-shadow-sm font-normal">
            A selection of immersive digital experiences created for ambitious brands and forward thinking teams.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() => handleOpenProject(project)}
              onMouseEnter={playHoverSound}
              data-cursor-text="VIEW"
              className="group relative rounded-3xl overflow-hidden border border-white/15 bg-[#0f0f13]/95 backdrop-blur-2xl hover:border-amber-400/50 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Top Image Preview Container with 3D Zoom */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-110"
                />

                {/* Top Corner Year Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-lg">
                    {project.year}
                  </span>
                </div>

                {/* External Arrow Icon */}
                <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-[#0c0c10]">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-amber-400/90 font-medium mb-2 truncate">
                    {project.category}
                  </p>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors drop-shadow-sm">
                    {project.title}
                  </h4>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-white/10 border border-white/15 text-zinc-200 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[#111115] border border-white/20 rounded-3xl overflow-hidden shadow-2xl my-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseProject}
                className="absolute top-6 right-6 z-20 p-3 rounded-full bg-black/80 border border-white/30 text-white hover:bg-amber-400 hover:text-black transition-all shadow-xl"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Banner */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
                <img
                  src={selectedProject.coverImage}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-black/50" />

                <div className="absolute bottom-6 left-6 sm:left-8">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase bg-amber-400 text-black font-bold mb-2 inline-block shadow-md">
                    {selectedProject.client}
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-8">
                <div>
                  <h5 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-2">
                    Overview
                  </h5>
                  <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Project Stats */}
                {selectedProject.stats && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {selectedProject.stats.map((stat) => (
                      <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/15">
                        <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">{stat.label}</span>
                        <span className="text-xl font-bold text-white">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div>
                  <h5 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-3">
                    Technologies
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/10 border border-white/20 text-white font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">Year: {selectedProject.year}</span>
                  <button
                    onClick={handleCloseProject}
                    className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg"
                  >
                    <span>Close Case Study</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
