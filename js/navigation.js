// 导航功能
function initNavigation() {
    // 智能导航栏隐藏/显示逻辑
    let lastScrollY = window.scrollY;
    const scrollThreshold = 150;
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
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
    
    // 移动端：根据当前滚动位置更新导航链接
    function updateMobileNavLinks() {
        // 只在移动端执行
        if (window.innerWidth > 768) return;
        
        const aboutSection = document.querySelector('#about');
        const workSection = document.querySelector('#work');
        const contactSection = document.querySelector('#contact');
        
        const sections = [
            { element: heroSection, id: 'hero', top: 0, bottom: heroSection ? heroSection.offsetHeight : 0 },
            { element: aboutSection, id: 'about', top: aboutSection ? aboutSection.offsetTop : 0, bottom: aboutSection ? aboutSection.offsetTop + aboutSection.offsetHeight : 0 },
            { element: workSection, id: 'work', top: workSection ? workSection.offsetTop : 0, bottom: workSection ? workSection.offsetTop + workSection.offsetHeight : 0 },
            { element: contactSection, id: 'contact', top: contactSection ? contactSection.offsetTop : 0, bottom: contactSection ? contactSection.offsetTop + contactSection.offsetHeight : 0 }
        ];
        
        // 获取当前滚动位置
        const currentScroll = window.scrollY + 100; // 加上100px的偏移，让切换更平滑
        
        // 找到当前所在的板块
        let currentSection = 'hero'; // 默认为首页
        
        for (const section of sections) {
            if (section.element && currentScroll >= section.top && currentScroll < section.bottom) {
                currentSection = section.id;
                break;
            }
        }
        
        // 清空现有链接
        navLinks.innerHTML = '';
        
        // 根据当前板块添加相应的链接
        switch(currentSection) {
            case 'hero':
                // 首页横幅区域：只显示logo，不显示任何链接
                break;
            case 'about':
                // 关于我区域：显示"作品"和"联系"
                navLinks.innerHTML = `
                    <a href="#work">作品</a>
                    <a href="#contact">联系</a>
                `;
                break;
            case 'work':
                // 部分作品区域：显示"关于"和"联系"
                navLinks.innerHTML = `
                    <a href="#about">关于</a>
                    <a href="#contact">联系</a>
                `;
                break;
            case 'contact':
                // 期待您的联系区域：显示"关于"和"作品"
                navLinks.innerHTML = `
                    <a href="#about">关于</a>
                    <a href="#work">作品</a>
                `;
                break;
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
            
            // 移动端：更新导航链接
            updateMobileNavLinks();
        });
        
        lastScrollY = currentScrollY;
    });
    
    // 平滑滚动
    const navbar = document.querySelector('nav');
    
    // 使用事件委托处理导航链接点击
    document.addEventListener('click', function(e) {
        if (e.target.matches('.nav-links a')) {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            
            if (href.startsWith('#')) {
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
        }
    });
    
    // 页面加载完成后，如果用户没有滚动，设置一个延迟显示导航栏 - 修改为5秒
    window.addEventListener('load', function() {
        setTimeout(function() {
            // 如果用户还没有滚动，显示导航栏文字和logo
            if (!initialScrollTriggered) {
                nav.classList.remove('initial-hidden');
            }
        }, 5000); // 修改为5秒后显示（5000毫秒）
        
        // 初始化移动端导航链接
        updateMobileNavLinks();
    });
    
    // 点击页面任意位置也可以触发导航栏显示（可选）
    document.addEventListener('click', function() {
        if (!initialScrollTriggered) {
            nav.classList.remove('initial-hidden');
            initialScrollTriggered = true;
        }
    });
    
    // 窗口大小改变时，如果是移动端，更新导航链接
    window.addEventListener('resize', function() {
        // 如果是移动端，更新导航链接
        if (window.innerWidth <= 768) {
            updateMobileNavLinks();
        } else {
            // 桌面端：恢复原始链接
            const originalLinks = `
                <a href="#about">关于</a>
                <a href="#work">作品</a>
                <a href="#contact">联系</a>
            `;
            navLinks.innerHTML = originalLinks;
        }
    });
}