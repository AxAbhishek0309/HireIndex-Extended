import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  Zap, 
  Award, 
  Briefcase,
  Mail,
  MessageCircle,
  ChevronRight,
  Linkedin,
  Github,
  Twitter
} from 'lucide-react';

// Team member interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

const About: React.FC = () => {
  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: 2,
      name: "Abhishek Tiwari",
      role: "AI/MLOPS/WEBD",
      bio: "AI specialist focused on natural language processing and resume parsing technologies.",
      imageUrl: "/assets/abhishek.png",
      linkedin: "https://www.linkedin.com/in/abhishek-tiwari-03ax/",
      github: "https://github.com/AxAbhishek0309",
      twitter: "https://x.com/axabhishek_0309"
    },
    {
      id: 1,
      name: "Adit Katiyar",
      role: "ML/WEBD",
      bio: "Former technical recruiter with 10+ years of experience helping candidates optimize their job applications.",
      imageUrl: "/assets/adit.jpg",
      linkedin: "https://www.linkedin.com/in/adit-katiyar-0863692b9/",
      github: "https://github.com/Adi101-coder",
      twitter: "https://x.com/adit_katiyar"
    },
    {
      id: 3,
      name: "Sneha Dhanuka",
      role: "UI/UX & Frontend",
      bio: "Creative designer and frontend developer passionate about building intuitive user experiences making complex tools simple.",
      imageUrl: "/assets/sneha.png",
      linkedin: "https://www.linkedin.com/in/sneha-dhanuka/",
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About HireIndex
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-10 text-blue-100">
            We're on a mission to help job seekers create resumes that stand out, get past ATS systems, and land more interviews.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/resume-analyzer">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-medium text-lg px-6 py-3">
                Try Our Tools
              </Button>
            </Link>
            <a href="#contact">
              <Button variant="outline" className="border-white text-white hover:bg-blue-700 font-medium text-lg px-6 py-3">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Our Story</h2>
              <div className="space-y-4">
                <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
                  HireIndex was founded in 2025 with a clear vision: to level the playing field for job seekers competing in an increasingly automated recruitment landscape.
                </p>
                <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
                  After witnessing countless qualified candidates being rejected by Applicant Tracking Systems (ATS) simply because their resumes weren't properly optimized, our founders Adit Katiyar and Abhishek Tiwari decided to create a solution.
                </p>
                <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
                  What started as a simple resume review service has evolved into a comprehensive AI-powered platform that has helped over 100,000 job seekers land interviews and secure their dream jobs.
                </p>
                <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
                  Today, we continue to innovate with cutting-edge AI technology while maintaining our personalized approach to career development guidance.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 top-0 left-0 w-full h-full bg-blue-100 rounded-lg transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Team working" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do as we help job seekers navigate the complex world of modern recruitment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Accessibility</h3>
              <p className="text-gray-600">
                We believe career advancement tools should be accessible to everyone. That's why we offer free resources alongside our premium services.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Innovation</h3>
              <p className="text-gray-600">
                We constantly evolve our technology to stay ahead of changing recruitment practices and provide cutting-edge tools to our users.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Empowerment</h3>
              <p className="text-gray-600">
                We don't just provide tools—we educate and empower users to take control of their job search and career development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Our diverse team of recruitment experts, AI specialists, and career coaches work together to provide you with the best resume tools and resources.
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center max-w-xs w-full">
                <img src={member.imageUrl} alt={member.name} className="w-56 h-56 object-cover rounded-full mb-4 shadow-lg" />
                <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-2">{member.role}</div>
                <p className="text-gray-600 text-center mb-4 min-h-[56px] flex items-center justify-center">{member.bio}</p>
                <div className="flex justify-center gap-6 mb-2">
                  <a href={member.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition">
                    <Linkedin size={22} />
                  </a>
                  <a href={member.github || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition">
                    <Github size={22} />
                  </a>
                  <a href={member.twitter || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition">
                    <Twitter size={22} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're proud of the difference we've made in the careers of job seekers around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">100K+</div>
              <div className="text-gray-700 font-medium">Resumes Analyzed</div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-700 font-medium">Success Rate</div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">75+</div>
              <div className="text-gray-700 font-medium">Industries Covered</div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">4.8/5</div>
              <div className="text-gray-700 font-medium">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Success Stories</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Read about how HireIndex has helped job seekers transform their careers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
              <div className="absolute -top-4 left-6 bg-yellow-400 p-2 rounded-full">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="mt-4">
                <p className="text-gray-600 mb-4 italic">
                  "After 6 months of silence from employers, I used HireIndex to optimize my resume. Within two weeks I had three interviews and landed my dream job in tech!"
                </p>
                <div className="font-medium">Rajesh Sharma, Software Developer</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
              <div className="absolute -top-4 left-6 bg-yellow-400 p-2 rounded-full">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="mt-4">
                <p className="text-gray-600 mb-4 italic">
                  "The ATS analyzer showed me exactly where my resume was falling short. I implemented the suggestions and my callback rate increased dramatically!"
                </p>
                <div className="font-medium">Priya Malhotra, Marketing Manager</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
              <div className="absolute -top-4 left-6 bg-yellow-400 p-2 rounded-full">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="mt-4">
                <p className="text-gray-600 mb-4 italic">
                  "As a career changer, I struggled to present my transferable skills effectively. HireIndex helped me highlight my relevant experience and I transitioned successfully."
                </p>
                <div className="font-medium">Vikram Mehta, Financial Analyst</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-black">Get In Touch</h2>
                <p className="text-gray-600 mb-6">
                  Have questions or feedback? We'd love to hear from you.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">support@resumecraft.com</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Live chat available 9am-5pm EST</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-semibold mb-3 text-black">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-600 text-white p-8">
                <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-md bg-blue-500 border-blue-400 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md bg-blue-500 border-blue-400 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-blue-100 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-md bg-blue-500 border-blue-400 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                    Send Message <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-8 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Ready to transform your resume?</h2>
                <p className="text-blue-100">
                  Our AI-powered tools will help you stand out from the competition and land more interviews.
                </p>
              </div>
              <div>
                <Link href="/resume-analyzer">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6">
                    Get Started <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;