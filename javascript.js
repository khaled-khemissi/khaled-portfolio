const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
   
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.id === 'skills') {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const value = bar.getAttribute('data-value');
                    bar.style.width = value + '%';
                });
            }
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.style.width = '0';
});
 const translations = {
    fr: {
        navAbout: "À propos",
        navSkills: "Compétences",
        navExperience: "Expérience",
        navProjects: "Projets",
        navEducation: "Éducation",
        navContact: "Contact",
        headerName: "Khaled Khemissi",
        headerTitle: "Développeur Web Full Stack",
        aboutTitle: "À propos de moi",
        aboutText1: "Avec un fort sens des responsabilités, une grande autonomie et un esprit perfectionniste, je mets à profit mon solide bagage pour contribuer efficacement au succès de votre entreprise.",
        aboutText2: "En tant que développeur web full stack expérimenté, j'ai travaillé sur divers projets allant des applications web personnalisées aux solutions e-commerce.",
        langArabic: "Arabe",
        langArabicLevel: "Natif",
        langFrench: "Français",
        langFrenchLevel: "Intermédiaire",
        langEnglish: "Anglais",
        langEnglishLevel: "Intermédiaire",
        skillsTitle: "Compétences Techniques",
        skillPHP: "PHP",
        skillWordPress: "WordPress",
        skillPrestaShop: "PrestaShop",
        skillJS: "JavaScript",
        skillReact: "React.js",
        skillHTML: "HTML5/CSS3",
        skillLaravel: "Laravel",
        skillSymfony: "Symfony",
        skillSQL: "SQL/PLSQL",
        skillAndroid: "Android Studio",
        skillDjango: "Django",
        experienceTitle: "Expérience Professionnelle",
        expJobTitle: "Développeur Web Full Stack - 3W WIT",
        exp1: "Développement d'applications web avec Symfony et Laravel, intégration d'entités et services personnalisés pour des solutions sur mesure.",
        exp2: "Maintenance et optimisation des performances pour garantir des applications robustes et efficaces.",
        exp3: "Conception et gestion de plus de 20 projets sur WordPress et PrestaShop, y compris thèmes, plugins et widgets personnalisés.",
        exp4: "Création de pages dynamiques et esthétiques avec Elementor pour améliorer l'expérience utilisateur.",
        exp5: "Intégration de fonctionnalités interactives avec jQuery, comme les menus réactifs et la validation de formulaires.",
        exp6: "Utilisation d'AJAX pour optimiser la performance et l'interactivité des sites web.",
        exp7: "Mentorat de nouveaux développeurs pour une intégration rapide et efficace dans les projets.",
        projectsTitle: "Projets",
        proj1Title: "Carte Interactive",
        proj1Desc: "Une carte web réactive qui permet aux utilisateurs d'explorer les emplacements et de voir les détails en interagissant avec eux.",
        proj2Title: "Développement Front-End du site Eurex",
        proj2Desc: "Développement complet du front-end du site Eurex, créant une interface réactive et interactive.",
        proj3Title: "Développement Front-End du site Leaders-Immo",
        proj3Desc: "Développement complet du front-end du site Leaders-Immo, créant une interface réactive et interactive.",
        proj4Title: "Système de Rendez-vous Hospitalier",
        proj4Desc: "Une application web complète pour gérer les rendez-vous dans un environnement hospitalier, développée avec Symfony et React.js.",
        proj5Title: "Gestion du Personnel Hôtelier",
        proj5Desc: "Une solution complète de gestion du personnel pour les hôtels avec une interface réactive et un tableau de bord administratif.",
        educationTitle: "Éducation",
        edu1Title: "Diplôme National de Licence Appliquée en Informatique",
        edu1School: "Institut Supérieur des Études Technologiques de Mahdia",
        edu2Title: "Diplôme National du Baccalauréat - Section Mathématiques",
        edu2School: "Lycée Mohamed Boudhina Hammamet",
        contactTitle: "Contactez-moi",
        contactPhoneTitle: "Téléphone",
        contactLocationTitle: "Localisation",
        footerCopyright: "© 2024 Khaled Khemissi. Tous droits réservés."

    },
    en: {
        navAbout: "About",
        navSkills: "Skills",
        navExperience: "Experience",
        navProjects: "Projects",
        navEducation: "Education",
        navContact: "Contact",
        headerName: "Khaled Khemissi",
        headerTitle: "Full Stack Web Developer",
        aboutTitle: "About Me",
        aboutText1: "With a strong sense of responsibility, great autonomy, and a perfectionist mindset, I leverage my solid background to effectively contribute to your company's success.",
        aboutText2: "As an experienced full stack web developer, I have worked on various projects ranging from custom web applications to e-commerce solutions.",
        langArabic: "Arabic",
        langArabicLevel: "Native",
        langFrench: "French",
        langFrenchLevel: "Intermediate",
        langEnglish: "English",
        langEnglishLevel: "Intermediate",
        skillsTitle: "Technical Skills",
        skillPHP: "PHP",
        skillWordPress: "WordPress",
        skillPrestaShop: "PrestaShop",
        skillJS: "JavaScript",
        skillReact: "React.js",
        skillHTML: "HTML5/CSS3",
        skillLaravel: "Laravel",
        skillSymfony: "Symfony",
        skillSQL: "SQL/PLSQL",
        skillAndroid: "Android Studio",
        skillDjango: "Django",
        experienceTitle: "Work Experience",
        expJobTitle: "Full Stack Web Developer - 3W WIT",
        exp1: "Development of web applications with Symfony and Laravel, integrating custom entities and services for tailored solutions.",
        exp2: "Maintenance and performance optimization to ensure robust and efficient applications.",
        exp3: "Design and management of over 20 projects on WordPress and PrestaShop, including custom themes, plugins, and widgets.",
        exp4: "Creation of dynamic and aesthetic pages with Elementor to enhance user experience.",
        exp5: "Integration of interactive features with jQuery, such as responsive menus and form validation.",
        exp6: "Use of AJAX to optimize website performance and interactivity.",
        exp7: "Mentoring new developers for quick and effective integration into projects.",
        projectsTitle: "Featured Projects",
        proj1Title: "Interactive Map",
        proj1Desc: "A responsive web-based map that lets users explore locations and view details by interacting with them.",
        proj2Title: "Developed the Front-End of Eurex Website",
        proj2Desc: "Developed the entire front-end of the Eurex website, creating a responsive and interactive interface.",
        proj3Title: "Developed the Front-End of Leaders-Immo Website",
        proj3Desc: "Developed the entire front-end of the Leaders-Immo website, creating a responsive and interactive interface.",
        proj4Title: "Hospital Appointment System",
        proj4Desc: "A complete web application for managing appointments in a hospital environment, developed with Symfony and React.js.",
        proj5Title: "Hotel Staff Management",
        proj5Desc: "A complete staff management solution for hotels with a responsive interface and administrative dashboard.",
        educationTitle: "Education",
        edu1Title: "National Diploma of Applied License in Information Technology",
        edu1School: "Higher Institute of Technological Studies of Mahdia",
        edu2Title: "National Baccalaureate Diploma - Mathematics Section",
        edu2School: "Mohamed Boudhina High School Hammamet",
        contactTitle: "Contact Me",
        contactPhoneTitle: "Phone",
        contactLocationTitle: "Location",
        footerCopyright: "© 2024 Khaled Khemissi. All rights reserved."

    }
};

    const enBtn = document.getElementById('enBtn');
    const frBtn = document.getElementById('frBtn');
    const langElements = document.querySelectorAll('[data-key]');

    function setLanguage(lang) {
        langElements.forEach(el => {
            const key = el.getAttribute('data-key');
            if(translations[lang][key]) el.innerText = translations[lang][key];
        });
        if(lang === 'fr') {
            frBtn.classList.add('active');
            enBtn.classList.remove('active');
        } else {
            enBtn.classList.add('active');
            frBtn.classList.remove('active');
        }
    }

    enBtn.addEventListener('click', () => setLanguage('en'));
    frBtn.addEventListener('click', () => setLanguage('fr'));