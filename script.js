// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 初始化滚动动画
    initScrollAnimation();
    
    // 初始化回到顶部按钮
    initBackToTopButton();
    
    // 初始化平滑滚动
    initSmoothScroll();
    
    // 初始化图片懒加载
    initLazyLoading();
    
    // 添加鼠标跟随效果
    initMouseFollowEffect();
    
    // 添加粒子背景效果
    initParticleBackground();
    
    // 添加图片悬停效果
    initImageHoverEffects();
    
    // 添加打字机效果
    initTypewriterEffect();
    
    // 添加随机动画效果
    addRandomAnimations();
    
    // 添加页面过渡效果
    initPageTransitions();
    
    // 添加视差滚动效果
    initParallaxEffect();
    
    // 为移动设备添加触摸交互
    if (isMobileDevice()) {
        initMobileTouchInteractions();
    }
});

// 滚动动画初始化
function initScrollAnimation() {
    // 获取所有需要动画的元素
    const sections = document.querySelectorAll('.section');
    const profileCard = document.querySelector('.profile-card');
    const tocElement = document.querySelector('.toc');
    
    // 创建Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 当元素进入视口时
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 如果是能力卡片的父容器，为子元素添加延迟动画
                if (entry.target.querySelector('.ability-cards')) {
                    const cards = entry.target.querySelectorAll('.ability-card');
                    cards.forEach((card, index) => {
                        card.style.animationDelay = `${0.15 * index}s`;
                        card.classList.add('animate-on-scroll', 'visible');
                    });
                }
                
                // 如果是时间线的父容器，为子元素添加延迟动画
                if (entry.target.querySelector('.timeline')) {
                    const items = entry.target.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        item.style.animationDelay = `${0.15 * index}s`;
                        item.classList.add('animate-on-scroll', 'visible');
                    });
                }
                
                // 如果是图库的父容器，为子元素添加延迟动画
                if (entry.target.querySelector('.gallery')) {
                    const items = entry.target.querySelectorAll('.gallery-item');
                    items.forEach((item, index) => {
                        item.style.animationDelay = `${0.08 * index}s`;
                        item.classList.add('animate-on-scroll', 'visible');
                    });
                }
                
                // 如果是特性列表的父容器，为子元素添加延迟动画
                if (entry.target.querySelector('.feature-list')) {
                    const items = entry.target.querySelectorAll('.feature-list li');
                    items.forEach((item, index) => {
                        item.style.animationDelay = `${0.12 * index}s`;
                        item.classList.add('animate-on-scroll', 'visible');
                    });
                }
            }
        });
    }, {
        threshold: 0.15, // 当元素15%进入视口时触发
        rootMargin: '0px 0px -100px 0px' // 提前100px触发
    });
    
    // 观察所有section
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    // 观察侧边栏元素
    if (profileCard) {
        profileCard.classList.add('animate-on-scroll');
        observer.observe(profileCard);
    }
    
    if (tocElement) {
        tocElement.classList.add('animate-on-scroll');
        observer.observe(tocElement);
    }
}

// 回到顶部按钮初始化
function initBackToTopButton() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    });
    
    // 点击回到顶部
    backToTopBtn.addEventListener('click', () => {
        // 添加点击动画
        backToTopBtn.classList.add('clicked');
        setTimeout(() => {
            backToTopBtn.classList.remove('clicked');
        }, 300);
        
        // 平滑滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 平滑滚动初始化
function initSmoothScroll() {
    // 获取所有锚点链接
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // 为每个锚点链接添加点击事件
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标元素
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 添加点击动画
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
                
                // 平滑滚动到目标元素
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
                
                // 更新URL
                history.pushState(null, null, targetId);
                
                // 添加目标元素高亮效果
                targetElement.classList.add('highlight');
                setTimeout(() => {
                    targetElement.classList.remove('highlight');
                }, 1500);
            }
        });
    });
}

// 图片懒加载初始化
function initLazyLoading() {
    // 获取所有图片
    const images = document.querySelectorAll('img');
    
    // 创建Intersection Observer
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    // 添加加载动画
                    img.classList.add('loading');
                    
                    // 创建新图片对象预加载
                    const newImg = new Image();
                    newImg.src = src;
                    newImg.onload = function() {
                        img.src = src;
                        img.removeAttribute('data-src');
                        
                        // 图片加载完成后移除加载动画
                        setTimeout(() => {
                            img.classList.remove('loading');
                            img.classList.add('loaded');
                        }, 300);
                    };
                }
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 200px 0px' // 提前200px加载
    });
    
    // 观察所有图片
    images.forEach(img => {
        // 如果有data-src属性，则进行懒加载
        if (img.getAttribute('data-src')) {
            imageObserver.observe(img);
        } else {
            // 对于已有src的图片，添加加载完成的动画
            img.classList.add('loaded');
        }
    });
}

// 鼠标跟随效果
function initMouseFollowEffect() {
    // 创建跟随元素
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);
    
    // 创建光晕效果
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    document.body.appendChild(glow);
    
    // 设置跟随元素样式
    follower.style.position = 'fixed';
    follower.style.width = '15px';
    follower.style.height = '15px';
    follower.style.borderRadius = '50%';
    follower.style.backgroundColor = 'rgba(248, 177, 149, 0.6)';
    follower.style.pointerEvents = 'none';
    follower.style.transition = 'transform 0.1s ease, width 0.3s ease, height 0.3s ease, background-color 0.3s ease';
    follower.style.zIndex = '9999';
    follower.style.transform = 'translate(-50%, -50%)';
    follower.style.mixBlendMode = 'multiply';
    
    // 设置光晕样式
    glow.style.position = 'fixed';
    glow.style.width = '40px';
    glow.style.height = '40px';
    glow.style.borderRadius = '50%';
    glow.style.background = 'radial-gradient(circle, rgba(246, 114, 128, 0.2) 0%, rgba(246, 114, 128, 0) 70%)';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '9998';
    glow.style.transform = 'translate(-50%, -50%)';
    glow.style.transition = 'width 0.5s ease, height 0.5s ease';
    
    // 鼠标位置变量
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // 监听鼠标移动
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // 使用requestAnimationFrame平滑跟随
    function animate() {
        // 计算跟随位置（添加延迟效果）
        followerX += (mouseX - followerX) * 0.2;
        followerY += (mouseY - followerY) * 0.2;
        
        // 更新跟随元素位置
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        
        // 更新光晕位置（直接跟随鼠标）
        glow.style.left = `${mouseX}px`;
        glow.style.top = `${mouseY}px`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 鼠标进入可交互元素时的效果
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .ability-card, .feature-list li, .timeline-item, .social-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.width = '30px';
            follower.style.height = '30px';
            follower.style.backgroundColor = 'rgba(192, 108, 132, 0.5)';
            
            glow.style.width = '80px';
            glow.style.height = '80px';
        });
        
        el.addEventListener('mouseleave', () => {
            follower.style.width = '15px';
            follower.style.height = '15px';
            follower.style.backgroundColor = 'rgba(248, 177, 149, 0.6)';
            
            glow.style.width = '40px';
            glow.style.height = '40px';
        });
    });
    
    // 鼠标点击效果
    document.addEventListener('click', () => {
        // 点击波纹效果
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = `${mouseX}px`;
        ripple.style.top = `${mouseY}px`;
        document.body.appendChild(ripple);
        
        // 移除波纹元素
        setTimeout(() => {
            ripple.remove();
        }, 1000);
        
        // 跟随元素点击动画
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        setTimeout(() => {
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
    });
}

// 粒子背景效果
function initParticleBackground() {
    // 创建粒子容器
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '0';
    document.body.prepend(particleContainer);
    
    // 创建粒子
    const particleCount = isMobileDevice() ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

// 创建单个粒子
function createParticle(container) {
    const particle = document.createElement('div');
    
    // 随机粒子大小
    const size = Math.random() * 10 + 5;
    
    // 随机位置
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // 随机颜色
    const colors = [
        'rgba(248, 177, 149, 0.2)',
        'rgba(246, 114, 128, 0.2)',
        'rgba(192, 108, 132, 0.2)',
        'rgba(108, 91, 123, 0.2)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // 随机动画持续时间
    const duration = Math.random() * 20 + 10;
    
    // 设置粒子样式
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = color;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';
    particle.style.animation = `float ${duration}s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    // 添加到容器
    container.appendChild(particle);
    
    // 粒子淡入
    setTimeout(() => {
        particle.style.opacity = '1';
        particle.style.transition = 'opacity 1s ease';
    }, 100);
}

// 图片悬停效果
function initImageHoverEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // 创建光晕效果
        const hoverGlow = document.createElement('div');
        hoverGlow.className = 'hover-glow';
        hoverGlow.style.position = 'absolute';
        hoverGlow.style.top = '0';
        hoverGlow.style.left = '0';
        hoverGlow.style.right = '0';
        hoverGlow.style.bottom = '0';
        hoverGlow.style.borderRadius = 'inherit';
        hoverGlow.style.background = 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)';
        hoverGlow.style.opacity = '0';
        hoverGlow.style.transition = 'opacity 0.5s ease';
        hoverGlow.style.pointerEvents = 'none';
        
        item.style.position = 'relative';
        item.appendChild(hoverGlow);
        
        // 鼠标移动时更新光晕位置
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            hoverGlow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)`;
            hoverGlow.style.opacity = '1';
        });
        
        // 鼠标离开时隐藏光晕
        item.addEventListener('mouseleave', () => {
            hoverGlow.style.opacity = '0';
        });
    });
}

// 打字机效果
function initTypewriterEffect() {
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    
    if (title && subtitle) {
        const titleText = title.textContent;
        const subtitleText = subtitle.textContent;
        
        // 清空原始文本
        title.textContent = '';
        subtitle.textContent = '';
        
        // 为标题添加打字机效果
        let titleIndex = 0;
        function typeTitle() {
            if (titleIndex < titleText.length) {
                title.textContent += titleText.charAt(titleIndex);
                titleIndex++;
                setTimeout(typeTitle, 100);
            } else {
                // 标题打完后开始打副标题
                setTimeout(typeSubtitle, 300);
            }
        }
        
        // 为副标题添加打字机效果
        let subtitleIndex = 0;
        function typeSubtitle() {
            if (subtitleIndex < subtitleText.length) {
                subtitle.textContent += subtitleText.charAt(subtitleIndex);
                subtitleIndex++;
                setTimeout(typeSubtitle, 50);
            }
        }
        
        // 延迟启动打字机效果
        setTimeout(typeTitle, 500);
    }
}

// 添加一些随机的小动画效果，增加页面活力
function addRandomAnimations() {
    // 为狗狗图片添加随机浮动效果
    const profileImage = document.querySelector('.profile-image-container');
    if (profileImage) {
        setInterval(() => {
            const randomDuration = Math.random() * 2 + 1; // 1-3秒
            profileImage.style.animation = `pulse ${randomDuration}s ease-in-out`;
            
            setTimeout(() => {
                profileImage.style.animation = '';
            }, randomDuration * 1000);
        }, 5000);
    }
    
    // 为图标添加随机旋转效果
    const icons = document.querySelectorAll('.section-header i, .ability-icon i, .feature-icon i');
    icons.forEach(icon => {
        setInterval(() => {
            if (Math.random() > 0.7) { // 30%的概率触发
                icon.style.animation = 'rotate 1s ease-in-out';
                
                setTimeout(() => {
                    icon.style.animation = '';
                }, 1000);
            }
        }, 3000);
    });
    
    // 为能力卡片添加随机心跳效果
    const abilityCards = document.querySelectorAll('.ability-card');
    abilityCards.forEach(card => {
        setInterval(() => {
            if (Math.random() > 0.8) { // 20%的概率触发
                card.style.animation = 'heartbeat 1.5s ease-in-out';
                
                setTimeout(() => {
                    card.style.animation = '';
                }, 1500);
            }
        }, 5000);
    });
}

// 页面过渡效果
function initPageTransitions() {
    // 创建过渡遮罩
    const transitionMask = document.createElement('div');
    transitionMask.className = 'page-transition-mask';
    transitionMask.style.position = 'fixed';
    transitionMask.style.top = '0';
    transitionMask.style.left = '0';
    transitionMask.style.width = '100%';
    transitionMask.style.height = '100%';
    transitionMask.style.backgroundColor = '#fff5f5';
    transitionMask.style.zIndex = '10000';
    transitionMask.style.opacity = '1';
    transitionMask.style.transition = 'opacity 0.8s ease';
    transitionMask.style.pointerEvents = 'none';
    
    document.body.appendChild(transitionMask);
    
    // 页面加载完成后淡出遮罩
    window.addEventListener('load', () => {
        setTimeout(() => {
            transitionMask.style.opacity = '0';
            
            // 遮罩淡出后移除
            setTimeout(() => {
                transitionMask.remove();
            }, 800);
        }, 300);
    });
}

// 视差滚动效果
function initParallaxEffect() {
    const header = document.querySelector('.header');
    const profileImage = document.querySelector('.profile-image-container');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // 头部视差效果
        if (header) {
            header.style.backgroundPosition = `50% ${scrollY * 0.5}px`;
        }
        
        // 个人资料图片视差效果
        if (profileImage && scrollY < 500) {
            profileImage.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
    });
}

// 添加移动设备检测
function isMobileDevice() {
    return (window.innerWidth <= 768) || 
           ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}

// 如果是移动设备，禁用部分特效
if (isMobileDevice()) {
    // 添加移动设备类
    document.body.classList.add('mobile-device');
    
    // 获取鼠标跟随元素并隐藏
    window.addEventListener('load', () => {
        const follower = document.querySelector('.mouse-follower');
        const glow = document.querySelector('.mouse-glow');
        
        if (follower) {
            follower.style.display = 'none';
        }
        
        if (glow) {
            glow.style.display = 'none';
        }
    });
}

// 为移动设备添加触摸交互，模拟悬浮效果
function initMobileTouchInteractions() {
    // 获取所有可交互元素
    const interactiveElements = document.querySelectorAll(
        '.gallery-item, .ability-card, .feature-list li, .timeline-item, ' +
        '.social-link, .toc a, .btn-float, .section-header h2 i, ' +
        '.profile-card, .stat, .owner-info'
    );
    
    // 为每个元素添加触摸事件
    interactiveElements.forEach(element => {
        // 触摸开始时添加active类
        element.addEventListener('touchstart', function(e) {
            // 防止触摸事件传播
            e.stopPropagation();
            
            // 移除其他元素的active类
            document.querySelectorAll('.touch-active').forEach(el => {
                if (el !== this) {
                    el.classList.remove('touch-active');
                }
            });
            
            // 添加active类
            this.classList.add('touch-active');
            
            // 创建触摸波纹效果
            createTouchRipple(e);
        }, { passive: true });
        
        // 触摸结束后延迟移除active类
        element.addEventListener('touchend', function() {
            const self = this;
            setTimeout(() => {
                self.classList.remove('touch-active');
            }, 800); // 保持效果800毫秒
        }, { passive: true });
    });
    
    // 点击页面空白处移除所有active类
    document.addEventListener('touchstart', function() {
        document.querySelectorAll('.touch-active').forEach(el => {
            el.classList.remove('touch-active');
        });
    }, { passive: true });
    
    // 为图库项添加特殊处理
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            
            // 显示图片说明
            const caption = this.querySelector('.gallery-caption');
            if (caption) {
                caption.style.transform = 'translateY(0)';
            }
            
            // 添加图片缩放效果
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.15) rotate(2deg)';
            }
        }, { passive: true });
        
        item.addEventListener('touchend', function() {
            const self = this;
            setTimeout(() => {
                // 隐藏图片说明
                const caption = self.querySelector('.gallery-caption');
                if (caption) {
                    caption.style.transform = '';
                }
                
                // 移除图片缩放效果
                const img = self.querySelector('img');
                if (img) {
                    img.style.transform = '';
                }
            }, 800);
        }, { passive: true });
    });
    
    // 为能力卡片添加特殊处理
    const abilityCards = document.querySelectorAll('.ability-card');
    abilityCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            
            // 添加心跳动画
            const icon = this.querySelector('.ability-icon');
            if (icon) {
                icon.style.animation = 'heartbeat 1.5s ease-in-out';
            }
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            const self = this;
            setTimeout(() => {
                // 移除心跳动画
                const icon = self.querySelector('.ability-icon');
                if (icon) {
                    icon.style.animation = '';
                }
            }, 1500);
        }, { passive: true });
    });
    
    // 为特性列表添加特殊处理
    const featureItems = document.querySelectorAll('.feature-list li');
    featureItems.forEach(item => {
        item.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            
            // 添加图标旋转效果
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.1)';
            }
        }, { passive: true });
        
        item.addEventListener('touchend', function() {
            const self = this;
            setTimeout(() => {
                // 移除图标旋转效果
                const icon = self.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = '';
                }
            }, 800);
        }, { passive: true });
    });
    
    // 为时间线项添加特殊处理
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            
            // 添加时间点缩放效果
            const dot = this.querySelector('.timeline-dot');
            if (dot) {
                dot.style.transform = 'scale(1.3)';
                dot.style.backgroundColor = 'var(--secondary-color)';
            }
        }, { passive: true });
        
        item.addEventListener('touchend', function() {
            const self = this;
            setTimeout(() => {
                // 移除时间点缩放效果
                const dot = self.querySelector('.timeline-dot');
                if (dot) {
                    dot.style.transform = '';
                    dot.style.backgroundColor = '';
                }
            }, 800);
        }, { passive: true });
    });
}

// 创建触摸波纹效果
function createTouchRipple(e) {
    // 获取触摸位置
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    
    // 创建波纹元素
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    
    // 动画结束后移除波纹
    setTimeout(() => {
        ripple.remove();
    }, 1000);
} 
