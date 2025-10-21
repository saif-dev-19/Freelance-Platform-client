
import React from 'react';
import { Users, Target, BookOpen } from 'lucide-react';


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
      <div className="max-w-5xl mx-auto text-center">
  <h2 className="text-3xl font-bold mb-2">About Me</h2>
  <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
    I’m a passionate <span className="font-semibold text-neutral">Full Stack Developer </span>
    with a strong focus on creating efficient, modern, and user-friendly web applications. 
    I love turning ideas into reality through clean code and thoughtful design.
  </p>

  <div className="bg-base-100 p-8 rounded-2xl shadow-lg text-left space-y-6">
    {/* Personal Info */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><strong>Name:</strong> Mahfuzur Rahman Saif</li>
              <li><strong>Email:</strong> mahfujurrahmansaif@gmail.com</li>
              <li><strong>Location:</strong> Dhaka, Bangladesh</li>
              <li><strong>Role:</strong> Full Stack Developer</li>
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "C",
                'C++',
                "Dart",
                "React.js",  
                "Tailwind CSS", 
                "JavaScript (ES6)", 
                "Python", 
                "Django REST Framework",
                "Flutter",
                "PostgreSQL", 
                "Git & GitHub"
              ].map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-neutral badge-outline px-3 py-2 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Experience & Goals</h3>
            <p className="text-muted-foreground leading-relaxed">
              I have hands-on experience in building full-stack web applications, developing RESTful APIs, 
              and working with both frontend and backend technologies. 
              My goal is to grow as a developer, work on impactful projects, 
              and contribute to innovative tech solutions that make a difference.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;