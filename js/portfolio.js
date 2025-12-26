// portfolio.js - 作品集功能 - 更新以支持新的分类结构
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

// portfolio.js - 作品集模态框功能修改部分

// 作品集模态框功能 - 支持多张图片
function initPortfolioModal() {
    // 创建模态框结构 - 修改关闭按钮和添加提示
    const modalHTML = `
        <div class="portfolio-modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">点击空白返回</button>
                <div class="modal-body"></div>
            </div>
            <div class="modal-close-hint">点击空白区域返回</div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 模态框功能
    const modal = document.querySelector('.portfolio-modal');
    const modalBody = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-close');
    const modalContent = document.querySelector('.modal-content');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // 为每个作品项添加独立的数据属性
    addModalDataAttributes();
    
    // 全局变量保存滚动位置
    let modalScrollPosition = 0;
    
    // 点击作品打开模态框
    document.addEventListener('click', function(e) {
        const link = e.target.closest('.portfolio-link');
        if (link) {
            e.preventDefault();
            
            // 保存当前滚动位置
            modalScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            const portfolioItem = link.closest('.portfolio-item');
            
            // 获取独立的数据属性
            const modalTitle = portfolioItem.getAttribute('data-modal-title') || link.querySelector('h3').textContent;
            const modalDescription = portfolioItem.getAttribute('data-modal-description') || link.querySelector('p').textContent;
            const modalImages = portfolioItem.getAttribute('data-modal-images') || link.querySelector('img').src;
            const designThought = portfolioItem.getAttribute('data-design-thought') || 
                                  '此项目的设计理念基于简约美学与实用主义的结合，通过创新的视觉语言传递品牌核心价值。';
            
            // 将图片字符串分割为数组（支持多张图片）
            const imageArray = modalImages.split(',').map(img => img.trim());
            
            // 创建图片HTML - 图片间距为0
            let imagesHTML = '';
            if (imageArray.length === 1) {
                // 只有一张图片
                imagesHTML = `
                    <div class="modal-images-container">
                        <div class="modal-image-item">
                            <img src="${imageArray[0]}" alt="${modalTitle}">
                        </div>
                    </div>
                `;
            } else {
                // 多张图片 - 间距为0
                imagesHTML = `<div class="modal-images-container">`;
                imageArray.forEach((imageSrc, index) => {
                    imagesHTML += `
                        <div class="modal-image-item">
                            <img src="${imageSrc}" alt="${modalTitle} - 图片${index + 1}">
                        </div>
                    `;
                });
                imagesHTML += `</div>`;
            }
            
            modalBody.innerHTML = `
                <h2>${modalTitle}</h2>
                <p><strong>项目简介：</strong>${modalDescription}</p>
                
                <div class="design-thought-section">
                    <h3>设计思路</h3>
                    <p class="design-thought">${designThought}</p>
                </div>
                
                ${imagesHTML}
            `;
            
            // 应用滚动位置到CSS变量
            document.documentElement.style.setProperty('--modal-scroll-top', modalScrollPosition);
            
            // 打开模态框并锁定页面滚动
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            
            // 重置模态框滚动位置到顶部
            setTimeout(() => {
                modalContent.scrollTop = 0;
            }, 10);
            
            // 添加一个微妙的背景颜色过渡
            document.body.style.backgroundColor = '#f5f5f5';
            document.body.style.transition = 'background-color 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    });
    
    // 关闭模态框
    function closeModal() {
        modal.classList.remove('active');
        
        // 移除滚动锁定
        document.body.classList.remove('modal-open');
        document.documentElement.style.removeProperty('--modal-scroll-top');
        
        // 恢复滚动到之前的位置
        window.scrollTo(0, modalScrollPosition);
        
        // 恢复背景颜色
        document.body.style.backgroundColor = '#ffffff';
        
        // 清除背景过渡
        setTimeout(() => {
            document.body.style.transition = '';
        }, 600);
    }
    
    // 关闭按钮点击事件
    modalClose.addEventListener('click', closeModal);
    
    // 遮罩层点击事件
    modalOverlay.addEventListener('click', closeModal);
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // 防止点击模态框内容时关闭
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}


// 为每个作品项添加独立的模态框数据属性
function addModalDataAttributes() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // 每个类别的模态框数据 - 现在支持多张图片
    const modalData = {
        brand: [
            {
                title: "科技企业品牌焕新",
                description: "为企业打造完整的视觉识别系统与品牌语言，提升品牌形象和市场竞争力",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "环保生活品牌全案",
                description: "从品牌理念到市场落地的完整环保品牌塑造，体现可持续发展的价值观",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "金融科技品牌升级",
                description: "融合金融与科技元素，打造专业、可靠且创新的品牌形象",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "精品咖啡品牌创建",
                description: "结合咖啡文化与现代美学，打造独特的品牌体验和空间氛围",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            }
        ],
        poster: [
            {
                title: "夏季音乐节主视觉",
                description: "融合音乐与视觉艺术，打造动感十足的音乐节视觉体验",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "独立电影概念海报",
                description: "通过视觉语言讲述电影故事，传递影片核心情感和主题",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "环境保护公益海报",
                description: "用强烈的视觉隐喻引发公众对环保问题的关注和思考",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "当代艺术展海报系列",
                description: "解构与重组视觉元素，诠释当代艺术的多元性和创新性",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            }
        ],
        logo: [
            {
                title: "初创科技公司标志",
                description: "简约现代的字母标志设计，体现科技公司的创新与精准",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "户外品牌图形标志",
                description: "抽象山峰图形传递户外探险精神和运动感",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "精酿啤酒厂徽章标志",
                description: "融合传统工艺与现代美学的徽章式标志设计",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "媒体平台动态标志",
                description: "适用于多场景的灵活标识系统，体现媒体的多元性",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            }
        ],
        other: [
            {
                title: "文学小说书籍装帧",
                description: "通过材质与工艺选择，增强阅读体验和书籍质感",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "可持续美妆产品包装",
                description: "环保材料与简约视觉的融合，体现品牌的可持续理念",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "年度数据报告视觉化",
                description: "将复杂数据转化为清晰易懂的视觉图表和信息图",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg",
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            },
            {
                title: "金融仪表盘界面设计",
                description: "平衡信息密度与视觉清晰度，提升用户体验和效率",
                images: [
                    "https://images.pexels.com/photos/28839480/pexels-photo-28839480.jpeg"
                ]
            }
        ]
    };
    
    // 为每个作品项添加独立的数据属性
    portfolioItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        const categoryIndex = Math.floor(index / 4); // 每组4个项目
        
        if (modalData[category] && modalData[category][index % 4]) {
            const data = modalData[category][index % 4];
            item.setAttribute('data-modal-title', data.title);
            item.setAttribute('data-modal-description', data.description);
            // 将图片数组转换为逗号分隔的字符串
            const imagesString = data.images.join(',');
            item.setAttribute('data-modal-images', imagesString);
        }
    });
}