/* ========================================
   Main JavaScript - Application Entry Point
   ======================================== */

/**
 * メインアプリケーションクラス
 */
class App {
  constructor() {
    this.config = window.SITE_CONFIG || {};
    this.init();
  }

  /**
   * 初期化
   */
  init() {
    // DOMContentLoaded後に実行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeComponents();
      });
    } else {
      this.initializeComponents();
    }
  }

  /**
   * コンポーネントの初期化
   */
  initializeComponents() {
    // ローディング画面
    this.initLoading();

    // ヘッダー
    this.initHeader();

    // スムーススクロール
    this.initSmoothScroll();

    // アニメーション
    this.initAnimations();

    // カルーセル
    this.initCarousel();

    // タブ
    this.initTabs();

    // FAQ
    this.initFAQ();

    // フローティングCTA
    this.initFloatingCTA();

    // SNSリンク
    this.initSNSLinks();

    // その他のUI機能
    this.initMiscFeatures();
  }

  /**
   * ローディング画面
   */
  initLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 500);
    });
  }

  /**
   * ヘッダー機能の初期化
   */
  initHeader() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!header) return;

    // スクロール時のヘッダー背景変更
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      const threshold = this.config.header?.scrollThreshold || 100;

      if (currentScroll > threshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });

    // ハンバーガーメニュー
    if (hamburger && nav) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
      });

      // ナビゲーションリンクをクリックしたらメニューを閉じる
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          nav.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    // アクティブなナビゲーションリンクのハイライト
    this.highlightActiveSection();
  }

  /**
   * アクティブセクションのハイライト
   */
  highlightActiveSection() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach((section) => observer.observe(section));
  }

  /**
   * スムーススクロール
   */
  initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const offset = this.config.smoothScroll?.offset || 80;

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * アニメーションの初期化
   */
  initAnimations() {
    // スクロールアニメーション
    if (window.ScrollAnimations) {
      new window.ScrollAnimations();
    }

    // パララックス効果
    if (window.ParallaxEffect) {
      new window.ParallaxEffect();
    }

    // カウントアップアニメーション
    if (window.CountUpAnimation) {
      window.CountUpAnimation.initStats();
    }

    // スクロールプログレスバー
    if (window.ScrollProgress) {
      new window.ScrollProgress();
    }
  }

  /**
   * カルーセルの初期化
   */
  initCarousel() {
    if (!window.Carousel) return;

    // お客様の声カルーセル
    const voiceCarousel = new window.Carousel('.voice-carousel');
  }

  /**
   * タブの初期化
   */
  initTabs() {
    // サービス詳細タブ
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const tabName = button.dataset.tab;

        // すべてのタブとコンテンツから active を削除
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        tabContents.forEach((content) => content.classList.remove('active'));

        // クリックされたタブとコンテンツに active を追加
        button.classList.add('active');
        const targetContent = document.querySelector(`[data-content="${tabName}"]`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });

    // 料金プランタブ
    const planTabs = document.querySelectorAll('.plan-tab');
    const planContents = document.querySelectorAll('.plan-content');

    planTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const planName = tab.dataset.plan;

        // すべてのタブとコンテンツから active を削除
        planTabs.forEach((t) => t.classList.remove('active'));
        planContents.forEach((content) => content.classList.remove('active'));

        // クリックされたタブとコンテンツに active を追加
        tab.classList.add('active');
        const targetContent = document.querySelector(`[data-plan-content="${planName}"]`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  /**
   * FAQアコーディオンの初期化
   */
  initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // すべてのFAQアイテムを閉じる（アコーディオン形式）
        faqItems.forEach((faqItem) => {
          faqItem.classList.remove('active');
        });

        // クリックされたアイテムをトグル
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  /**
   * フローティングCTAボタン
   */
  initFloatingCTA() {
    const floatingCta = document.getElementById('floatingCta');
    if (!floatingCta) return;

    const threshold = this.config.floatingCta?.showThreshold || 300;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > threshold) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    });
  }

  /**
   * SNSリンクの設定
   */
  initSNSLinks() {
    const lineButton = document.getElementById('lineButton');
    const instagramButton = document.getElementById('instagramButton');

    if (lineButton && this.config.sns?.line) {
      lineButton.href = this.config.sns.line;
    }

    if (instagramButton && this.config.sns?.instagram) {
      instagramButton.href = this.config.sns.instagram;
    }
  }

  /**
   * その他のUI機能
   */
  initMiscFeatures() {
    // 外部リンクを新しいタブで開く
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach((link) => {
      if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    // 画像の遅延読み込み（ネイティブ lazy loading）
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });

    // お客様の声の「もっと見る」機能
    const voiceCards = document.querySelectorAll('.voice-card');

    voiceCards.forEach((card) => {
      const voiceText = card.querySelector('.voice-text');
      const readMoreButton = card.querySelector('.voice-read-more');

      if (!voiceText || !readMoreButton) return;

      // テキストが実際に切り詰められているかをチェック
      // scrollHeight > clientHeight なら、テキストが溢れている
      const isOverflowing = voiceText.scrollHeight > voiceText.clientHeight;

      if (isOverflowing) {
        // テキストが溢れている場合、ボタンを表示
        readMoreButton.style.display = 'block';

        readMoreButton.addEventListener('click', () => {
          // テキストを展開
          voiceText.classList.add('expanded');

          // ボタンを非表示
          readMoreButton.classList.add('hidden');
        });
      }
    });

    // プレースホルダー画像の生成
    this.generatePlaceholders();
  }

  /**
   * プレースホルダー画像の生成
   */
  generatePlaceholders() {
    const placeholderImages = document.querySelectorAll('img[src*="placeholder"]');

    placeholderImages.forEach((img) => {
      // エラー時にSVGプレースホルダーを表示
      img.addEventListener('error', () => {
        const width = img.width || 400;
        const height = img.height || 300;
        const text = img.alt || 'Image';

        const svg = `data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
            <rect width="100%" height="100%" fill="#1a1a1a"/>
            <text x="50%" y="50%" fill="#666" font-family="sans-serif" font-size="20" text-anchor="middle" dominant-baseline="middle">${text}</text>
          </svg>
        `)}`;

        img.src = svg;
      });
    });
  }
}

// アプリケーションの起動
const app = new App();

// グローバルにエクスポート（デバッグ用）
window.app = app;
