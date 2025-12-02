import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Box, FileText, Layers, Mail, Github, Linkedin, 
  ExternalLink, Menu, X, ChevronDown, CheckCircle, Loader2, AlertCircle, 
  Sparkles, MessageSquare, Send, Bot, RefreshCw, XCircle, Download, GraduationCap, File
} from 'lucide-react';

const Portfolio = () => {
  // Theme & Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Image Fallback State
  const [imageError, setImageError] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', text: "Hi! I'm Yaswanth's AI assistant. Ask me anything about his projects, skills, or experience!" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Project Analysis State
  const [analyzingProjectId, setAnalyzingProjectId] = useState(null); 
  const [projectAnalyses, setProjectAnalyses] = useState({});

  // --- CONFIGURATION ---
  // 1. Get your free ID from https://formspree.io/
  // 2. Paste it inside the quotes below, e.g., "https://formspree.io/f/xyza..."
  const FORM_ENDPOINT = ""; 

  // Resume & Personal Data
  const profile = {
    name: "Yaswanth Kumar Ippili",
    role: "Aspiring Product Manager",
    tagline: "Bridging AI, Data, and User Experience to build measurable outcomes.",
    about: "I specialize in building LLM-driven tools, workflow automations, and MVP launches. With a strong technical foundation in AI and agile collaboration, I translate complex problems into scalable product strategies.",
    location: "Bhubaneswar, India",
    email: "yaswanthippili100@gmail.com",
    linkedin: "https://linkedin.com/in/yaswanth-ippili",
    github: "https://github.com/NickyIm04020",
    image: "image_b30e64.jpg", // Make sure this is in your public folder!
    resumeFile: "pm_resume.pdf"
  };

  const education = [
    {
      id: 1,
      school: "International Institute of Information Technology, Bhubaneswar",
      degree: "Bachelor of Technology, Computer Science & Engineering",
      year: "2022 - Present",
      description: "Focusing on Data Science, AI, and Product Design."
    }
  ];

  const skillsData = {
    "Product & Strategy": [
      "Roadmapping", "Prioritization (RICE, Kano)", "Market Research", 
      "A/B Testing", "Agile & Scrum", "Backlog Management", "User Stories"
    ],
    "Analytics & Tools": [
      "SQL (Basic)", "GA4", "Amplitude", "Mixpanel", "n8n", "Figma", 
      "Miro", "Notion", "Jira", "Confluence", "Excel Automation"
    ],
    "Technical Awareness": [
      "Python", "Java", "LangChain", "GPT APIs", "FastAPI", 
      "XGBoost", "Pinecone", "SHAP", "Flask", "Git/GitHub"
    ]
  };

  const projects = [
    {
      id: 1,
      title: "ChatPDF Pro",
      category: "AI & RAG",
      description: "Built an LLM-powered QA system for 300+ documents. Integrated LangChain with Pinecone for semantic search, achieving 89% QA accuracy.",
      metrics: ["<6s Ingestion Time", "89% Accuracy"],
      tags: ["Python", "GPT-4", "FastAPI", "Product Strategy"],
      link: "https://github.com/NickyIm04020" // Link to the specific project
    },
    {
      id: 2,
      title: "DevAssistant AI",
      category: "Developer Tools",
      description: "Created a CLI tool analyzing Java error logs to suggest fixes. Processed 150+ test cases, improving debugging speed significantly.",
      metrics: ["40% Faster Debugging", "+25% Test Coverage"],
      tags: ["Java", "GenAI", "CLI", "User Experience"],
      link: "https://github.com/NickyIm04020"
    },
    {
      id: 3,
      title: "HealthRiskAI",
      category: "Healthcare ML",
      description: "Deployed a predictive disease risk scoring pipeline using NHANES/MIMIC-III data. Applied SHAP for interpretable AI insights.",
      metrics: ["0.92 AUC-ROC", "0.12 Brier Score"],
      tags: ["AWS Lambda", "XGBoost", "Healthcare Data"],
      link: "https://github.com/NickyIm04020"
    }
  ];

  const experience = [
    {
      id: 1,
      role: "Product Designer & PM Lead",
      company: "E-Cell, IIIT Bhubaneswar",
      period: "Dec 2022 - Apr 2024",
      description: "Led a 3-member team to deliver 30+ campaigns, supporting 10+ events and boosting student engagement by 40%. Built reusable design systems improving output turnaround by 35%."
    },
    {
      id: 2,
      role: "Product Management Simulation",
      company: "Electronic Arts (EA) / Forage",
      period: "2024",
      description: "Improved retention forecast by 15% using feature prioritization; drafted Jira and stakeholder reports."
    },
    {
      id: 3,
      role: "Software Engineering Intern",
      company: "Goldman Sachs / Forage",
      period: "2024",
      description: "Completed modules on encryption, secure coding, and software optimization tasks."
    }
  ];

  const articles = [
    {
      id: 1,
      title: "The Future of AI in Product Management",
      platform: "LinkedIn",
      date: "Feb 2025",
      summary: "Exploring how LLMs are changing the landscape of requirement gathering and user research.",
      link: "https://linkedin.com/in/yaswanth-ippili" 
    },
    {
      id: 2,
      title: "Metrics that Matter: Beyond Vanity",
      platform: "LinkedIn",
      date: "Jan 2025",
      summary: "A deep dive into why retention beats acquisition in the early stages of a startup.",
      link: "https://linkedin.com/in/yaswanth-ippili"
    }
  ];

  const teardowns = [
    {
      id: 1,
      title: "GenAI Model Ethics",
      summary: "Insights from Google GenAI Academy on prompt design and ethical model usage.",
      readTime: "Analysis",
      date: "2025"
    },
    {
      id: 2,
      title: "Spotify Social Features",
      summary: "Analyzing how Spotify leverages network effects to increase lock-in.",
      readTime: "Coming Soon",
      date: "Future"
    }
  ];

  const documents = [
    {
      id: 1,
      name: "Product Management Resume",
      type: "PDF",
      file: profile.resumeFile
    }
  ];

  // --- Helpers ---

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const callGemini = async (prompt, systemInstruction = "") => {
    const apiKey = ""; // System provided at runtime
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] }
        })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Error connecting to AI service.";
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsChatLoading(true);

    const contextData = JSON.stringify({ profile, skillsData, projects, experience });
    const systemPrompt = `You are a helpful and professional AI assistant for Yaswanth Kumar Ippili's portfolio website. 
    Your goal is to answer questions about Yaswanth's background, skills, and projects based STRICTLY on the provided data.
    - Speak in the first person plural (e.g., "We," "Yaswanth has," "He is") or as a helpful assistant.
    - Keep answers concise (under 3 sentences) unless asked for details.
    - If the answer is not in the data, say you don't know but suggest contacting him directly.
    - Be enthusiastic about his Product Management skills.
    
    Data: ${contextData}`;

    const response = await callGemini(userMessage, systemPrompt);
    
    setChatHistory(prev => [...prev, { role: 'model', text: response }]);
    setIsChatLoading(false);
  };

  const handleAnalyzeProject = async (project) => {
    if (projectAnalyses[project.id]) return; 
    setAnalyzingProjectId(project.id);
    const prompt = `Analyze this project from a Product Manager's perspective:
    Title: ${project.title}
    Description: ${project.description}
    Metrics: ${project.metrics.join(', ')}
    Tech Stack: ${project.tags.join(', ')}
    
    Please provide a brief, bulleted "PM Insight" covering:
    1. The core user problem solved.
    2. Why the metrics matter (business impact).
    3. A potential future improvement idea.
    Keep it concise and professional. Use formatting like **bold** for key terms.`;

    const analysis = await callGemini(prompt, "You are a Senior Product Manager reviewing a portfolio.");
    setProjectAnalyses(prev => ({ ...prev, [project.id]: analysis }));
    setAnalyzingProjectId(null);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');
    const sanitizedData = {
      name: formData.name.trim().replace(/[<>]/g, ""),
      email: formData.email.trim(),
      message: formData.message.trim().replace(/[<>]/g, "")
    };

    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(sanitizedData)
        });
        if (response.ok) {
          setFormStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          throw new Error("Failed to send message.");
        }
      } else {
        // Simulation Mode
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage("Something went wrong. Please try again later or email directly.");
    }
  };

  // --- Scroll Spy ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'skills', 'experience', 'projects', 'articles', 'teardowns', 'documents', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Theme Classes ---
  const theme = {
    bg: isDarkMode ? 'bg-[#121212]' : 'bg-[#fafafa]',
    text: isDarkMode ? 'text-zinc-100' : 'text-zinc-900',
    textMuted: isDarkMode ? 'text-zinc-400' : 'text-zinc-500',
    border: isDarkMode ? 'border-zinc-800' : 'border-zinc-300',
    navBg: isDarkMode ? 'bg-[#121212]/80' : 'bg-[#fafafa]/80',
    cardBg: isDarkMode ? 'bg-zinc-900' : 'bg-white',
    buttonPrimary: isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800',
    buttonSecondary: isDarkMode ? 'border-zinc-700 text-white hover:bg-zinc-900' : 'border-zinc-300 text-black hover:bg-zinc-50',
    divider: isDarkMode ? 'border-zinc-800' : 'border-zinc-200',
    tagBg: isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700',
    inputBg: isDarkMode ? 'bg-zinc-900' : 'bg-white',
    chatBg: isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200',
    chatUserBubble: isDarkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900',
    chatBotBubble: isDarkMode ? 'bg-blue-600 text-white' : 'bg-black text-white',
  };

  // --- Reusable UI Components ---
  const NavItem = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`text-sm font-medium transition-all duration-300 relative group ${
        activeSection === id ? (isDarkMode ? 'text-white' : 'text-black') : theme.textMuted
      } hover:${theme.text}`}
    >
      {label}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </button>
  );

  const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-16">
      <h2 className={`text-3xl md:text-5xl font-bold mb-4 tracking-tight ${theme.text}`}>
        {title}
      </h2>
      <p className={`text-xl ${theme.textMuted} max-w-2xl font-light`}>{subtitle}</p>
    </div>
  );

  const SpotlightCard = ({ children, className = "", noHover = false }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setOpacity(1);
    };

    const handleMouseLeave = () => { setOpacity(0); };

    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${theme.border} ${theme.cardBg} ${className} ${!noHover ? 'hover:shadow-lg' : ''}`}
      >
        <div
          className="pointer-events-none absolute -inset-px transition duration-300 z-10"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}, transparent 40%)`
          }}
        />
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition duration-300 z-20"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}, transparent 40%)`,
            maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
            maskComposite: 'exclude',
            WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
            WebkitMaskComposite: 'xor'
          }}
        />
        <div className="relative z-30 h-full p-8">{children}</div>
      </div>
    );
  };

  const ThemeSwitch = () => (
    <label className="relative inline-block w-14 h-8 cursor-pointer">
      <input type="checkbox" className="peer sr-only" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
      <div className={`absolute inset-0 rounded-full transition-colors duration-500 ${isDarkMode ? 'bg-slate-800' : 'bg-sky-200'}`}></div>
      <div className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-500 transform ${isDarkMode ? 'translate-x-6 bg-slate-200' : 'translate-x-0 bg-yellow-400'} shadow-sm flex items-center justify-center overflow-hidden`}>
        {isDarkMode ? (<div className="w-2 h-2 rounded-full bg-slate-400 opacity-50 absolute top-1 right-1"></div>) : (<div className="w-full h-full bg-yellow-300 opacity-0"></div>)}
      </div>
    </label>
  );

  return (
    <div className={`min-h-screen font-sans selection:bg-zinc-200 selection:text-black transition-colors duration-500 ${theme.bg}`}>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${theme.navBg} ${theme.border}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className={`text-lg font-bold tracking-tight cursor-pointer ${theme.text}`} onClick={() => scrollToSection('home')}>
            Yaswanth Ippili
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <NavItem id="home" label="Home" />
            <NavItem id="about" label="About" />
            <NavItem id="education" label="Education" />
            <NavItem id="skills" label="Skills" />
            <NavItem id="experience" label="Experience" />
            <NavItem id="projects" label="Projects" />
            <NavItem id="teardowns" label="Teardowns" />
            <NavItem id="documents" label="Docs" />
            <NavItem id="contact" label="Contact" />
            <ThemeSwitch />
          </div>
          <div className="flex items-center gap-4 lg:hidden">
            <ThemeSwitch />
            <button onClick={() => setMobileMenuOpen(true)} className={theme.text}><Menu /></button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-[60] p-8 flex flex-col justify-center ${theme.bg}`}>
           <button onClick={() => setMobileMenuOpen(false)} className={`absolute top-6 right-6 ${theme.text}`}><X size={32} /></button>
           <div className="flex flex-col gap-8 text-3xl font-bold text-center">
              {['home', 'about', 'education', 'skills', 'experience', 'projects', 'teardowns', 'documents', 'contact'].map(item => (
                <button key={item} onClick={() => scrollToSection(item)} className={`capitalize ${theme.text}`}>{item}</button>
              ))}
           </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
          <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <div className="space-y-4">
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase border ${theme.border} ${theme.textMuted}`}>
                  Available for opportunities
                </span>
                <h1 className={`text-6xl lg:text-8xl font-extrabold tracking-tighter ${theme.text} leading-[1.1]`}>
                  {profile.name.split(' ')[0]} <br />
                  <span className={theme.textMuted}>{profile.name.split(' ').slice(1).join(' ')}</span>
                </h1>
              </div>
              <p className={`text-xl md:text-2xl ${theme.textMuted} font-light leading-relaxed max-w-xl mx-auto md:mx-0`}>
                {profile.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start">
                <button onClick={() => scrollToSection('projects')} className={`px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${theme.buttonPrimary}`}>
                  View Work <ArrowRight size={18} />
                </button>
                <button onClick={() => scrollToSection('contact')} className={`px-8 py-4 rounded-xl font-bold border transition-all hover:bg-zinc-50 ${theme.buttonSecondary}`}>
                  Get in Touch
                </button>
              </div>
            </div>
            <div className="w-72 h-72 md:w-[28rem] md:h-[28rem] flex-shrink-0">
               <SpotlightCard className="w-full h-full p-0 overflow-hidden !rounded-[2rem]" noHover>
                  {!imageError ? (
                    <img 
                      src={profile.image} 
                      alt={profile.name} 
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover rounded-[2rem] grayscale contrast-125 transition-all duration-500 hover:grayscale-0 hover:scale-[1.02] absolute inset-0" 
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center text-6xl font-bold ${isDarkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-200 text-zinc-400'}`}>
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
               </SpotlightCard>
            </div>
          </div>
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce ${theme.textMuted}`}><ChevronDown size={32} /></div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 lg:py-32 scroll-mt-20">
          <div className="max-w-4xl">
            <SectionTitle title="About Me" subtitle="The journey from Code to Product." />
            <div className={`space-y-8 text-lg md:text-xl leading-relaxed font-light ${theme.textMuted}`}>
              <p>My background is rooted in Computer Science, where I started by building predictive models like <strong className={theme.text}> HealthRiskAI</strong> to solve complex data problems.</p>
              <p>However, I realized that technical excellence is only half the equation. The other half is ensuring that technology solves a genuine human need. This realization pivoted my career toward <strong className={theme.text}>Product Management</strong>, where I now leverage my technical expertise in AI and LLMs to build products that are not just feasible, but valuable and usable.</p>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className={`py-24 lg:py-32 scroll-mt-20 border-t border-dashed ${theme.divider}`}>
          <SectionTitle title="Education" subtitle="Academic background." />
          <div className="space-y-8">
            {education.map((edu) => (
              <SpotlightCard key={edu.id} className="group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                     <div className="flex items-center gap-3">
                        <GraduationCap size={24} className={theme.text} />
                        <h3 className={`text-2xl font-bold ${theme.text}`}>{edu.school}</h3>
                     </div>
                     <p className={`text-lg font-medium ${theme.textMuted}`}>{edu.degree}</p>
                     <p className={`text-base ${theme.textMuted} italic`}>{edu.description}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-lg border font-mono text-sm ${theme.border} ${theme.textMuted}`}>
                    {edu.year}
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-24 lg:py-32 scroll-mt-20 border-t border-dashed ${theme.divider}`}>
           <SectionTitle title="Skills" subtitle="Tools and Frameworks I use to drive impact." />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {Object.entries(skillsData).map(([category, skills]) => (
               <SpotlightCard key={category} className="h-full">
                 <h3 className={`text-xl font-bold mb-6 ${theme.text}`}>{category}</h3>
                 <ul className="space-y-3">
                   {skills.map(skill => (
                     <li key={skill} className={`flex items-start gap-2 ${theme.textMuted}`}>
                       <CheckCircle size={16} className={`mt-1 flex-shrink-0 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                       <span className="text-base font-medium">{skill}</span>
                     </li>
                   ))}
                 </ul>
               </SpotlightCard>
             ))}
           </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={`py-24 lg:py-32 scroll-mt-20 border-t border-dashed ${theme.divider}`}>
          <SectionTitle title="Experience" subtitle="My professional timeline." />
          <div className="space-y-12">
            {experience.map((job) => (
              <SpotlightCard key={job.id} className="group">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
                  <h3 className={`text-2xl font-bold ${theme.text}`}>{job.role}</h3>
                  <span className={`text-sm font-mono mt-1 sm:mt-0 ${theme.textMuted}`}>{job.period}</span>
                </div>
                <h4 className={`text-lg font-medium mb-4 ${theme.text}`}>{job.company}</h4>
                <p className={`text-lg leading-relaxed max-w-3xl ${theme.textMuted}`}>{job.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-24 lg:py-32 scroll-mt-20 border-t border-dashed ${theme.divider}`}>
          <SectionTitle title="Selected Projects" subtitle="Bridging the gap between engineering and user needs." />
          <div className="grid grid-cols-1 gap-16">
            {projects.map((project) => (
              <SpotlightCard key={project.id} className="group">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <h3 className={`text-3xl font-bold ${theme.text}`}>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-blue-500 underline-offset-4 flex items-center gap-2">
                           {project.title}
                           <ExternalLink size={20} className="text-zinc-400" />
                        </a>
                      </h3>
                      <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${theme.border} ${theme.textMuted}`}>{project.category}</span>
                    </div>
                    <p className={`text-lg leading-relaxed ${theme.textMuted}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      {project.tags.map(tag => (
                        <span key={tag} className={`px-3 py-1 rounded-md text-sm ${theme.tagBg}`}>{tag}</span>
                      ))}
                    </div>
                    
                    {/* Gemini PM Analysis */}
                    <div className="mt-6">
                      {!projectAnalyses[project.id] ? (
                        <button 
                          onClick={() => handleAnalyzeProject(project)}
                          disabled={analyzingProjectId === project.id}
                          className={`flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all transform hover:-translate-y-0.5 ${analyzingProjectId === project.id ? 'opacity-75 cursor-wait' : ''}`}
                        >
                          {analyzingProjectId === project.id ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                          {analyzingProjectId === project.id ? 'Generating Insights...' : '✨ PM Analysis'}
                        </button>
                      ) : (
                         <div className={`mt-4 p-6 rounded-xl border ${theme.border} ${isDarkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                           <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                                <Bot size={18} className="text-blue-500" /> AI Product Insight
                              </div>
                              <button onClick={() => setProjectAnalyses(prev => ({...prev, [project.id]: null}))} className={theme.textMuted}><XCircle size={16} /></button>
                           </div>
                           <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                             <p className={`text-sm whitespace-pre-line leading-relaxed ${theme.text}`}>{projectAnalyses[project.id]}</p>
                           </div>
                         </div>
                      )}
                    </div>

                  </div>
                  <div className={`w-full lg:w-80 p-6 rounded-xl border ${theme.border} ${isDarkMode ? 'bg-black/20' : 'bg-zinc-50'}`}>
                    <h4 className={`text-sm font-bold uppercase tracking-widest mb-6 ${theme.textMuted}`}>Impact Metrics</h4>
                    <ul className="space-y-4">
                      {project.metrics.map((m, i) => (
                        <li key={i} className={`flex items-start gap-3 ${theme.text}`}>
                          <ArrowRight size={18} className="mt-0.5 flex-shrink-0" /> <span className="font-medium">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className={`py-24 lg:py-32 scroll-mt-20 border-t border-dashed ${theme.divider}`}>
          <SectionTitle title="Articles" subtitle="Thoughts on Product Management & AI." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <a 
                key={article.id} 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block h-full"
              >
                <SpotlightCard className="flex flex-col h-full hover:-translate-y-2 transition-transform cursor-pointer">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}><Linkedin size={24} /></div>
                    <span className={`text-sm font-mono ${theme.textMuted}`}>{article.date}</span>
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${theme.text}`}>{article.title}</h3>
                  <p className={`text-lg mb-8 flex-grow ${theme.textMuted}`}>{article.summary}</p>
                  <div className={`inline-flex items-center font-bold text-lg hover:underline ${theme.text}`}>
                    Read Article <ExternalLink size={18} className="ml-2" />
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </div>
        </section>

        {/* Teardowns Section */}
        <section id="teardowns" className={`py-24 lg:py-32 scroll-mt-20 border-t border-dashed ${theme.divider}`}>
          <SectionTitle title="Product Teardowns" subtitle="Deconstructing UX and Growth Loops." />
          <div className="grid grid-cols-1 gap-8">
            {teardowns.map((td) => (
              <SpotlightCard key={td.id} className={`p-8`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${theme.text}`}>{td.title}</h3>
                    <p className={`text-lg ${theme.textMuted}`}>{td.summary}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-block px-4 py-2 rounded border text-sm font-mono ${theme.border} ${theme.textMuted}`}>{td.readTime}</span>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Documents Section */}
        <section id="documents" className={`py-24 lg:py-32 scroll-mt-20 border-t border-dashed ${theme.divider}`}>
           <SectionTitle title="Documents" subtitle="Downloadable assets." />
           <div className="grid grid-cols-1 gap-6">
              {documents.map((doc) => (
                 <SpotlightCard key={doc.id} className="group">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'}`}>
                             <File size={24} />
                          </div>
                          <div>
                             <h3 className={`text-xl font-bold ${theme.text}`}>{doc.name}</h3>
                             <p className={`text-sm ${theme.textMuted}`}>{doc.type} File</p>
                          </div>
                       </div>
                       <a 
                         href={doc.file} 
                         download 
                         className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 ${theme.buttonPrimary}`}
                       >
                          <Download size={18} /> Download
                       </a>
                    </div>
                 </SpotlightCard>
              ))}
           </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-24 lg:py-32 scroll-mt-20 border-t border-dashed ${theme.divider}`}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className={`text-5xl font-bold mb-6 ${theme.text}`}>Let's Connect</h2>
            <p className={`text-xl mb-12 ${theme.textMuted}`}>I'm currently looking for Product Management roles. <br />If you have an interesting problem to solve, I'd love to hear about it.</p>
            <div className="flex justify-center gap-8 mb-16">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={`p-4 rounded-full border hover:scale-110 transition-transform ${theme.border} ${theme.text}`}><Linkedin size={24} /></a>
              <a href={profile.github} target="_blank" rel="noreferrer" className={`p-4 rounded-full border hover:scale-110 transition-transform ${theme.border} ${theme.text}`}><Github size={24} /></a>
              <a href={`mailto:${profile.email}`} className={`p-4 rounded-full border hover:scale-110 transition-transform ${theme.border} ${theme.text}`}><Mail size={24} /></a>
            </div>
            <div className="text-left">
              {formStatus === 'success' ? (
                <div className={`p-8 rounded-xl border ${isDarkMode ? 'bg-green-500/10 border-green-500/50 text-green-200' : 'bg-green-50 border-green-200 text-green-800'} flex flex-col items-center justify-center text-center animate-fadeIn`}>
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"><CheckCircle size={32} className="text-green-500" /></div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p>Thanks for reaching out, {formData.name || 'Yaswanth'}. I'll get back to you soon.</p>
                  <button onClick={() => setFormStatus('idle')} className="mt-6 text-sm font-bold underline">Send another message</button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-colors ${theme.border} ${theme.text} ${theme.inputBg}`} placeholder="Your name" required disabled={formStatus === 'submitting'} />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-colors ${theme.border} ${theme.text} ${theme.inputBg}`} placeholder="name@company.com" required disabled={formStatus === 'submitting'} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>Message</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className={`w-full p-4 h-40 rounded-xl border focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-colors ${theme.border} ${theme.text} ${theme.inputBg}`} placeholder="How can I help you?" required disabled={formStatus === 'submitting'} />
                  </div>
                  {formStatus === 'error' && <div className="flex items-center gap-2 text-red-500 text-sm font-medium"><AlertCircle size={16} />{errorMessage}</div>}
                  <button disabled={formStatus === 'submitting'} className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${theme.buttonPrimary} ${formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''} submit-btn`}>
                    {formStatus === 'submitting' ? <><Loader2 size={20} className="animate-spin" /> Sending...</> : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Feature 1: AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 border-2 border-white/10"
          >
            <Sparkles size={28} className="animate-pulse" />
          </button>
        )}

        {isChatOpen && (
          <div className={`w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden border flex flex-col transition-all duration-300 ${theme.chatBg}`} style={{height: '500px'}}>
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-zinc-900 to-black text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-bold">Yaswanth's AI</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setChatHistory([{ role: 'model', text: "Hi! I'm Yaswanth's AI assistant. Ask me anything about his projects, skills, or experience!" }])} className="text-zinc-400 hover:text-white" title="Reset Chat"><RefreshCw size={16} /></button>
                <button onClick={() => setIsChatOpen(false)} className="text-zinc-400 hover:text-white"><X size={20} /></button>
              </div>
            </div>

            {/* Chat History */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'}`}>
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? theme.chatUserBubble + ' rounded-tr-none' : theme.chatBotBubble + ' rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                   <div className={`${theme.chatBotBubble} p-3 rounded-2xl rounded-tl-none flex gap-1`}>
                     <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                     <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                   </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className={`p-3 border-t ${theme.border} flex gap-2 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about my skills..."
                className={`flex-1 p-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${isDarkMode ? 'bg-zinc-800 text-white placeholder-zinc-500' : 'bg-zinc-100 text-black placeholder-zinc-400'}`}
              />
              <button type="submit" disabled={isChatLoading || !chatInput.trim()} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                <Send size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Portfolio;