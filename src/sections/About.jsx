import React from 'react';
import { Card, CardHeader, CardBody } from '../components/Card';
import { Code2, Smartphone, Cpu } from 'lucide-react';

const skills = [
  {
    title: 'WEB DEVELOPMENT',
    icon: <Code2 className="w-6 h-6 text-primary" />,
    description: 'Building performant, scalable web architectures with a focus on immersive UX and technical precision.',
    tags: ['React', 'Node.js', 'TypeScript', 'Tailwind']
  },
  {
    title: 'APP DEVELOPMENT',
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    description: 'Crafting native-grade mobile experiences that leverage the full potential of device hardware.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android']
  },
  {
    title: 'AI ENGINEERING',
    icon: <Cpu className="w-6 h-6 text-primary" />,
    description: 'Integrating neural networks and LLMs into production workflows to automate and elevate human capabilities.',
    tags: ['Python', 'TensorFlow', 'LLMs', 'LangChain']
  }
];

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-[1280px] mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-inter font-semibold leading-[1.2] tracking-[-0.01em] text-on-surface mb-4">
          SYSTEM.CAPABILITIES
        </h2>
        <div className="w-16 h-1 bg-primary glow-primary"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <Card key={index} className="group hover:border-primary transition-colors duration-300">
            <CardHeader className="flex items-center gap-4">
              <div className="p-2 bg-surface-container-highest border border-[#21262D]">
                {skill.icon}
              </div>
              <h3 className="font-space-grotesk text-sm font-semibold tracking-widest text-on-surface uppercase">
                {skill.title}
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-on-surface-variant text-base mb-6 font-inter leading-relaxed">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 border border-[#21262D] text-xs font-space-grotesk text-on-surface-variant uppercase tracking-widest bg-surface-container">
                    {tag}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};
