/* ========================================
   Carousel - Customer Voice Slider
   ======================================== */

/**
 * カルーセルクラス
 */
class Carousel {
  /**
   * @param {string} containerSelector - カルーセルコンテナのセレクタ
   * @param {Object} options - オプション設定
   */
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.track = this.container.querySelector('.carousel-track');
    this.slides = Array.from(this.track?.children || []);
    this.prevButton = this.container.querySelector('.carousel-button-prev');
    this.nextButton = this.container.querySelector('.carousel-button-next');
    this.dotsContainer = this.container.querySelector('.carousel-dots');

    // オプション
    this.options = {
      autoPlay: options.autoPlay !== false,
      autoPlayInterval: options.autoPlayInterval || window.SITE_CONFIG?.animation?.carouselAutoPlayInterval || 5000,
      loop: options.loop !== false,
      ...options
    };

    this.currentIndex = 0;
    this.autoPlayTimer = null;

    if (this.slides.length > 0) {
      this.init();
    }
  }

  /**
   * 初期化
   */
  init() {
    this.createDots();
    this.setupEventListeners();
    this.updateCarousel();

    if (this.options.autoPlay) {
      this.startAutoPlay();
    }

    // タッチイベントのサポート
    this.setupTouchEvents();
  }

  /**
   * ドットナビゲーションを作成
   */
  createDots() {
    if (!this.dotsContainer) return;

    this.dotsContainer.innerHTML = '';
    this.slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `スライド ${index + 1} に移動`);
      if (index === 0) dot.classList.add('active');

      dot.addEventListener('click', () => {
        this.goToSlide(index);
      });

      this.dotsContainer.appendChild(dot);
    });

    this.dots = Array.from(this.dotsContainer.children);
  }

  /**
   * イベントリスナーのセットアップ
   */
  setupEventListeners() {
    // 前へボタン
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => {
        this.previousSlide();
      });
    }

    // 次へボタン
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => {
        this.nextSlide();
      });
    }

    // キーボードナビゲーション
    document.addEventListener('keydown', (e) => {
      if (!this.isInView()) return;

      if (e.key === 'ArrowLeft') {
        this.previousSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });

    // マウスホバーで自動再生を一時停止
    this.container.addEventListener('mouseenter', () => {
      this.stopAutoPlay();
    });

    this.container.addEventListener('mouseleave', () => {
      if (this.options.autoPlay) {
        this.startAutoPlay();
      }
    });
  }

  /**
   * タッチイベントのセットアップ
   */
  setupTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  }

  /**
   * スワイプ操作の処理
   */
  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // 左スワイプ（次へ）
        this.nextSlide();
      } else {
        // 右スワイプ（前へ）
        this.previousSlide();
      }
    }
  }

  /**
   * カルーセルの更新
   */
  updateCarousel() {
    // トラックの移動
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    // ドットの更新
    if (this.dots) {
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }

    // ボタンの状態更新（ループしない場合）
    if (!this.options.loop) {
      if (this.prevButton) {
        this.prevButton.disabled = this.currentIndex === 0;
      }
      if (this.nextButton) {
        this.nextButton.disabled = this.currentIndex === this.slides.length - 1;
      }
    }
  }

  /**
   * 次のスライドへ
   */
  nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
    } else if (this.options.loop) {
      this.currentIndex = 0;
    }
    this.updateCarousel();
    this.resetAutoPlay();
  }

  /**
   * 前のスライドへ
   */
  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.options.loop) {
      this.currentIndex = this.slides.length - 1;
    }
    this.updateCarousel();
    this.resetAutoPlay();
  }

  /**
   * 指定したスライドへ移動
   */
  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex = index;
      this.updateCarousel();
      this.resetAutoPlay();
    }
  }

  /**
   * 自動再生を開始
   */
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, this.options.autoPlayInterval);
  }

  /**
   * 自動再生を停止
   */
  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  /**
   * 自動再生をリセット
   */
  resetAutoPlay() {
    if (this.options.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  /**
   * カルーセルがビューポート内にあるかチェック
   */
  isInView() {
    const rect = this.container.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  /**
   * 破棄
   */
  destroy() {
    this.stopAutoPlay();
    // イベントリスナーの削除は省略（実際のプロジェクトでは実装推奨）
  }
}

// エクスポート
window.Carousel = Carousel;
