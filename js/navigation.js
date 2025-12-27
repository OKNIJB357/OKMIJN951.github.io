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
                }
            }
        });
    });
    
    // 移动端：移除移动端菜单初始化，因为导航链接始终显示
    // 删除 initMobileMenu() 调用
}

// 删除整个 initMobileMenu 函数