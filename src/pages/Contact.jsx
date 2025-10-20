import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Reach out to us through any of the methods below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div className="bg-base-100 p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-neutral" />
              </div>
              <div>
                <h3 className="font-semibold">Our Address</h3>
                <p className="text-muted-foreground">Mirpur, Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-neutral" />
              </div>
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-muted-foreground">support@virtualbazar.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-neutral" />
              </div>
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-muted-foreground">+880 1518962201</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-base-100 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
              <input type="text" id="name" name="name" required className="input input-bordered w-full" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
              <input type="email" id="email" name="email" required className="input input-bordered w-full" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <input type="text" id="subject" name="subject" required className="input input-bordered w-full" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
              <textarea id="message" name="message" rows="5" required className="textarea textarea-bordered w-full"></textarea>
            </div>
            <div>
              <button type="submit" className="btn btn-neutral btn-block">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;