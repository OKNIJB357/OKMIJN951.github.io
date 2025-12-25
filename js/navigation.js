// 导航功能
function initNavigation() {
    // 智能导航栏隐藏/显示逻辑 (替换原有滚动监听代码)
let lastScrollY = window.scrollY; // 记录上一次滚动位置
const scrollThreshold = 150;
//滚动距离的敏感度阈值 (像素)，数值越小越敏感

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    const nav = document.querySelector('nav');
    
    // 1. 判断滚动方向（向下滚动：当前值 > 上一次值）
    const isScrollingDown = currentScrollY > lastScrollY;
    
    // 2. 判断是否超过“在顶部”的极小阈值
    const isAtTop = currentScrollY < 10;
    
    // 使用 requestAnimationFrame 确保动画流畅，避免性能问题
    window.requestAnimationFrame(() => {
        if (isAtTop) {
            // 情况A：在页面顶部 -> 确保导航栏完全显示且无隐藏状态
            nav.classList.remove('nav-hidden');
        } else if (isScrollingDown && currentScrollY > scrollThreshold) {
            // 情况B：明确向下滚动且超过敏感阈值 -> 添加隐藏类，触发CSS动画
            nav.classList.add('nav-hidden');
        } else {
            // 情况C：向上滚动 -> 移除隐藏类，导航栏滑回显示
            nav.classList.remove('nav-hidden');
        }
    });
    
    // 更新上一次滚动位置记录，用于下次比较
    lastScrollY = currentScrollY;
});
    
    // 平滑滚动
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