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
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty hash links
            
            e.preventDefault();
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

    // Navbar border on scroll - throttled for performance
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (window.scrollY > 50) {
                        navbar.style.borderBottomColor = '#d1d5db';
                    } else {
                        navbar.style.borderBottomColor = '#e5e7eb';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

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

// Removed scroll reveal animations for minimalistic approach

// Language translations
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-blog': 'Blog',
        'nav-speaking': 'Speaking',
        'nav-book': 'Book a Call',
        
        // Hero Section
        'hero-greeting': 'Hi, I\'m',
        'hero-subtitle': 'AI & Data Engineer',
        'hero-description': 'I build AI systems with Python. Currently working as a freelance AI engineer on LLM applications and data pipelines. I have a math background and like chess. Sometimes I write about neural networks and speak at events.',
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
        'skills-web-title': 'Web Development',
        'skills-data-title': 'Data & Analytics',
        
        // Featured Project
        'project-title': 'Featured Project',
        'project-subtitle': 'AI-powered mathematics tutoring',
        'project-description': 'AI mathematics tutor I built for a YouTube education channel',
        'project-btn': 'Learn More',
        

        
        // Blog Page
        'blog-title': 'Blog & Articles',
        'blog-subtitle': 'Insights into AI, mathematics, and technology',
        'blog-article-category': 'Research',
        'blog-article-date': '2022',
        'blog-article-title': 'Why Do Neural Networks Work?',
        'blog-article-excerpt': 'A deep exploration into manifold disentanglement in deep learning, providing mathematical insights into how neural networks transform and separate data representations across layers.',
        'tag-dl': 'Deep Learning',
        'tag-math': 'Mathematics',
        'tag-nn': 'Neural Networks',
        'tag-manifold': 'Manifold Theory',
        'blog-read-more': 'Read article',
        'blog-code': 'Code',
        'blog-website': 'Website',
        
        // Speaking Page
        'speaking-title': 'Speaking',
        'speaking-subtitle': 'Talks and lectures on AI, data science, and career development',
        'speaking-category': 'University Lecture',
        'speaking-date': 'May 2025',
        'speaking-talk-title': 'Trabajar en IT: Herramientas, Experiencias y Aprendizajes',
        'speaking-venue': 'Universidad de Málaga - Máster en Big Data, IA e Ingeniería de Datos',
        'speaking-description': 'Guest lecture to 25 master\'s students sharing practical insights about working in IT. Covered essential tools, real-world experiences, and career lessons for building a successful career in data science.',
        'speaking-link': 'Read more about this talk →',
        
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
        'contact-collaboration-title': 'Technical Collaboration',
        'contact-collaboration-desc': 'Open to collaborating on research projects, open-source contributions, and innovative AI applications, especially in education and mathematics.',

        'contact-mentoring-title': 'Mentoring',
        'contact-mentoring-desc': 'Supporting aspiring AI engineers and mathematicians through career guidance, technical mentoring, and educational content creation.',
        
        // Book a Call Page
        'book-title': 'Book a Call',
        'book-subtitle': 'Let\'s discuss AI projects, collaborations, or speaking opportunities',
        'book-intro-title': 'Let\'s Talk',
        'book-intro-desc': 'Schedule a free call to discuss AI & LLM consulting, RAG systems, GenAI applications, data pipelines, speaking opportunities, or technical mentoring.',
        
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
        'nav-book': 'Reservar Llamada',
        
        // Hero Section
        'hero-greeting': 'Hola, soy',
        'hero-subtitle': 'Ingeniero de IA y Datos',
        'hero-description': 'Construyo sistemas de IA con Python. Actualmente trabajo como ingeniero de IA freelance en aplicaciones LLM y pipelines de datos. Tengo formación en matemáticas y me gusta el ajedrez. A veces escribo sobre redes neuronales y doy conferencias.',
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
        'skills-web-title': 'Desarrollo Web',
        'skills-data-title': 'Datos y Analítica',
        
        // Featured Project
        'project-title': 'Proyecto Destacado',
        'project-subtitle': 'Tutoría de matemáticas con IA',
        'project-description': 'Tutor de matemáticas con IA que construí para un canal educativo de YouTube',
        'project-btn': 'Saber Más',
        

        
        // Blog Page
        'blog-title': 'Blog y Artículos',
        'blog-subtitle': 'Perspectivas sobre IA, matemáticas y tecnología',
        'blog-article-category': 'Investigación',
        'blog-article-date': '2022',
        'blog-article-title': '¿Por Qué Funcionan las Redes Neuronales?',
        'blog-article-excerpt': 'Una exploración profunda sobre el desenredamiento de variedades en aprendizaje profundo, proporcionando perspectivas matemáticas sobre cómo las redes neuronales transforman y separan representaciones de datos a través de las capas.',
        'tag-dl': 'Aprendizaje Profundo',
        'tag-math': 'Matemáticas',
        'tag-nn': 'Redes Neuronales',
        'tag-manifold': 'Teoría de Variedades',
        'blog-read-more': 'Leer artículo',
        'blog-code': 'Código',
        'blog-website': 'Sitio Web',
        
        // Speaking Page
        'speaking-title': 'Conferencias',
        'speaking-subtitle': 'Charlas y conferencias sobre IA, ciencia de datos y desarrollo profesional',
        'speaking-category': 'Conferencia Universitaria',
        'speaking-date': 'Mayo 2025',
        'speaking-talk-title': 'Trabajar en IT: Herramientas, Experiencias y Aprendizajes',
        'speaking-venue': 'Universidad de Málaga - Máster en Big Data, IA e Ingeniería de Datos',
        'speaking-description': 'Conferencia para 25 estudiantes de máster compartiendo ideas prácticas sobre trabajar en IT. Cubrí herramientas esenciales, experiencias del mundo real y lecciones profesionales para construir una carrera exitosa en ciencia de datos.',
        'speaking-link': 'Leer más sobre esta charla →',
        
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
        'contact-collaboration-title': 'Colaboración Técnica',
        'contact-collaboration-desc': 'Abierto a colaborar en proyectos de investigación, contribuciones de código abierto y aplicaciones innovadoras de IA, especialmente en educación y matemáticas.',

        'contact-mentoring-title': 'Mentoría',
        'contact-mentoring-desc': 'Apoyando a aspirantes a ingenieros de IA y matemáticos a través de orientación profesional, mentoría técnica y creación de contenido educativo.',
        
        // Book a Call Page
        'book-title': 'Reservar Llamada',
        'book-subtitle': 'Hablemos sobre proyectos de IA, colaboraciones u oportunidades de conferencias',
        'book-intro-title': 'Hablemos',
        'book-intro-desc': 'Programa una llamada gratuita para discutir consultoría de IA y LLM, sistemas RAG, aplicaciones GenAI, pipelines de datos, oportunidades de conferencias o mentoría técnica.',
        
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
