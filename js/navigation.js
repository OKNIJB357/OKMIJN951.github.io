// 导航功能
function initNavigation() {
    // 智能导航栏隐藏/显示逻辑
    let lastScrollY = window.scrollY;
    const scrollThreshold = 150;
    const nav = document.querySelector('nav');
    
    // 获取首页横幅元素
    const heroSection = document.querySelector('.hero');
    
    // 初始状态：页面加载时添加初始隐藏类和透明类
    nav.classList.add('initial-hidden', 'transparent');
    
    // 检查是否在首页横幅区域
    function checkHeroVisibility() {
        if (!heroSection) return;
        
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        
        // 如果导航栏在首页横幅区域内，保持透明效果
        if (heroBottom > 0 && window.scrollY < heroRect.height) {
            nav.classList.add('transparent');
            // 在首页横幅区域内，移除矩形框背景，但保持文字可见
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0)';
            nav.style.backdropFilter = 'none';
            nav.style.borderBottom = '1px solid transparent';
        } else {
            nav.classList.remove('transparent');
            // 离开首页横幅区域，显示矩形框背景
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
        }
    }
    
    // 初始检查
    checkHeroVisibility();
    
    let initialScrollTriggered = false;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        const isScrollingDown = currentScrollY > lastScrollY;
        const isAtTop = currentScrollY < 10;
        
        window.requestAnimationFrame(() => {
            // 检查是否在首页横幅区域
            checkHeroVisibility();
            
            // 首次滚动时移除初始隐藏类
            if (!initialScrollTriggered && currentScrollY > 5) {
                nav.classList.remove('initial-hidden');
                initialScrollTriggered = true;
            }
            
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
                    
                    // 移动端：不需要关闭菜单（因为菜单始终显示）
                }
            }
        });
    });
    
    // 页面加载完成后，如果用户没有滚动，设置一个延迟显示导航栏
    window.addEventListener('load', function() {
        setTimeout(function() {
            // 如果用户还没有滚动，显示导航栏文字和logo
            if (!initialScrollTriggered) {
                nav.classList.remove('initial-hidden');
            }
        }, 1000); // 1秒后显示
    });
    
    // 点击页面任意位置也可以触发导航栏显示（可选）
    document.addEventListener('click', function() {
        if (!initialScrollTriggered) {
            nav.classList.remove('initial-hidden');
            initialScrollTriggered = true;
        }
    });
}