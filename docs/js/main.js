// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add active state to navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Language Switcher
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const currentLang = document.getElementById('current-lang');

    if (langToggle && langDropdown) {
        // Toggle dropdown
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!langToggle.contains(event.target) && !langDropdown.contains(event.target)) {
                langDropdown.classList.remove('show');
            }
        });

        // Handle language selection
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const selectedLang = this.getAttribute('data-lang');
                switchLanguage(selectedLang);
                langDropdown.classList.remove('show');
            });
        });
    }

    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    switchLanguage(savedLang);
});

// Utility function for copying email to clipboard
function copyEmail() {
    const email = 'zumaquerodavid@gmail.com';
    navigator.clipboard.writeText(email).then(function() {
        // Show a temporary message
        const message = document.createElement('div');
        message.textContent = 'Email copied to clipboard!';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #22c55e;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.removeChild(message);
        }, 3000);
    });
}

// Add scroll reveal animation for hero elements
function initScrollReveal() {
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.animation = `fadeInUp 0.6s ease-out forwards`;
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize scroll reveal when page loads
document.addEventListener('DOMContentLoaded', initScrollReveal);

// Language translations
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-blog': 'Blog',
        'nav-speaking': 'Speaking',
        'nav-contact': 'Contact',
        
        // Hero Section
        'hero-greeting': 'Hi, I\'m',
        'hero-subtitle': 'AI & Data Engineer',
        'hero-description': 'AI Engineer with 4+ years of experience building Python-based LLM solutions. I hold an MSc in Mathematics and enjoy turning messy data into intelligent, production-ready systems. As a chess player, I enjoy spotting patterns and thinking ahead.',
        'hero-btn-speaking': 'View Speaking',
        'hero-btn-contact': 'Get in Touch',
        
        // About Section
        'about-title': 'About Me',
        'about-subtitle': 'Passionate about turning complex problems into elegant solutions',
        'about-text-1': 'I specialize in building intelligent systems that bridge the gap between cutting-edge AI research and practical business applications. My mathematical background gives me a unique perspective on machine learning algorithms and their real-world implementations.',
        'about-text-2': 'Currently working as a Freelance AI Engineer at EnergyAI Berlin, where I develop GenAI applications and robust data pipelines. I\'m passionate about RAG systems, agentic AI, and the mathematical foundations that make neural networks so effective.',
        'stat-experience': 'Years Experience',
        'stat-projects': 'Projects Completed',
        'stat-speaking': 'Speaking Event',
        
        // Skills Section
        'skills-title': 'Core Expertise',
        'skills-subtitle': 'Technologies and tools I work with',
        'skills-ai-title': 'AI & Machine Learning',
        'skills-programming-title': 'Programming',
        'skills-data-title': 'Data & Analytics',
        'skills-cloud-title': 'Cloud & DevOps',
        
        // Featured Project
        'project-title': 'Featured Project',
        'project-subtitle': 'AI-powered mathematics tutoring',
        'project-description': 'AI mathematics tutor I built for a YouTube education channel',
        'project-btn': 'Learn More',
        
        // Speaking Page
        'speaking-title': 'Speaking & Talks',
        'speaking-subtitle': 'Sharing knowledge about AI, data science, and mathematics through conferences, university lectures, and industry talks.',
        'speaker-profile-title': 'Speaker Profile',
        'speaker-profile-description': 'AI Engineer with a mathematical background, sharing insights about the intersection of theory and practice in artificial intelligence. I focus on making complex AI concepts accessible and providing practical career guidance for data science professionals.',
        'speaker-stat-students': 'Students Reached',
        'speaker-stat-topics': 'Topics Covered',
        'speaker-topics-title': 'Speaking Topics',
        'topic-career': 'Career Development in Data Science',
        'topic-ai': 'AI & Machine Learning Applications',
        'topic-math': 'Mathematical Foundations of AI',
        'topic-production': 'Building Production AI Systems',
        'event-title': 'Everything you need to know to launch your career in Data Science',
        'event-location': 'Room B.1.1, Ada Byron Research Building, Málaga',
        'event-description': 'Guest lecture to 25 master\'s students covering essential career guidance for aspiring data scientists. Topics included practical skills, industry insights, and career development strategies for the Spanish market.',
        'event-topics-title': 'Key Topics Covered:',
        'event-topic-1': 'Essential technical skills for data science careers',
        'event-topic-2': 'Industry landscape and job market insights',
        
        // Blog Page
        'blog-title': 'Blog & Articles',
        'blog-subtitle': 'Insights into AI, mathematics, and technology',
        
        // Contact Page
        'contact-title': 'Get in Touch',
        'contact-subtitle': 'Let\'s discuss AI projects, speaking opportunities, or collaboration',
        'contact-info-title': 'Contact Information',
        'contact-email': 'Email',
        'contact-location': 'Location',
        'contact-location-value': 'Berlin, Germany',
        'contact-methods-title': 'Let\'s Connect',
        'contact-email-title': 'Email Me',
        'contact-email-desc': 'Send me an email for general inquiries, project discussions, or collaboration opportunities.',
        'contact-email-btn': 'Send Email',
        'contact-meeting-title': 'Schedule a Meeting',
        'contact-meeting-desc': 'Book a time that works for both of us to discuss your project, speaking opportunities, or potential collaborations.',
        'contact-meeting-btn': 'Schedule Meeting',
        'contact-help-title': 'How Can I Help?',
        'contact-help-subtitle': 'Areas where I\'m available for collaboration',
        'contact-consulting-title': 'AI Consulting',
        'contact-consulting-desc': 'Expert guidance on AI strategy, LLM implementation, RAG systems, and machine learning project architecture. From proof-of-concept to production deployment.',
        'contact-collaboration-title': 'Technical Collaboration',
        'contact-collaboration-desc': 'Open to collaborating on research projects, open-source contributions, and innovative AI applications, especially in education and mathematics.',
        'contact-speaking-title': 'Speaking & Workshops',
        'contact-speaking-desc': 'Available for conferences, workshops, and technical presentations on AI, machine learning, neural networks, and the intersection of mathematics and technology.',
        'contact-mentoring-title': 'Mentoring',
        'contact-mentoring-desc': 'Supporting aspiring AI engineers and mathematicians through career guidance, technical mentoring, and educational content creation.',
        
        // Mathbot Demo Page
        'mathbot-subtitle': 'AI-powered mathematics tutoring chatbot',
        'mathbot-about-title': 'About the Bot',
        'mathbot-description': 'An AI mathematics tutor I built for the Matematicas.top YouTube channel. Send equations or images with math problems, and the bot solves them using AI, with reference videos from the channel.',
        'mathbot-features-title': 'Key Features',
        'mathbot-feature-1': 'Solves text and image-based math problems',
        'mathbot-feature-2': 'Provides educational video references',
        'mathbot-feature-3': '24/7 availability via Telegram',
        'mathbot-feature-4': 'Multimodal AI processing',
        'mathbot-try-btn': 'Try the Bot',
        'mathbot-demo-btn': 'Web Demo'
    },
    es: {
        // Navigation
        'nav-home': 'Inicio',
        'nav-blog': 'Blog',
        'nav-speaking': 'Conferencias',
        'nav-contact': 'Contacto',
        
        // Hero Section
        'hero-greeting': 'Hola, soy',
        'hero-subtitle': 'Ingeniero de IA y Datos',
        'hero-description': 'Ingeniero de IA con más de 4 años de experiencia desarrollando soluciones LLM en Python. Tengo un MSc en Matemáticas y disfruto convirtiendo datos complejos en sistemas inteligentes y listos para producción. Como jugador de ajedrez, me gusta detectar patrones y pensar con anticipación.',
        'hero-btn-speaking': 'Ver Conferencias',
        'hero-btn-contact': 'Contactar',
        
        // About Section
        'about-title': 'Sobre Mí',
        'about-subtitle': 'Apasionado por convertir problemas complejos en soluciones elegantes',
        'about-text-1': 'Me especializo en construir sistemas inteligentes que conectan la investigación de IA de vanguardia con aplicaciones empresariales prácticas. Mi formación matemática me da una perspectiva única sobre los algoritmos de aprendizaje automático y sus implementaciones del mundo real.',
        'about-text-2': 'Actualmente trabajo como Ingeniero de IA Freelance en EnergyAI Berlin, donde desarrollo aplicaciones GenAI y pipelines de datos robustos. Me apasionan los sistemas RAG, la IA agéntica y los fundamentos matemáticos que hacen que las redes neuronales sean tan efectivas.',
        'stat-experience': 'Años de Experiencia',
        'stat-projects': 'Proyectos Completados',
        'stat-speaking': 'Evento de Conferencia',
        
        // Skills Section
        'skills-title': 'Experiencia Principal',
        'skills-subtitle': 'Tecnologías y herramientas con las que trabajo',
        'skills-ai-title': 'IA y Aprendizaje Automático',
        'skills-programming-title': 'Programación',
        'skills-data-title': 'Datos y Analítica',
        'skills-cloud-title': 'Nube y DevOps',
        
        // Featured Project
        'project-title': 'Proyecto Destacado',
        'project-subtitle': 'Tutoría de matemáticas con IA',
        'project-description': 'Tutor de matemáticas con IA que construí para un canal educativo de YouTube',
        'project-btn': 'Saber Más',
        
        // Speaking Page
        'speaking-title': 'Conferencias y Charlas',
        'speaking-subtitle': 'Compartiendo conocimiento sobre IA, ciencia de datos y matemáticas a través de conferencias, clases universitarias y charlas industriales.',
        'speaker-profile-title': 'Perfil de Conferenciante',
        'speaker-profile-description': 'Ingeniero de IA con formación matemática, compartiendo conocimientos sobre la intersección entre teoría y práctica en inteligencia artificial. Me enfoco en hacer accesibles conceptos complejos de IA y proporcionar orientación práctica de carrera para profesionales de ciencia de datos.',
        'speaker-stat-students': 'Estudiantes Alcanzados',
        'speaker-stat-topics': 'Temas Cubiertos',
        'speaker-topics-title': 'Temas de Conferencias',
        'topic-career': 'Desarrollo de Carrera en Ciencia de Datos',
        'topic-ai': 'Aplicaciones de IA y Aprendizaje Automático',
        'topic-math': 'Fundamentos Matemáticos de la IA',
        'topic-production': 'Construcción de Sistemas de IA en Producción',
        'event-title': 'Todo lo que necesitas saber para lanzar tu carrera en Ciencia de datos',
        'event-location': 'Aula B.1.1, Edificio de Investigación Ada Byron, Málaga',
        'event-description': 'Conferencia magistral a 25 estudiantes de máster cubriendo orientación esencial de carrera para aspirantes a científicos de datos. Los temas incluyeron habilidades prácticas, perspectivas de la industria y estrategias de desarrollo profesional para el mercado español.',
        'event-topics-title': 'Temas Principales Cubiertos:',
        'event-topic-1': 'Habilidades técnicas esenciales para carreras en ciencia de datos',
        'event-topic-2': 'Panorama de la industria y perspectivas del mercado laboral',
        
        // Blog Page
        'blog-title': 'Blog y Artículos',
        'blog-subtitle': 'Perspectivas sobre IA, matemáticas y tecnología',
        
        // Contact Page
        'contact-title': 'Contáctame',
        'contact-subtitle': 'Hablemos sobre proyectos de IA, oportunidades de conferencias o colaboración',
        'contact-info-title': 'Información de Contacto',
        'contact-email': 'Email',
        'contact-location': 'Ubicación',
        'contact-location-value': 'Berlín, Alemania',
        'contact-methods-title': 'Conectemos',
        'contact-email-title': 'Envíame un Email',
        'contact-email-desc': 'Envíame un email para consultas generales, discusiones de proyectos o oportunidades de colaboración.',
        'contact-email-btn': 'Enviar Email',
        'contact-meeting-title': 'Programar una Reunión',
        'contact-meeting-desc': 'Reserva un horario que funcione para ambos para discutir tu proyecto, oportunidades de conferencias o colaboraciones potenciales.',
        'contact-meeting-btn': 'Programar Reunión',
        'contact-help-title': '¿Cómo Puedo Ayudar?',
        'contact-help-subtitle': 'Áreas donde estoy disponible para colaboración',
        'contact-consulting-title': 'Consultoría en IA',
        'contact-consulting-desc': 'Orientación experta en estrategia de IA, implementación de LLM, sistemas RAG y arquitectura de proyectos de aprendizaje automático. Desde prueba de concepto hasta implementación en producción.',
        'contact-collaboration-title': 'Colaboración Técnica',
        'contact-collaboration-desc': 'Abierto a colaborar en proyectos de investigación, contribuciones de código abierto y aplicaciones innovadoras de IA, especialmente en educación y matemáticas.',
        'contact-speaking-title': 'Conferencias y Talleres',
        'contact-speaking-desc': 'Disponible para conferencias, talleres y presentaciones técnicas sobre IA, aprendizaje automático, redes neuronales y la intersección de matemáticas y tecnología.',
        'contact-mentoring-title': 'Mentoría',
        'contact-mentoring-desc': 'Apoyando a aspirantes a ingenieros de IA y matemáticos a través de orientación profesional, mentoría técnica y creación de contenido educativo.',
        
        // Mathbot Demo Page
        'mathbot-subtitle': 'Chatbot de tutoría de matemáticas con IA',
        'mathbot-about-title': 'Sobre el Bot',
        'mathbot-description': 'Un tutor de matemáticas con IA que construí para el canal de YouTube Matematicas.top. Envía ecuaciones o imágenes con problemas matemáticos, y el bot los resuelve usando IA, con videos de referencia del canal.',
        'mathbot-features-title': 'Características Principales',
        'mathbot-feature-1': 'Resuelve problemas matemáticos de texto e imágenes',
        'mathbot-feature-2': 'Proporciona referencias de videos educativos',
        'mathbot-feature-3': 'Disponibilidad 24/7 vía Telegram',
        'mathbot-feature-4': 'Procesamiento de IA multimodal',
        'mathbot-try-btn': 'Probar el Bot',
        'mathbot-demo-btn': 'Demo Web'
    }
};

// Language switching function
function switchLanguage(lang) {
    const currentLang = document.getElementById('current-lang');
    if (currentLang) {
        currentLang.textContent = lang.toUpperCase();
    }
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
    
    // Apply translations
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Load saved language preference
const savedLang = localStorage.getItem('preferred-language') || 'en';
switchLanguage(savedLang);
