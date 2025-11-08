/* ========================================
   Animations - Scroll Animations & Effects
   ======================================== */

/**
 * スクロールアニメーション管理クラス
 */
class ScrollAnimations {
  constructor() {
    this.config = window.SITE_CONFIG?.animation || {
      fadeInThreshold: 0.1,
      scrollDelay: 100
    };

    this.observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: this.config.fadeInThreshold
    };

    this.init();
  }

  /**
   * 初期化
   */
  init() {
    // Intersection Observerのサポートチェック
    if ('IntersectionObserver' in window) {
      this.setupObserver();
      this.observeElements();
    } else {
      // フォールバック: すぐに全ての要素を表示
      this.showAllElements();
    }
  }

  /**
   * Intersection Observerのセットアップ
   */
  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 要素がビューポートに入ったらアニメーションを開始
          setTimeout(() => {
            entry.target.classList.add('animated');
          }, this.config.scrollDelay);

          // 一度アニメーションしたら監視を解除（パフォーマンス向上）
          this.observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);
  }

  /**
   * アニメーション対象の要素を監視
   */
  observeElements() {
    // .animate-on-scrollクラスを持つ要素を監視
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((element) => {
      this.observer.observe(element);
    });

    // セクション全体も監視
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      section.classList.add('animate-on-scroll');
      this.observer.observe(section);
    });

    // カードアイテムも監視
    const cards = document.querySelectorAll('.concept-card, .pricing-card, .voice-card');
    cards.forEach((card, index) => {
      card.classList.add('animate-on-scroll');
      // スタッガー効果のための遅延
      card.style.transitionDelay = `${index * 0.1}s`;
      this.observer.observe(card);
    });
  }

  /**
   * フォールバック: 全要素を即座に表示
   */
  showAllElements() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((element) => {
      element.classList.add('animated');
    });
  }

  /**
   * 手動でアニメーションをトリガー
   */
  static trigger(element) {
    if (element) {
      element.classList.add('animated');
    }
  }
}

/**
 * パララックス効果クラス
 */
class ParallaxEffect {
  constructor() {
    this.parallaxElements = document.querySelectorAll('.parallax');
    this.init();
  }

  /**
   * 初期化
   */
  init() {
    if (this.parallaxElements.length === 0) return;

    // スクロールイベントにスロットル処理を適用
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * パララックス効果を更新
   */
  updateParallax() {
    const scrollY = window.pageYOffset;

    this.parallaxElements.forEach((element) => {
      const speed = element.dataset.parallaxSpeed || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
}

/**
 * カウントアップアニメーション
 */
class CountUpAnimation {
  /**
   * 数値をカウントアップ
   * @param {HTMLElement} element - 対象要素
   * @param {number} start - 開始値
   * @param {number} end - 終了値
   * @param {number} duration - アニメーション時間（ミリ秒）
   */
  static animate(element, start, end, duration = 2000) {
    let startTime = null;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const currentValue = Math.floor(progress * (end - start) + start);
      element.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = end.toLocaleString();
      }
    };

    window.requestAnimationFrame(step);
  }

  /**
   * 統計数値のカウントアップを初期化
   */
  static initStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const endValue = parseInt(element.textContent.replace(/[^0-9]/g, ''));

          if (!isNaN(endValue)) {
            CountUpAnimation.animate(element, 0, endValue, 2000);
          }

          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach((number) => {
      observer.observe(number);
    });
  }
}

/**
 * タイピングアニメーション
 */
class TypingAnimation {
  /**
   * タイピング効果を適用
   * @param {HTMLElement} element - 対象要素
   * @param {string} text - 表示するテキスト
   * @param {number} speed - タイピング速度（ミリ秒）
   */
  static type(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();
  }
}

/**
 * スクロールプログレスバー
 */
class ScrollProgress {
  constructor() {
    this.createProgressBar();
    this.init();
  }

  /**
   * プログレスバーを作成
   */
  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, #FF6B35, #FF8C42);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    this.progressBar = progressBar;
  }

  /**
   * 初期化
   */
  init() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * プログレス更新
   */
  updateProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    this.progressBar.style.width = scrolled + '%';
  }
}

// エクスポート
window.ScrollAnimations = ScrollAnimations;
window.ParallaxEffect = ParallaxEffect;
window.CountUpAnimation = CountUpAnimation;
window.TypingAnimation = TypingAnimation;
window.ScrollProgress = ScrollProgress;
