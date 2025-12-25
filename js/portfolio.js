// 作品集功能 - 带律动感的筛选动画
function initPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentFilter = 'brand'; // 当前激活的过滤器

    // 为每个按钮绑定点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetFilter = this.getAttribute('data-filter');
            
            // 如果点击的是当前已激活的按钮，则不执行任何操作
            if (targetFilter === currentFilter) return;
            
            // 1. 更新按钮的激活状态（视觉反馈）
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 2. 执行项目切换动画
            switchPortfolioItems(targetFilter);
            
            // 3. 更新当前过滤器状态
            currentFilter = targetFilter;
        });
    });
    
    // 作品集模态框功能（保持不变）
    initPortfolioModal();
}

// 切换作品项的核心动画函数
function switchPortfolioItems(targetFilter) {
    const allItems = document.querySelectorAll('.portfolio-item');
    const outgoingItems = document.querySelectorAll(`.portfolio-item[data-category="${currentFilter}"]`);
    const incomingItems = document.querySelectorAll(`.portfolio-item[data-category="${targetFilter}"]`);
    
    // 第一步：当前显示的项目淡出
    outgoingItems.forEach((item, index) => {
        // 为每个项目设置一个递增的延迟，形成波浪式消失效果
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px) scale(0.98)';
        }, index * 60); // 每个项目间隔60ms开始动画
    });
    
    // 第二步：短暂等待淡出完成后，切换显示并淡入新项目
    setTimeout(() => {
        // 隐藏所有旧项目
        allItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // 显示并准备淡入新项目
        incomingItems.forEach(item => {
            item.style.display = 'block';
            // 重置初始状态（透明且略微靠下）
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px) scale(0.98)';
        });
        
        // 强制浏览器重绘，确保初始状态被应用
        void incomingItems[0]?.offsetHeight;
        
        // 第三步：新项目交错淡入（律动感关键）
        incomingItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 80 + 50); // 每个项目间隔80ms开始动画，并有50ms的基础延迟
        });
        
    }, outgoingItems.length * 60 + 150); // 等待时间 = 淡出动画总时间 + 额外缓冲
}

// 模态框功能（保持你原有的 initPortfolioModal 函数不变，此处省略以节省篇幅）
function initPortfolioModal() { /* ... 你原来的代码 ... */ }