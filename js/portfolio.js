// 作品集功能 - 简化筛选逻辑
function initPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentFilter = 'brand';
    
    // 初始化：只显示品牌设计
    portfolioItems.forEach(item => {
        if (item.dataset.category === 'brand') {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px) scale(0.98)';
        }
    });

    // 为每个按钮绑定点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetFilter = this.getAttribute('data-filter');
            
            if (targetFilter === currentFilter) return;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            switchPortfolioItems(targetFilter, portfolioItems, currentFilter);
            currentFilter = targetFilter;
        });
    });
    
    initPortfolioModal();
}

// 切换作品项
function switchPortfolioItems(targetFilter, allItems, currentFilter) {
    const outgoingItems = document.querySelectorAll(`.portfolio-item[data-category="${currentFilter}"]`);
    const incomingItems = document.querySelectorAll(`.portfolio-item[data-category="${targetFilter}"]`);
    
    // 淡出当前项目
    outgoingItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px) scale(0.98)';
        }, index * 60);
    });
    
    // 淡入新项目
    setTimeout(() => {
        // 隐藏所有项目
        allItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // 显示新项目
        incomingItems.forEach((item, index) => {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px) scale(0.98)';
        });
        
        // 强制重绘
        if (incomingItems[0]) {
            void incomingItems[0].offsetHeight;
        }
        
        // 交错淡入动画
        incomingItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 80);
        });
        
    }, outgoingItems.length * 60 + 150);
}

// 作品集模态框功能 - 修改内容顺序和添加百度链接
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
    
    // 模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
        }
        .portfolio-modal.active {
            display: block;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(5px);
        }
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            width: 90%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 8px;
            padding: 40px;
        }
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #333;
        }
        .design-thought {
            margin-bottom: 20px;
            line-height: 1.6;
            color: #555;
        }
        .modal-image-container {
            margin: 20px 0;
            text-align: center;
        }
        .modal-image-container img {
            width: 100%;
            max-height: 400px;
            object-fit: contain;
            border-radius: 8px;
        }
        .baidu-link {
            display: block;
            text-align: center;
            margin-top: 25px;
            padding-top: 15px;
            border-top: 1px solid #eee;
        }
        /* 修改链接样式为与品牌设计按钮一致 */
        .baidu-link a {
            display: inline-block;
            padding: 12px 30px; /* 与filter-btn一致的内边距 */
            background-color: transparent;
            border: 1px solid #333;
            border-radius: 25px; /* 与filter-btn一致的圆角 */
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            font-size: 15px; /* 与filter-btn一致的字体大小 */
            position: relative;
            overflow: hidden;
            z-index: 1;
            font-weight: 400;
            letter-spacing: 0.5px;
            color: #333;
            text-decoration: none;
            text-transform: none;
        }
        .baidu-link a:hover {
            background-color: #f5f5f5;
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            letter-spacing: 1.5px;
        }
        .baidu-link a:active {
            transform: translateY(1px);
            transition-duration: 0.1s;
        }
        
        /* 移动端模态框优化 */
        @media (max-width: 768px) {
            .portfolio-modal {
                padding: 0;
            }
            
            .modal-content {
                width: 95%;
                max-width: none;
                max-height: 85vh;
                padding: 25px 20px;
                border-radius: 12px;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            
            .modal-close {
                top: 10px;
                right: 10px;
                font-size: 1.8rem;
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
            }
            
            .modal-body h2 {
                font-size: 1.4rem;
                margin-bottom: 15px;
            }
            
            .modal-body p {
                font-size: 0.95rem;
                line-height: 1.6;
            }
            
            .design-thought-section h3 {
                font-size: 1.2rem;
                margin: 20px 0 10px;
            }
            
            .design-thought {
                font-size: 0.9rem;
                line-height: 1.6;
            }
            
            .modal-image-container {
                margin: 20px -20px;
            }
            
            .modal-image-container img {
                max-height: 250px;
                border-radius: 0;
            }
            
            .baidu-link a {
                padding: 10px 25px;
                font-size: 14px;
                width: 100%;
                text-align: center;
            }
        }
        
        @media (max-width: 480px) {
            .modal-content {
                width: 98%;
                padding: 20px 16px;
                max-height: 90vh;
            }
            
            .modal-body h2 {
                font-size: 1.3rem;
            }
            
            .modal-image-container img {
                max-height: 200px;
            }
        }
        
        /* 防止移动端模态框滚动穿透 */
        body.modal-open {
            overflow: hidden;
            position: fixed;
            width: 100%;
        }
    `;
    
    document.head.appendChild(style);
    
    // 模态框功能
    const modal = document.querySelector('.portfolio-modal');
    const modalBody = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-close');
    
    // 点击作品打开模态框
    document.querySelector('.portfolio-grid').addEventListener('click', function(e) {
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
            document.body.classList.add('modal-open'); // 添加类防止滚动穿透
            
            // 移动端优化：点击模态框外部关闭
            modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
        }
    });
    
    // 关闭模态框
    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open'); // 移除类
    }
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}