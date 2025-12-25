// 导航功能
function initNavigation() {
    // 智能导航栏隐藏/显示逻辑
    let lastScrollY = window.scrollY;
    const scrollThreshold = 150;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        const nav = document.querySelector('nav');
        
        const isScrollingDown = currentScrollY > lastScrollY;
        const isAtTop = currentScrollY < 10;
        
        window.requestAnimationFrame(() => {
            if (isAtTop) {
                nav.classList.remove('nav-hidden');
            } else if (isScrollingDown && currentScrollY > scrollThreshold) {
                nav.classList.add('nav-hidden');
            } else {
                nav.classList.remove('nav-hidden');
            }
        });
        
        lastScrollY = currentScrollY;
    });
    
    // 平滑滚动
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('nav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 移动端菜单
    initMobileMenu();
}

function initMobileMenu() {
    // 创建移动端菜单按钮
    const navContainer = document.querySelector('.nav-container');
    const mobileMenuBtn = document.createElement('button');
    
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.setAttribute('aria-label', '菜单');
    
    // 添加到导航栏
    navContainer.appendChild(mobileMenuBtn);
    
    // 移动端菜单样式
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #333;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 99;
            }
            
            .nav-links.active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .nav-links a {
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // 切换菜单
    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}