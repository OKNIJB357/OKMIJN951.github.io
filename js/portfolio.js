// 作品集功能 - 更新以支持新的分类结构
function initPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCategories = document.querySelectorAll('.portfolio-category');
    let currentFilter = 'brand';
    
    // 初始化：只显示品牌设计
    portfolioCategories.forEach(category => {
        if (category.dataset.category === 'brand') {
            category.style.display = 'block';
            // 立即将分类容器设置为可见
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
            
            // 获取该分类下的所有项目
            const portfolioItems = category.querySelectorAll('.portfolio-item');
            // 获取该分类下的"查看更多"链接
            const moreLink = category.querySelector('.category-more-link');
            
            // 页面加载时，让项目和"查看更多"链接一起显示
            setTimeout(() => {
                // 将所有需要动画的元素收集起来
                const allAnimatedElements = [...portfolioItems];
                if (moreLink) allAnimatedElements.push(moreLink);
                
                // 为每个元素设置初始状态
                allAnimatedElements.forEach(el => {
                    el.style.opacity = '0';
                    if (el.classList.contains('portfolio-item')) {
                        el.style.transform = 'translateY(15px) scale(0.98)';
                    } else {
                        el.style.transform = 'translateY(20px)';
                    }
                });
                
                // 强制重绘
                if (allAnimatedElements[0]) {
                    void allAnimatedElements[0].offsetHeight;
                }
                
                // 交错淡入动画 - 所有元素一起动画
                allAnimatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        if (el.classList.contains('portfolio-item')) {
                            el.style.transform = 'translateY(0) scale(1)';
                        } else {
                            el.style.transform = 'translateY(0)';
                        }
                    }, index * 50); // 50ms间隔，快速连续显示
                });
                
            }, 100); // 页面加载后延迟100ms开始动画
            
        } else {
            category.style.display = 'none';
            category.style.opacity = '0';
            category.style.transform = 'translateY(20px)';
            
            // 隐藏其他分类的"查看更多"链接
            const moreLink = category.querySelector('.category-more-link');
            if (moreLink) {
                moreLink.style.opacity = '0';
                moreLink.style.transform = 'translateY(20px)';
            }
        }
    });

    // 为每个按钮绑定点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetFilter = this.getAttribute('data-filter');
            
            if (targetFilter === currentFilter) return;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            switchPortfolioCategories(targetFilter, portfolioCategories, currentFilter);
            currentFilter = targetFilter;
        });
    });
    
    initPortfolioModal();
}

// 切换作品分类
function switchPortfolioCategories(targetFilter, allCategories, currentFilter) {
    const outgoingCategory = document.querySelector(`.portfolio-category[data-category="${currentFilter}"]`);
    const incomingCategory = document.querySelector(`.portfolio-category[data-category="${targetFilter}"]`);
    
    if (!outgoingCategory || !incomingCategory) return;
    
    // 淡出当前分类
    outgoingCategory.style.opacity = '0';
    outgoingCategory.style.transform = 'translateY(20px)';
    
    // 隐藏当前分类的"查看更多"链接
    const outgoingMoreLink = outgoingCategory.querySelector('.category-more-link');
    if (outgoingMoreLink) {
        outgoingMoreLink.style.opacity = '0';
        outgoingMoreLink.style.transform = 'translateY(20px)';
    }
    
    // 短暂延迟后切换显示
    setTimeout(() => {
        outgoingCategory.style.display = 'none';
        incomingCategory.style.display = 'block';
        
        // 强制重绘
        void incomingCategory.offsetHeight;
        
        // 淡入新分类
        incomingCategory.style.opacity = '1';
        incomingCategory.style.transform = 'translateY(0)';
        
        // 为新分类中的网格项和"查看更多"链接添加交互动画
        const portfolioItems = incomingCategory.querySelectorAll('.portfolio-item');
        const moreLink = incomingCategory.querySelector('.category-more-link');
        
        // 将所有需要动画的元素收集起来
        const allAnimatedElements = [...portfolioItems];
        if (moreLink) allAnimatedElements.push(moreLink);
        
        // 为每个元素设置初始状态
        allAnimatedElements.forEach(el => {
            el.style.opacity = '0';
            if (el.classList.contains('portfolio-item')) {
                el.style.transform = 'translateY(15px) scale(0.98)';
            } else {
                el.style.transform = 'translateY(20px)';
            }
        });
        
        // 强制重绘以启动动画
        if (allAnimatedElements[0]) {
            void allAnimatedElements[0].offsetHeight;
        }
        
        // 交错淡入动画 - 所有元素一起动画
        allAnimatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                if (el.classList.contains('portfolio-item')) {
                    el.style.transform = 'translateY(0) scale(1)';
                } else {
                    el.style.transform = 'translateY(0)';
                }
            }, index * 60); // 60ms间隔，让所有元素快速连续显示
        });
        
    }, 300);
}

// 作品集模态框功能 - 修改为更缓慢优雅的动画
function initPortfolioModal() {
    // 创建模态框结构
    const modalHTML = `
        <div class="portfolio-modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 模态框样式 - 修改为更缓慢优雅的动画
    const style = document.createElement('style');
    style.textContent = `
        /* 模态框基础样式 */
        .portfolio-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .portfolio-modal.active {
            display: block;
            opacity: 1;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(15px); /* 增加模糊程度 */
            opacity: 0;
            transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1); /* 延长动画时间 */
        }
        
        .portfolio-modal.active .modal-overlay {
            opacity: 1;
        }
        
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.95);
            background: white;
            width: 90%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 8px; /* 统一为小圆角 */
            padding: 50px; /* 增加内边距 */
            opacity: 0;
            transition: all 0.9s cubic-bezier(0.4, 0, 0.2, 1); /* 延长动画时间 */
        }
        
        .portfolio-modal.active .modal-content {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        
        /* 修改关闭按钮 - 取消悬停动画 */
        .modal-close {
            position: absolute;
            top: 25px;
            right: 25px;
            background: none;
            border: none;
            font-size: 2.5rem; /* 增大关闭按钮 */
            cursor: pointer;
            color: #333;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease; /* 简化过渡效果 */
            z-index: 10;
            background-color: rgba(255, 255, 255, 0.9);
        }
        
        /* 移除关闭按钮的旋转和缩放动画 */
        .modal-close:hover {
            background-color: #f5f5f5;
            /* 移除原有的旋转和缩放效果 */
            transform: none;
        }
        
        .design-thought {
            margin-bottom: 25px;
            line-height: 1.7;
            color: #555;
            font-size: 1.05rem;
        }
        
        .modal-image-container {
            margin: 30px 0;
            text-align: center;
            overflow: hidden;
            border-radius: 8px; /* 统一小圆角 */
        }
        
        .modal-image-container img {
            width: 100%;
            max-height: 450px; /* 增加最大高度 */
            object-fit: cover;
            border-radius: 8px; /* 统一小圆角 */
            transform: scale(1.05);
            transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1); /* 延长动画时间 */
        }
        
        .portfolio-modal.active .modal-image-container img {
            transform: scale(1);
        }
        
        /* 内容淡入动画 - 修改为更缓慢优雅的效果 */
        .modal-body h2,
        .modal-body p,
        .design-thought-section,
        .modal-image-container,
        .baidu-link {
            opacity: 0;
            transform: translateY(30px); /* 增加初始偏移 */
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); /* 延长动画时间 */
        }
        
        .portfolio-modal.active .modal-body h2 {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.2s; /* 增加延迟 */
        }
        
        .portfolio-modal.active .modal-body p {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.3s; /* 增加延迟 */
        }
        
        .portfolio-modal.active .design-thought-section {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.4s; /* 增加延迟 */
        }
        
        .portfolio-modal.active .modal-image-container {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.5s; /* 增加延迟 */
        }
        
        .portfolio-modal.active .baidu-link {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.6s; /* 增加延迟 */
        }
        
        .design-thought-section {
            margin-bottom: 30px;
            padding: 25px;
            background-color: #f9f9f9;
            border-radius: 8px; /* 统一小圆角 */
            border-left: 4px solid #333;
        }
        
        .design-thought-section h3 {
            margin-bottom: 15px;
            font-size: 1.3rem;
            color: #333;
            font-weight: 500;
        }
        
        .baidu-link {
            display: block;
            text-align: center;
            margin-top: 40px;
            padding-top: 25px;
            border-top: 1px solid #eee;
        }
        
        /* 修改模态框内的链接样式为与"查看更多"一致的无边框下划线样式 */
        .baidu-link a {
            display: inline-block;
            padding: 15px 0;
            background: transparent;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); /* 延长动画时间 */
            border: none;
            color: #333;
            position: relative;
            overflow: hidden;
            font-weight: 500;
            /* 关键修改：移除阴影和鼠标动画 */
            transform: translateY(0) !important;
        }
        
        /* 添加下划线效果 - 与"查看更多"链接一致 */
        .baidu-link a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px; /* 增加下划线粗细 */
            background-color: #333;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); /* 延长动画时间 */
            transform: translateX(-50%);
            opacity: 0;
        }
        
        .baidu-link a:hover {
            color: #222;
            background: transparent;
            letter-spacing: 2px; /* 增加悬停时的字母间距 */
            /* 关键修改：移除上浮效果和阴影 */
            transform: translateY(0) !important;
        }
        
        .baidu-link a:hover::after {
            width: 100%;
            opacity: 1;
        }
        
        .baidu-link a:active {
            transform: translateY(2px) !important;
            transition-duration: 0.1s;
        }
        
        /* 添加模态框标题样式 */
        .modal-body h2 {
            font-size: 2.2rem;
            margin-bottom: 20px;
            color: #222;
            font-weight: 400;
            position: relative;
            padding-bottom: 15px;
        }
        
        .modal-body h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 3px;
            background-color: #333;
            border-radius: 2px;
        }
        
        /* 添加项目简介样式 */
        .modal-body > p {
            font-size: 1.1rem;
            line-height: 1.7;
            margin-bottom: 30px;
            color: #666;
            padding-left: 5px;
        }
    `;
    
    document.head.appendChild(style);
    
    // 模态框功能
    const modal = document.querySelector('.portfolio-modal');
    const modalBody = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-close');
    
    // 点击作品打开模态框
    document.addEventListener('click', function(e) {
        const link = e.target.closest('.portfolio-link');
        if (link) {
            e.preventDefault();
            
            const portfolioItem = link.closest('.portfolio-item');
            const title = link.querySelector('h3').textContent;
            const description = link.querySelector('p').textContent;
            const imageSrc = link.querySelector('img').src;
            const designThought = portfolioItem.getAttribute('data-design-thought') || 
                                  '此项目的设计理念基于简约美学与实用主义的结合，通过创新的视觉语言传递品牌核心价值。';
            
            modalBody.innerHTML = `
                <h2>${title}</h2>
                <p><strong>项目简介：</strong>${description}</p>
                
                <div class="design-thought-section">
                    <h3>设计思路</h3>
                    <p class="design-thought">${designThought}</p>
                </div>
                
                <div class="modal-image-container">
                    <img src="${imageSrc}" alt="${title}">
                </div>
                
                <div class="baidu-link">
                    <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">
                        了解更多类似项目 → 百度搜索
                    </a>
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // 添加一个微妙的背景颜色过渡
            document.body.style.backgroundColor = '#f5f5f5';
            document.body.style.transition = 'background-color 0.8s ease';
        }
    });
    
    // 关闭模态框
    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // 恢复背景颜色
        document.body.style.backgroundColor = '#ffffff';
    }
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}