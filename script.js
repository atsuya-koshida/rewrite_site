// DOM要素の取得
document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーション要素
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // ハンバーガーメニューの切り替え
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // ナビゲーションリンクをクリックした時にメニューを閉じる
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // スムーススクロール
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // トップへ戻るボタンの表示/非表示
    function toggleScrollToTop() {
        if (scrollToTopBtn) {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    }

    // トップへ戻るボタンのクリックイベント
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // スクロールイベント
    window.addEventListener('scroll', function() {
        toggleScrollToTop();
        
        // ナビゲーションバーの背景透明度調整
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.pageYOffset > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = 'var(--white)';
                navbar.style.backdropFilter = 'none';
            }
        }
    });

    // 初回読み込み時にトップへ戻るボタンの状態を設定
    toggleScrollToTop();

    // アニメーション要素の初期化
    initializeAnimations();

    // フォームの初期化
    initializeForms();

    // カウンターアニメーション
    initializeCounterAnimations();
});

// アニメーション要素の初期化
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // アニメーション対象要素を観察
    const animateElements = document.querySelectorAll(
        '.plan-card, .achievement-item, .story-card, .flow-step, .faq-item, .training-plan-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// カウンターアニメーション
function initializeCounterAnimations() {
    const counterElements = document.querySelectorAll('.achievement-number, .achievement-number-large, .result-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => {
        counterObserver.observe(el);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const isNegative = text.includes('-');
    const isRating = text.includes('/');
    
    let targetNumber;
    let suffix = '';
    
    if (isRating) {
        targetNumber = parseFloat(text);
        suffix = '/5.0';
    } else if (isPercentage) {
        targetNumber = parseInt(text);
        suffix = '%';
    } else if (text.includes('kg')) {
        targetNumber = parseFloat(text);
        suffix = 'kg';
    } else {
        targetNumber = parseInt(text);
    }

    if (isNaN(targetNumber)) return;

    let currentNumber = 0;
    const increment = targetNumber / 50;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        
        let displayNumber;
        if (isRating) {
            displayNumber = currentNumber.toFixed(1);
        } else if (text.includes('kg')) {
            displayNumber = currentNumber.toFixed(1);
        } else {
            displayNumber = Math.floor(currentNumber);
        }
        
        element.textContent = (isNegative ? '-' : '') + displayNumber + suffix;
    }, 30);
}

// フォームの初期化
function initializeForms() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    }

    // フォームバリデーション
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const isValid = value !== '';
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'メールアドレスの形式が正しくありません');
            return false;
        }
    }
    
    if (!isValid) {
        showFieldError(field, 'この項目は必須です');
        return false;
    } else {
        removeFieldError(field);
        return true;
    }
}

function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.classList.add('error');
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('error');
}

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    
    // ボタンを無効化
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';
    
    // バリデーション
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        submitBtn.disabled = false;
        submitBtn.textContent = '送信する';
        showMessage('入力内容に誤りがあります。確認してください。', 'error');
        return;
    }
    
    // 実際の送信処理（ここではシミュレーション）
    setTimeout(() => {
        showMessage('お問い合わせありがとうございます。24時間以内にご連絡いたします。', 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = '送信する';
    }, 2000);
}

function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    // メッセージを画面上部に表示
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // アニメーション
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 100);
    
    // 5秒後に自動で削除
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// ページ読み込み時のアニメーション
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// FAQ項目の開閉（アコーディオン）
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('faq-question')) {
        const faqItem = e.target.parentNode;
        const faqAnswer = faqItem.querySelector('.faq-answer');
        
        if (faqAnswer) {
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            } else {
                faqAnswer.style.maxHeight = '0';
            }
        }
    }
});

// 画像の遅延読み込み
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ローディング画面（必要に応じて）
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-overlay';
    loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.querySelector('.loading-overlay');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// モバイルデバイスでのタッチイベント最適化
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// パフォーマンス最適化: スクロールイベントのスロットリング
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// スクロールイベントをスロットリング
const throttledScrollHandler = throttle(function() {
    toggleScrollToTop();
}, 100);