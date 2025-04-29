document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  
  // Create and set favicon
  const setFavicon = () => {
    // Create canvas for favicon
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Draw rounded rectangle background
    ctx.beginPath();
    ctx.rect(0, 0, 64, 64);
    ctx.fillStyle = '#4f46e5'; // indigo-600
    ctx.fill();
    
    // Draw chat bubble icon
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(16, 24, 3, 0, Math.PI * 2); // First dot
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(32, 24, 3, 0, Math.PI * 2); // Second dot
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(48, 24, 3, 0, Math.PI * 2); // Third dot
    ctx.fill();
    
    // Draw speech bubble outline
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.moveTo(12, 44);
    ctx.lineTo(20, 52);
    ctx.lineTo(28, 44);
    ctx.lineTo(52, 44);
    ctx.arc(52, 32, 12, Math.PI/2, 3*Math.PI/2, true);
    ctx.lineTo(12, 20);
    ctx.arc(12, 32, 12, 3*Math.PI/2, Math.PI/2, true);
    ctx.closePath();
    ctx.stroke();
    
    // Convert to favicon and set
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = canvas.toDataURL('image/png');
    document.head.appendChild(favicon);
  };
  
  // Run the favicon generator
  setFavicon();
  
  // Animation initialization function
  const initAnimations = () => {
    // Typing animation for LynqIt text instead of Connect
    const heroLynqIt = document.querySelector('.accent-underline.hero-gradient');
    if (heroLynqIt) {
      const text = heroLynqIt.textContent;
      heroLynqIt.innerHTML = '';
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroLynqIt.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, 150);
        }
      };
      setTimeout(typeWriter, 500);
    }
    
    // Animate tech cards on scroll
    const techCards = document.querySelectorAll('.tech-card');
    let delay = 0;
    techCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.dataset.delay = delay;
      delay += 150;
    });
    
    // Animate feature cards with hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        const icon = card.querySelector('.feature-icon');
        if (icon) icon.style.transform = 'scale(1.2)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        const icon = card.querySelector('.feature-icon');
        if (icon) icon.style.transform = 'scale(1)';
      });
    });
    
    // Floating animation for theme circles
    const themeCircles = document.querySelectorAll('.mt-8 .rounded-full');
    themeCircles.forEach((circle, index) => {
      circle.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite alternate`;
    });
    
    // Chat message animation
    const messages = document.querySelectorAll('.flex-1.p-4.overflow-auto.space-y-4 > div:not(.text-center)');
    messages.forEach((message, index) => {
      message.style.opacity = '0';
      message.style.transform = 'translateY(20px)';
      message.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
      }, 1000 + (index * 700));
    });
    
    // Add parallax effect to background blobs
    document.addEventListener('mousemove', (e) => {
      const blobs = document.querySelectorAll('.absolute.top-0.left-0.w-full.h-full div');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      blobs.forEach((blob, index) => {
        const speed = index % 2 === 0 ? 20 : -20;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        blob.style.transition = 'transform 0.2s ease-out';
      });
    });
    
    // Scroll animations for sections
    const handleScroll = () => {
      // Animate tech cards on scroll
      techCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (cardTop < triggerPoint) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, parseInt(card.dataset.delay));
        }
      });
      
      // Add pulse effect to titles when they enter viewport
      const titles = document.querySelectorAll('h2');
      titles.forEach(title => {
        const titleTop = title.getBoundingClientRect().top;
        if (titleTop < window.innerHeight * 0.8 && !title.classList.contains('animated')) {
          title.classList.add('animated');
          title.animate([
            { transform: 'scale(0.95)', opacity: 0.8 },
            { transform: 'scale(1.05)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 }
          ], {
            duration: 600,
            easing: 'ease-in-out'
          });
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger initial scroll check
    setTimeout(handleScroll, 100);
  };
  
  // Render the homepage
  app.innerHTML = `
    <style>
      /* Animation keyframes */
      @keyframes float {
        0% { transform: translateY(0); }
        100% { transform: translateY(-10px); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes glitch {
        0% {
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                      0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        }
        14% {
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                      0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        }
        15% {
          text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
        }
        49% {
          text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
        }
        50% {
          text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                      0.05em 0 0 rgba(0, 255, 0, 0.75),
                      0 -0.05em 0 rgba(0, 0, 255, 0.75);
        }
        99% {
          text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                      0.05em 0 0 rgba(0, 255, 0, 0.75),
                      0 -0.05em 0 rgba(0, 0, 255, 0.75);
        }
        100% {
          text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                      -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                      -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
        }
      }
      
      /* Animation classes */
      .animate-float {
        animation: float 3s ease-in-out infinite alternate;
      }
      
      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      .animate-fade-in {
        animation: fadeIn 1s ease-out forwards;
      }
      
      .animate-bounce-slow {
        animation: bounce 3s ease-in-out infinite;
      }
      
      /* Enhanced glitch effect */
      .glitch {
        position: relative;
        transition: text-shadow 0.3s ease;
      }
      
      .glitch:hover {
        animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
      }
      
      .glitch::before,
      .glitch::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.8;
      }
      
      .glitch::before {
        left: 2px;
        text-shadow: -1px 0 #ff00c1;
        clip: rect(44px, 450px, 56px, 0);
        animation: glitch-anim 5s infinite linear alternate-reverse;
      }
      
      .glitch::after {
        left: -2px;
        text-shadow: -1px 0 #00fff9, 1px 2px #ff00c1;
        animation: glitch-anim2 1s infinite linear alternate-reverse;
      }
      
      /* Button hover effects */
      .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      
      .btn-primary::before, .btn-secondary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: all 0.6s ease;
      }
      
      .btn-primary:hover::before, .btn-secondary:hover::before {
        left: 100%;
      }
      
      /* Feature icon animation */
      .feature-icon {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .feature-card:hover .feature-icon {
        transform: scale(1.2);
        box-shadow: 0 0 15px rgba(79, 70, 229, 0.6);
      }
      
      /* Tech stack cards animation */
      .tech-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .tech-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
      }
      
      /* Theme circle animation */
      .theme-number {
        position: relative;
      }
      
      .floating {
        animation: float 3s ease-in-out infinite alternate;
      }
      
      /* Chat interface animations */
      .messages-container > div {
        opacity: 0;
        transform: translateY(20px);
      }
      
      /* Enhanced glass effect */
      .glass {
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 
          0 4px 30px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.05),
          inset 0 0 5px rgba(255, 255, 255, 0.05);
        position: relative;
        overflow: hidden;
      }
      
      /* Add subtle shine to glass elements */
      .glass::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(
          circle at center,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 20%,
          rgba(255, 255, 255, 0) 60%
        );
        transform: rotate(-45deg);
        pointer-events: none;
        z-index: 0;
        animation: shineEffect 8s infinite linear;
      }
      
      /* Glass effect variations */
      .glass.header-glass {
        background: rgba(15, 23, 42, 0.7);
        backdrop-filter: blur(15px);
        border-bottom: 1px solid rgba(79, 70, 229, 0.2);
      }
      
      .glass.card-glass {
        background: rgba(15, 23, 42, 0.5);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(99, 102, 241, 0.15);
        transition: all 0.3s ease;
      }
      
      .glass.card-glass:hover {
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(99, 102, 241, 0.3);
        box-shadow: 
          0 8px 30px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
      }
      
      .gradient-border {
        position: relative;
        border-radius: 0.5rem;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(10px);
      }
      
      .gradient-border::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        background: linear-gradient(
          45deg, 
          rgba(99, 102, 241, 0.8),
          rgba(168, 85, 247, 0.4),
          rgba(236, 72, 153, 0.6),
          rgba(99, 102, 241, 0.8)
        );
        border-radius: 0.6rem;
        z-index: -1;
        filter: blur(4px);
        opacity: 0.7;
        animation: borderGlow 6s infinite linear;
      }
      
      @keyframes shineEffect {
        0% {
          opacity: 0.5;
          transform: rotate(-45deg) translateY(0%);
        }
        30% {
          opacity: 0.7;
        }
        50% {
          opacity: 0.3;
        }
        75% {
          opacity: 0.6;
        }
        100% {
          opacity: 0.5;
          transform: rotate(-45deg) translateY(100%);
        }
      }
      
      @keyframes borderGlow {
        0% {
          filter: blur(4px);
          opacity: 0.7;
        }
        50% {
          filter: blur(6px);
          opacity: 0.9;
        }
        100% {
          filter: blur(4px);
          opacity: 0.7;
        }
      }
      
      /* Tech cards enhanced glass effect */
      .tech-card {
        position: relative;
        background: rgba(15, 23, 42, 0.4);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        overflow: hidden;
      }
      
      .tech-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.08),
          transparent
        );
        transform: skewX(-15deg);
        transition: all 0.6s ease;
      }
      
      .tech-card:hover::after {
        left: 100%;
      }
    </style>
    
    <div class="grid-pattern min-h-screen">
      <header class="py-4 px-6 flex justify-between items-center glass header-glass sticky top-0 z-50">
        <div class="flex items-center space-x-2">
          <a href="#" class="flex items-center space-x-2" title="Go to homepage">
            <div class="relative w-10 h-10 flex items-center justify-center">
              <div class="absolute inset-0 bg-indigo-600 rounded-lg opacity-20 animate-pulse"></div>
              <svg class="w-8 h-8 text-indigo-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
            <h1 class="text-3xl font-bold glitch" data-text="LynqIt">LynqIt</h1>
          </a>
        </div>
        <nav>
          <ul class="flex space-x-6">
            <li><a href="#features" class="hover:text-indigo-400 transition">Features</a></li>
            <li><a href="#themes" class="hover:text-indigo-400 transition">Themes</a></li>
            <li><a href="#roadmap" class="hover:text-indigo-400 transition">Roadmap</a></li>
            <li><a href="http://localhost:5173/login" class="glass hover:bg-indigo-700/50 px-5 py-2 rounded-lg transition">Login</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <!-- Hero Section -->
        <section class="py-20 px-6 max-w-6xl mx-auto text-center relative">
          <div class="absolute top-0 left-0 w-full h-full">
            <div class="absolute top-20 left-10 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl"></div>
            <div class="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-bold mb-6" data-aos="fade-up">
            <span class="hero-gradient">Connect</span> in Real-Time with <span class="hero-gradient accent-underline">LynqIt</span>
          </h1>
          <p class="text-xl text-gray-300 mb-10 max-w-3xl mx-auto text-balance" data-aos="fade-up" data-aos-delay="100">
            A powerful messaging platform built with <span class="text-indigo-400">MERN stack</span>, <span class="text-purple-400">Socket.io</span>, and modern UI tools for seamless real-time communication.
          </p>
          
          <div class="flex flex-wrap justify-center gap-6" data-aos="fade-up" data-aos-delay="200">
            <button onclick="window.location.href='http://localhost:5173/signup'" class="btn-primary px-8 py-3 rounded-lg text-lg font-semibold">
              <i class="fas fa-rocket mr-2"></i> Get Started
            </button>
            <button class="btn-secondary px-8 py-3 rounded-lg text-lg font-semibold">
              <i class="fas fa-info-circle mr-2"></i> Learn More
            </button>
          </div>
          
          <div class="mt-16 relative" data-aos="zoom-in" data-aos-delay="300">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10"></div>
            <div class="rounded-xl shadow-2xl glow mx-auto gradient-border overflow-hidden">
              <div class="bg-white p-3">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div class="text-sm text-gray-500">LynqIt Messenger</div>
                  <div class="w-8"></div>
                </div>
                
                <div class="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <div class="flex h-[500px]">
                    <!-- Sidebar -->
                    <div class="w-[260px] bg-gray-100 flex flex-col border-r border-gray-200">
                      <!-- Chats header -->
                      <div class="p-4 border-b border-gray-200">
                        <div class="flex items-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h10" />
                          </svg>
                          <h2 class="ml-2 text-xl font-medium text-gray-800">Chats</h2>
                        </div>
                        
                        <div class="flex items-center text-gray-600">
                          <input type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 rounded mr-2" />
                          <label class="text-sm">Show online only</label>
                          <span class="text-xs text-gray-400 ml-1">(3 online)</span>
                        </div>
                      </div>
                      
                      <!-- Chat list -->
                      <div class="overflow-auto flex-1">
                        <!-- Selected chat -->
                        <div class="bg-gray-200 p-4 flex items-center cursor-pointer">
                          <div class="relative">
                            <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              AB
                            </div>
                            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-200"></div>
                          </div>
                          <div class="ml-3">
                            <div class="font-medium text-gray-900">ALBERT</div>
                            <div class="text-sm text-green-600">Online</div>
                          </div>
                        </div>
                        
                        <!-- Other chats -->
                        <div class="hover:bg-gray-100 p-4 flex items-center cursor-pointer border-b border-gray-100">
                          <div class="relative">
                            <div class="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                              SM
                            </div>
                            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div class="ml-3 flex-1">
                            <div class="font-medium text-gray-900 flex justify-between">
                              <span>Sarah Miller</span>
                              <span class="text-xs text-gray-500">12m</span>
                            </div>
                            <div class="text-sm text-gray-500 truncate">Hey, are you coming to the party tonight?</div>
                          </div>
                        </div>
                        
                        <div class="hover:bg-gray-100 p-4 flex items-center cursor-pointer border-b border-gray-100">
                          <div class="relative">
                            <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                              JT
                            </div>
                            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div class="ml-3 flex-1">
                            <div class="font-medium text-gray-900 flex justify-between">
                              <span>Jake Thompson</span>
                              <span class="text-xs text-gray-500">25m</span>
                            </div>
                            <div class="text-sm text-gray-500 truncate">Did you see that new movie? It was awesome!</div>
                          </div>
                        </div>
                        
                        <div class="hover:bg-gray-100 p-4 flex items-center cursor-pointer border-b border-gray-100">
                          <div class="relative">
                            <div class="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                              MM
                            </div>
                          </div>
                          <div class="ml-3 flex-1">
                            <div class="font-medium text-gray-900 flex justify-between">
                              <span>Maria Martinez</span>
                              <span class="text-xs text-gray-500">2h</span>
                            </div>
                            <div class="text-sm text-gray-500 truncate">Thanks for the help with my homework!</div>
                          </div>
                        </div>
                        
                        <div class="hover:bg-gray-100 p-4 flex items-center cursor-pointer border-b border-gray-100">
                          <div class="relative">
                            <div class="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                              KC
                            </div>
                          </div>
                          <div class="ml-3 flex-1">
                            <div class="font-medium text-gray-900 flex justify-between">
                              <span>Kevin Chen</span>
                              <span class="text-xs text-gray-500">1d</span>
                            </div>
                            <div class="text-sm text-gray-500 truncate">We should go hiking this weekend!</div>
                          </div>
                          <div class="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-xs text-white font-medium">
                            2
                          </div>
                        </div>
                        
                        <div class="hover:bg-gray-100 p-4 flex items-center cursor-pointer">
                          <div class="relative">
                            <div class="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                              LW
                            </div>
                          </div>
                          <div class="ml-3 flex-1">
                            <div class="font-medium text-gray-900 flex justify-between">
                              <span>Liam Wilson</span>
                              <span class="text-xs text-gray-500">3d</span>
                            </div>
                            <div class="text-sm text-gray-500 truncate">Check out this cool playlist I made</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Chat area -->
                    <div class="flex-1 flex flex-col bg-white">
                      <!-- Chat header -->
                      <div class="border-b border-gray-200 p-4 flex items-center justify-between">
                        <div class="flex items-center">
                          <div class="relative mr-3">
                            <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              AB
                            </div>
                            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <div class="font-medium text-gray-900">ALBERT</div>
                            <div class="text-sm text-green-600">Online</div>
                          </div>
                        </div>
                        <button class="text-gray-400 hover:text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <!-- Messages area with dummy messages -->
                      <div class="flex-1 p-4 overflow-auto space-y-4">
                        <!-- Time indicator -->
                        <div class="text-center text-xs text-gray-500 my-2">Today, 10:30 AM</div>
                        
                        <!-- Received message -->
                        <div class="flex items-start space-x-2">
                          <div class="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                            AB
                          </div>
                          <div class="flex flex-col">
                            <div class="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-xs sm:max-w-md">
                              <p class="text-gray-800">Hey! How was your weekend? Did you go to that new restaurant you mentioned?</p>
                            </div>
                            <span class="text-xs text-gray-500 mt-1">10:30 AM</span>
                          </div>
                        </div>
                        
                        <!-- Sent message -->
                        <div class="flex items-start justify-end space-x-2">
                          <div class="flex flex-col items-end">
                            <div class="bg-indigo-500 text-white rounded-2xl rounded-tr-none p-3 max-w-xs sm:max-w-md">
                              <p>Yeah, it was awesome! The food was amazing. We should definitely go there together sometime! 😋</p>
                            </div>
                            <span class="text-xs text-gray-500 mt-1">10:32 AM</span>
                          </div>
                        </div>
                        
                        <!-- Received message with image attachment -->
                        <div class="flex items-start space-x-2">
                          <div class="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                            AB
                          </div>
                          <div class="flex flex-col">
                            <div class="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-xs sm:max-w-md">
                              <p class="text-gray-800 mb-2">Cool! I'm free this weekend. Also, check out this photo from the concert last night! 🎸</p>
                              <div class="w-full rounded-lg overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Concert photo" class="w-full h-full object-cover" />
                              </div>
                            </div>
                            <span class="text-xs text-gray-500 mt-1">10:40 AM</span>
                          </div>
                        </div>
                        
                        <!-- Typing indicator -->
                        <div class="flex items-start space-x-2">
                          <div class="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                            AB
                          </div>
                          <div class="bg-gray-100 rounded-xl rounded-tl-none py-3 px-4">
                            <div class="flex space-x-1">
                              <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                              <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.1s"></div>
                              <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Message input -->
                      <div class="p-4 border-t border-gray-200">
                        <div class="flex items-center">
                          <input type="text" placeholder="Type a message..." class="flex-1 border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                          <button class="bg-gray-200 hover:bg-gray-300 p-3 rounded-r-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button class="bg-indigo-500 hover:bg-indigo-600 p-3 rounded-lg ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3/4">
              <div class="futuristic-line"></div>
            </div>
          </div>
        </section>

        <!-- Tech Stack Section -->
        <section class="py-16 px-6 glass my-20">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold mb-3 text-center" data-aos="fade-up">
              <span class="accent-underline hero-gradient">Powered</span> by Modern Technology
            </h2>
            <p class="text-xl text-center text-gray-300 mb-16 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Built with cutting-edge tools for performance, reliability, and exceptional user experience
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center" data-aos="fade-up" data-aos-delay="200">
              <div class="tech-card p-8 rounded-xl">
                <div class="mb-5 flex justify-center">
                  <div class="feature-icon w-16 h-16 bg-indigo-600/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-database text-2xl text-indigo-500"></i>
                  </div>
                </div>
                <h3 class="text-xl font-semibold mb-2">MERN Stack</h3>
                <p class="text-gray-300">MongoDB, Express, React, and Node.js for a powerful full-stack solution</p>
              </div>
              
              <div class="tech-card p-8 rounded-xl">
                <div class="mb-5 flex justify-center">
                  <div class="feature-icon w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-plug text-2xl text-blue-500"></i>
                  </div>
                </div>
                <h3 class="text-xl font-semibold mb-2">Socket.io</h3>
                <p class="text-gray-300">Enabling real-time, bidirectional communication between clients</p>
              </div>
              
              <div class="tech-card p-8 rounded-xl">
                <div class="mb-5 flex justify-center">
                  <div class="feature-icon w-16 h-16 bg-teal-600/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-paint-brush text-2xl text-teal-500"></i>
                  </div>
                </div>
                <h3 class="text-xl font-semibold mb-2">TailwindCSS + Daisy UI</h3>
                <p class="text-gray-300">Modern, responsive interface with beautiful components</p>
              </div>
              
              <div class="tech-card p-8 rounded-xl">
                <div class="mb-5 flex justify-center">
                  <div class="feature-icon w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-cubes text-2xl text-purple-500"></i>
                  </div>
                </div>
                <h3 class="text-xl font-semibold mb-2">Zustand</h3>
                <p class="text-gray-300">Global state management that's simple yet effective</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-20 px-6">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold mb-4 text-center" data-aos="fade-up">
              <span class="hero-gradient accent-underline">Key Features</span>
            </h2>
            <p class="text-xl text-center text-gray-300 mb-16 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Everything you need for seamless communication in one platform
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="feature-card glass card-glass p-8 rounded-xl" data-aos="fade-up" data-aos-delay="200">
                <div class="w-16 h-16 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-6 feature-icon">
                  <i class="fas fa-comment-dots text-2xl text-indigo-500"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">Real-Time Messaging</h3>
                <p class="text-gray-300">Instantly connect with friends and colleagues with zero delay in message delivery</p>
              </div>
              
              <div class="feature-card glass card-glass p-8 rounded-xl" data-aos="fade-up" data-aos-delay="300">
                <div class="w-16 h-16 bg-green-600/20 rounded-xl flex items-center justify-center mb-6 feature-icon">
                  <i class="fas fa-palette text-2xl text-green-500"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">32 Beautiful Themes</h3>
                <p class="text-gray-300">Customize your experience with a variety of color themes to match your style</p>
              </div>
              
              <div class="feature-card glass card-glass p-8 rounded-xl" data-aos="fade-up" data-aos-delay="400">
                <div class="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6 feature-icon">
                  <i class="fas fa-photo-video text-2xl text-purple-500"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">Media Sharing</h3>
                <p class="text-gray-300">Share images, videos, and files seamlessly within your conversations</p>
              </div>
              
              <div class="feature-card glass card-glass p-8 rounded-xl" data-aos="fade-up" data-aos-delay="500">
                <div class="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6 feature-icon">
                  <i class="fas fa-user-check text-2xl text-blue-500"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">Online Status</h3>
                <p class="text-gray-300">Know when your contacts are online and available to chat</p>
              </div>
              
              <div class="feature-card glass card-glass p-8 rounded-xl" data-aos="fade-up" data-aos-delay="600">
                <div class="w-16 h-16 bg-red-600/20 rounded-xl flex items-center justify-center mb-6 feature-icon">
                  <i class="fas fa-shield-alt text-2xl text-red-500"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">JWT Authentication</h3>
                <p class="text-gray-300">Secure authentication system ensuring your conversations remain private</p>
              </div>
              
              <div class="feature-card glass card-glass p-8 rounded-xl" data-aos="fade-up" data-aos-delay="700">
                <div class="w-16 h-16 bg-yellow-600/20 rounded-xl flex items-center justify-center mb-6 feature-icon">
                  <i class="fas fa-bug-slash text-2xl text-yellow-500"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">Error Handling</h3>
                <p class="text-gray-300">Robust error handling system on both client and server sides</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Themes Section -->
        <section id="themes" class="py-20 px-6 glass my-20">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold mb-4 text-center" data-aos="fade-up">
              <span class="accent-underline hero-gradient">Personalize</span> Your Experience
            </h2>
            <p class="text-xl text-center text-gray-300 mb-16 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Choose from a wide range of themes to customize your messaging interface
            </p>
            
            <div class="flex justify-center items-center" data-aos="zoom-in" data-aos-delay="200">
              <div class="text-center p-10 glass gradient-border max-w-2xl">
                <div class="theme-number text-9xl font-bold mb-6 floating">32</div>
                <p class="text-2xl text-gray-300">Unique themes to match your style</p>
                <p class="mt-4 text-gray-400">From dark to light, vibrant to subtle, find the perfect look for your conversations</p>
                <div class="mt-8 flex flex-wrap justify-center gap-4">
                  <span class="inline-block w-10 h-10 rounded-full bg-indigo-500 transition-transform hover:scale-110 cursor-pointer"></span>
                  <span class="inline-block w-10 h-10 rounded-full bg-purple-500 transition-transform hover:scale-110 cursor-pointer"></span>
                  <span class="inline-block w-10 h-10 rounded-full bg-pink-500 transition-transform hover:scale-110 cursor-pointer"></span>
                  <span class="inline-block w-10 h-10 rounded-full bg-blue-500 transition-transform hover:scale-110 cursor-pointer"></span>
                  <span class="inline-block w-10 h-10 rounded-full bg-green-500 transition-transform hover:scale-110 cursor-pointer"></span>
                  <span class="inline-block w-10 h-10 rounded-full bg-yellow-500 transition-transform hover:scale-110 cursor-pointer"></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Roadmap Section -->
        <section id="roadmap" class="py-20 px-6">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold mb-4 text-center" data-aos="fade-up">
              <span class="hero-gradient accent-underline">Future Roadmap</span>
            </h2>
            <p class="text-xl text-center text-gray-300 mb-16 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Exciting features we're working on to make LynqIt even better
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div class="feature-card glass p-8 rounded-xl" data-aos="fade-up" data-aos-delay="200">
                <div class="w-16 h-16 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-6 feature-icon">
                  <i class="fas fa-users text-2xl text-indigo-500"></i>
                </div>
                <div class="inline-block px-3 py-1 bg-indigo-900/50 text-indigo-300 text-xs rounded-full mb-4">Coming Soon</div>
                <h3 class="text-xl font-semibold mb-3">Group Chatting</h3>
                <p class="text-gray-300">Create and manage group conversations with multiple participants. Share ideas, plan events, and collaborate seamlessly.</p>
              </div>
              
              <div class="feature-card glass p-8 rounded-xl" data-aos="fade-up" data-aos-delay="300">
                <div class="w-16 h-16 bg-green-600/20 rounded-xl flex items-center justify-center mb-6 feature-icon">
                  <i class="fas fa-video text-2xl text-green-500"></i>
                </div>
                <div class="inline-block px-3 py-1 bg-green-900/50 text-green-300 text-xs rounded-full mb-4">In Development</div>
                <h3 class="text-xl font-semibold mb-3">Voice/Video Calling</h3>
                <p class="text-gray-300">One-to-one and group calling capabilities for more interactive communication with crystal-clear audio and HD video quality.</p>
              </div>
              
              <div class="feature-card glass p-8 rounded-xl" data-aos="fade-up" data-aos-delay="400">
                <div class="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6 feature-icon">
                  <i class="fas fa-robot text-2xl text-purple-500"></i>
                </div>
                <div class="inline-block px-3 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full mb-4">Planned</div>
                <h3 class="text-xl font-semibold mb-3">AI Integration</h3>
                <p class="text-gray-300">Smart assistants and AI-powered features to enhance your messaging experience with intelligent responses and automation.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 px-6 glass my-20">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-5xl font-bold mb-6" data-aos="fade-up">Ready to Connect?</h2>
            <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Join LynqIt today and experience the future of real-time communication</p>
            
            <div class="flex flex-wrap justify-center gap-6" data-aos="fade-up" data-aos-delay="200">
              <button onclick="window.location.href='http://localhost:5173/signup'" class="btn-primary px-8 py-4 rounded-lg text-lg font-semibold">
                <i class="fas fa-user-plus mr-2"></i> Sign Up Now
              </button>
              <button class="btn-secondary px-8 py-4 rounded-lg text-lg font-semibold">
                <i class="fas fa-book-open mr-2"></i> Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer class="py-14 px-6 glass">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-col md:flex-row justify-between items-center mb-10">
            <div class="flex items-center space-x-2 mb-6 md:mb-0">
              <a href="#" class="flex items-center space-x-2" title="Go to homepage">
                <div class="relative w-10 h-10 flex items-center justify-center">
                  <div class="absolute inset-0 bg-indigo-600 rounded-lg opacity-20"></div>
                  <svg class="w-8 h-8 text-indigo-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <h1 class="text-2xl font-bold hero-gradient">LynqIt</h1>
              </a>
            </div>
            
            <div>
              <nav>
                <ul class="flex flex-wrap justify-center gap-6">
                  <li><a href="#features" class="hover:text-indigo-400 transition">Features</a></li>
                  <li><a href="#themes" class="hover:text-indigo-400 transition">Themes</a></li>
                  <li><a href="#roadmap" class="hover:text-indigo-400 transition">Roadmap</a></li>
                  <li><a href="#" class="hover:text-indigo-400 transition">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
          
          <div class="border-t border-gray-700 pt-6 text-center text-gray-400">
            <p>&copy; 2025 LynqIt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `;
  
  // Initialize animations after DOM is fully loaded
  setTimeout(initAnimations, 100);
}); 