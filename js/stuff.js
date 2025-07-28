// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Dark/Light Mode Toggle - Fixed Version
    const modeSwitch = document.getElementById('modeSwitch');
    const body = document.body;
    
    // Check for saved mode preference or default to light mode
    const savedMode = localStorage.getItem('kamilia-theme') || 'light';
    
    if (savedMode === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (modeSwitch) modeSwitch.checked = true;
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (modeSwitch) modeSwitch.checked = false;
    }
    
    // Mode switch event listener
    if (modeSwitch) {
        modeSwitch.addEventListener('change', function() {
            console.log('Mode switch clicked!', this.checked); // Debug log
            
            if (this.checked) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('kamilia-theme', 'dark');
                createModeTransition('dark');
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('kamilia-theme', 'light');
                createModeTransition('light');
            }
        });
    }
    
    // Create magical transition effect when switching modes
    function createModeTransition(mode) {
        const particles = document.createElement('div');
        particles.className = 'mode-particles';
        particles.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            const isDark = mode === 'dark';
            const particleColor = isDark ? '#ffd700' : '#ff69b4';
            const particleSymbol = isDark ? '✨' : '💖';
            
            particle.innerHTML = particleSymbol;
            particle.style.cssText = `
                position: absolute;
                font-size: 20px;
                color: ${particleColor};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                animation: particleExplode 1.5s ease-out forwards;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            particles.appendChild(particle);
        }
        
        body.appendChild(particles);
        
        setTimeout(() => {
            if (particles.parentNode) {
                body.removeChild(particles);
            }
        }, 2000);
    }
    
    // Add particle explosion animation to CSS
    if (!document.getElementById('particle-animations')) {
        const style = document.createElement('style');
        style.id = 'particle-animations';
        style.textContent = `
            @keyframes particleExplode {
                0% {
                    opacity: 1;
                    transform: scale(0) translate(0, 0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.5) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.5) translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Test mode toggle function - for debugging
    window.testModeToggle = function() {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            if (modeSwitch) modeSwitch.checked = true;
            localStorage.setItem('kamilia-theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            if (modeSwitch) modeSwitch.checked = false;
            localStorage.setItem('kamilia-theme', 'light');
        }
    };
    
    // Explore button functionality
    const exploreBtn = document.getElementById('exploreBtn');
    const galleryStorySection = document.getElementById('gallery-story');
    
    if (exploreBtn && galleryStorySection) {
        exploreBtn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Smooth scroll to gallery section
            galleryStorySection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Create sparkle effect
            createSparkleEffect(this);
        });
    }
    
    // Gallery functionality
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let galleryInterval;
    
    function showSlide(index) {
        gallerySlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % gallerySlides.length;
        showSlide(currentSlide);
        addSlideAnimation();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + gallerySlides.length) % gallerySlides.length;
        showSlide(currentSlide);
        addSlideAnimation();
    }
    
    function addSlideAnimation() {
        const activeSlide = gallerySlides[currentSlide];
        if (activeSlide) {
            activeSlide.style.transform = 'scale(1.05)';
            setTimeout(() => {
                activeSlide.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // Gallery button event listeners
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto-play gallery
        if (gallerySlides.length > 0) {
            galleryInterval = setInterval(nextSlide, 5000);
            
            // Pause auto-play on hover
            const galleryContainer = document.querySelector('.gallery-container');
            if (galleryContainer) {
                galleryContainer.addEventListener('mouseenter', () => {
                    clearInterval(galleryInterval);
                });
                
                galleryContainer.addEventListener('mouseleave', () => {
                    galleryInterval = setInterval(nextSlide, 5000);
                });
            }
        }
    }
    
    // Artist photos hover effects
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    photoPlaceholders.forEach((photo, index) => {
        photo.addEventListener('mouseenter', function() {
            this.style.transform = `translateY(-10px) rotate(${Math.random() * 20 - 10}deg) scale(1.1)`;
            createFloatingHearts(this);
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add click effect
        photo.addEventListener('click', function() {
            createPhotoClickEffect(this);
        });
    });
    
    // Video hover effects
    const videoPlayers = document.querySelectorAll('.video-player');
    videoPlayers.forEach(video => {
        const overlay = video.nextElementSibling;
        
        video.addEventListener('mouseenter', function() {
            if (overlay && overlay.classList.contains('video-overlay')) {
                overlay.style.opacity = '1';
            }
            this.style.transform = 'scale(1.02)';
        });
        
        video.addEventListener('mouseleave', function() {
            if (overlay && overlay.classList.contains('video-overlay')) {
                overlay.style.opacity = '0';
            }
            this.style.transform = 'scale(1)';
        });
        
        video.addEventListener('play', function() {
            if (overlay && overlay.classList.contains('video-overlay')) {
                overlay.style.display = 'none';
            }
        });
        
        video.addEventListener('pause', function() {
            if (overlay && overlay.classList.contains('video-overlay')) {
                overlay.style.display = 'flex';
            }
        });
    });
    
    // Breakdown items scroll animation
    const breakdownItems = document.querySelectorAll('.breakdown-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                addItemAnimation(entry.target);
            }
        });
    }, observerOptions);
    
    breakdownItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });
    
    function addItemAnimation(item) {
        const title = item.querySelector('.breakdown-title');
        if (title) {
            title.style.animation = 'none';
            setTimeout(() => {
                title.style.animation = 'shimmer 2s ease-in-out';
            }, 100);
        }
    }
    
    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(15deg) scale(1.2)';
            createSocialSparkles(this);
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Floating elements management
    function createFloatingElements() {
        const floatingContainer = document.querySelector('.floating-elements');
        if (!floatingContainer) return;
        
        const floatingInterval = setInterval(() => {
            if (body.classList.contains('light-mode')) {
                const elements = ['💖', '✨', '🦋', '🌸', '💕', '⭐'];
                const element = document.createElement('div');
                element.textContent = elements[Math.floor(Math.random() * elements.length)];
                element.style.cssText = `
                    position: absolute;
                    left: ${Math.random() * 100}%;
                    bottom: -50px;
                    font-size: ${Math.random() * 10 + 15}px;
                    opacity: 0.7;
                    animation: floatUp 15s linear forwards;
                    pointer-events: none;
                `;
                floatingContainer.appendChild(element);
                
                setTimeout(() => {
                    if (element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                }, 15000);
            }
        }, 3000);
        
        // Store interval for cleanup
        window.floatingInterval = floatingInterval;
    }
    
    // Sparkle effect function
    function createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        const sparkles = [];
        const isDark = body.classList.contains('dark-mode');
        
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = isDark ? '✨' : '💖';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                font-size: 16px;
                color: ${isDark ? '#ffd700' : '#ff69b4'};
                pointer-events: none;
                z-index: 1000;
                animation: sparkleExplode 0.8s ease-out forwards;
            `;
            
            const angle = (i / 12) * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            sparkle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
            sparkle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
            
            document.body.appendChild(sparkle);
            sparkles.push(sparkle);
        }
        
        setTimeout(() => {
            sparkles.forEach(sparkle => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            });
        }, 800);
    }
    
    // Add sparkle explosion animation
    if (!document.getElementById('sparkle-animations')) {
        const sparkleStyle = document.createElement('style');
        sparkleStyle.id = 'sparkle-animations';
        sparkleStyle.textContent = `
            @keyframes sparkleExplode {
                0% {
                    opacity: 1;
                    transform: scale(0) translate(0, 0);
                }
                100% {
                    opacity: 0;
                    transform: scale(1) translate(var(--x), var(--y));
                }
            }
        `;
        document.head.appendChild(sparkleStyle);
    }
    
    // Floating hearts effect
    function createFloatingHearts(element) {
        const rect = element.getBoundingClientRect();
        const hearts = ['💖', '💕', '💗'];
        
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top}px;
                font-size: 16px;
                pointer-events: none;
                z-index: 1000;
                animation: floatHeart 2s ease-out forwards;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }
    }
    
    // Photo click effect
    function createPhotoClickEffect(element) {
        element.style.transform = 'scale(0.9)';
        setTimeout(() => {
            element.style.transform = 'translateY(-10px) rotate(10deg) scale(1.1)';
        }, 100);
        
        createSparkleEffect(element);
    }
    
    // Social sparkles effect
    function createSocialSparkles(element) {
        const rect = element.getBoundingClientRect();
        const sparkles = ['✨', '⭐', '💫'];
        
        for (let i = 0; i < 3; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top}px;
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                animation: socialSparkle 1s ease-out forwards;
            `;
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }
    }
    
    // Add additional animation styles
    if (!document.getElementById('additional-animations')) {
        const additionalStyles = document.createElement('style');
        additionalStyles.id = 'additional-animations';
        additionalStyles.textContent = `
            @keyframes floatHeart {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100px) scale(0.5);
                }
            }
            
            @keyframes socialSparkle {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1) rotate(0deg);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.3) rotate(180deg);
                }
            }
            
            @keyframes typewriter {
                from { width: 0; }
                to { width: 100%; }
            }
            
            @keyframes blink {
                0%, 50% { border-color: transparent; }
                51%, 100% { border-color: currentColor; }
            }
        `;
        document.head.appendChild(additionalStyles);
    }
    
    // Text animation effects
    function animateText(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid';
        element.style.animation = 'typewriter 3s steps(40) 1s forwards, blink 0.5s step-end infinite';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                }, 1000);
            }
        }, 100);
    }
    
    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Add scroll-based animations
        const splash = document.getElementById('splash');
        if (splash) {
            const opacity = Math.max(0, 1 - scrolled / window.innerHeight);
            splash.style.opacity = opacity;
        }
        
        // Floating elements follow scroll
        const floatingElements = document.querySelectorAll('.floating-heart, .floating-star, .floating-butterfly, .floating-flower');
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Mouse trail effect
    let mouseTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
        
        // Create trail particles
        if (Math.random() < 0.3) {
            createTrailParticle(e.clientX, e.clientY);
        }
    });
    
    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        const isLight = body.classList.contains('light-mode');
        const colors = isLight ? ['#ff69b4', '#ffb6c1', '#ffd1dc'] : ['#ffd700', '#c0c0c0', '#4a0e4e'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            animation: trailFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
    
    // Add trail animation
    if (!document.getElementById('trail-animations')) {
        const trailStyle = document.createElement('style');
        trailStyle.id = 'trail-animations';
        trailStyle.textContent = `
            @keyframes trailFade {
                0% {
                    opacity: 0.8;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.3);
                }
            }
        `;
        document.head.appendChild(trailStyle);
    }
    
    // Page load animations
    function initializePageAnimations() {
        // Animate main title
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) {
            mainTitle.style.opacity = '0';
            mainTitle.style.transform = 'translateY(50px) scale(0.8)';
            setTimeout(() => {
                mainTitle.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                mainTitle.style.opacity = '1';
                mainTitle.style.transform = 'translateY(0) scale(1)';
            }, 500);
        }
        
        // Animate subtitle
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(30px)';
            setTimeout(() => {
                subtitle.style.transition = 'all 0.8s ease-out';
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, 800);
        }
        
        // Animate magic text
        const magicText = document.querySelector('.magic-text');
        if (magicText) {
            setTimeout(() => {
                animateText(magicText);
            }, 1500);
        }
    }
    
    // Easter eggs
    let clickCount = 0;
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 5) {
                // Secret animation
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = 'pulse 0.5s ease-in-out 3';
                }, 100);
                
                // Create rainbow sparkles
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        createRainbowSparkle();
                    }, i * 50);
                }
                
                clickCount = 0;
            }
        });
    }
    
    function createRainbowSparkle() {
        const colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080'];
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: rainbowSparkle 2s ease-out forwards;
        `;
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }
    
    // Add rainbow sparkle animation
    if (!document.getElementById('rainbow-animations')) {
        const rainbowStyle = document.createElement('style');
        rainbowStyle.id = 'rainbow-animations';
        rainbowStyle.textContent = `
            @keyframes rainbowSparkle {
                0% {
                    opacity: 1;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(2) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(rainbowStyle);
    }
    
    // Initialize all effects
    createFloatingElements();
    initializePageAnimations();
    
    // Cleanup function for performance
    window.addEventListener('beforeunload', function() {
        // Clear all intervals and timeouts
        if (galleryInterval) clearInterval(galleryInterval);
        if (window.floatingInterval) clearInterval(window.floatingInterval);
    });
    
    console.log('🌸 Kamilia\'s Girly Art Paradise loaded successfully! 💖');
    console.log('✨ Current mode:', body.classList.contains('dark-mode') ? 'Dark' : 'Light');
    console.log('✨ Try clicking the title 5 times for a surprise! ✨');
    console.log('🎮 Use the toggle in the top right to switch modes!');
    
});

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const upBtn = document.querySelector('.up-btn');
    const downBtn = document.querySelector('.down-btn');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    upBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    downBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    // optional auto-play every 5s
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 5000);
});

let clickCount = 0;
  const star = document.getElementById('easterEgg');

  const message = document.createElement('div');
  message.classList.add('secret-message');
  message.innerText = 'meow vivi bark carti';
  star.appendChild(message);

  star.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
      message.style.display = 'block';
      // Optional: fade out after some time
      setTimeout(() => {
        message.style.display = 'none';
        clickCount = 0;
      }, 4000);
    }
  });