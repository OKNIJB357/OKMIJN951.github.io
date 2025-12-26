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
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    
    // 添加到导航栏
    navContainer.appendChild(mobileMenuBtn);
    
    // 移动端菜单样式 - 优化触摸区域
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #333;
            width: 44px;
            height: 44px;
            align-items: center;
            justify-content: center;
            z-index: 1001;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex;
            }
            
            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 999;
                max-height: calc(100vh - 70px);
                overflow-y: auto;
                -webkit-overflow-scrolling: touch; /* iOS 滚动优化 */
            }
            
            .nav-links.active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .nav-links a {
                padding: 14px 0;
                border-bottom: 1px solid #eee;
                font-size: 16px;
                width: 100%;
                text-align: left;
            }
            
            .nav-links a:last-child {
                border-bottom: none;
            }
            
            /* 防止背景滚动 */
            body.menu-open {
                overflow: hidden;
                position: fixed;
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // 切换菜单 - 优化移动端体验
    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        navLinks.classList.toggle('active');
        this.setAttribute('aria-expanded', !isExpanded);
        
        this.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        // 防止背景滚动
        document.body.classList.toggle('menu-open', navLinks.classList.contains('active'));
        
        // 移动端点击菜单项后自动关闭菜单
        if (navLinks.classList.contains('active')) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function closeMenu() {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.classList.remove('menu-open');
                    
                    // 移除事件监听器
                    this.removeEventListener('click', closeMenu);
                });
            });
        }
    });
    
    // 点击菜单外部关闭菜单
    document.addEventListener('click', function(e) {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.classList.remove('menu-open');
        }
    });
}