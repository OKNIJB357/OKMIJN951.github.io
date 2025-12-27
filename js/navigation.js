// 导航功能
function initNavigation() {
    // 智能导航栏隐藏/显示逻辑
    let lastScrollY = window.scrollY;
    const scrollThreshold = 150;
    const nav = document.querySelector('nav');
    
    // 获取首页横幅元素
    const heroSection = document.querySelector('.hero');
    
    // 初始状态：页面加载时添加透明类
    nav.classList.add('transparent');
    
    // 检查是否在首页横幅区域
    function checkHeroVisibility() {
        if (!heroSection) return;
        
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        
        // 如果导航栏在首页横幅区域内，保持透明效果
        if (heroBottom > 0 && window.scrollY < heroRect.height) {
            nav.classList.add('transparent');
        } else {
            nav.classList.remove('transparent');
        }
    }
    
    // 初始检查
    checkHeroVisibility();
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        const isScrollingDown = currentScrollY > lastScrollY;
        const isAtTop = currentScrollY < 10;
        
        window.requestAnimationFrame(() => {
            // 检查是否在首页横幅区域
            checkHeroVisibility();
            
            // 导航栏隐藏/显示逻辑
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
                    
                    // 移动端：关闭菜单
                    if (window.innerWidth <= 768) {
                        closeMobileMenu();
                    }
                }
            }
        });
    });
    
    // 移动端菜单
    initMobileMenu();
}

function initMobileMenu() {
    // 直接使用HTML中已有的按钮（不再动态创建）
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = navLinks.querySelectorAll('a');
    
    // 为每个链接添加索引，用于延迟动画
    links.forEach((link, index) => {
        link.style.setProperty('--i', index);
    });
    
    // 切换菜单函数
    function toggleMenu() {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        
        // 阻止背景滚动
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    // 关闭菜单函数
    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    // 点击汉堡菜单
    mobileMenuBtn.addEventListener('click', toggleMenu);
    
    // 点击导航链接 - 移动端会关闭菜单
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                setTimeout(closeMobileMenu, 300); // 延迟关闭，让滚动动画先开始
            }
        });
    });
    
    // 点击菜单外部关闭菜单
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn')) {
            closeMobileMenu();
        }
    });
    
    // 窗口大小调整时，如果切换到桌面端，重置菜单状态
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}