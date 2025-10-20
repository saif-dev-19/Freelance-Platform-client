
import React from 'react';
import { Users, Target, BookOpen } from 'lucide-react';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jane Smith',
    role: 'Lead Developer',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Peter Jones',
    role: 'Marketing Head',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Platform</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We are dedicated to connecting talented freelancers with clients who need their skills. Our mission is to create a seamless and trustworthy marketplace for everyone.
        </p>
      </div>

      {/* Our Mission & Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Our Mission */}
        <div className="bg-base-100 p-8 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <Target className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Our primary mission is to empower professionals by providing them with the tools and opportunities to grow their careers. We strive to build a community based on collaboration, quality, and mutual respect.
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-base-100 p-8 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-semibold">Our Story</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Founded in 2024, our platform was born from a simple idea: to make professional services accessible to everyone, everywhere. We started as a small team with a big vision, and have since grown into a thriving marketplace.
          </p>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Meet the Team</h2>
        <p className="text-muted-foreground mb-8">The passionate people behind our success.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-base-100 p-6 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-base-300"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;