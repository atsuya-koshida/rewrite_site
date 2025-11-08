/* ========================================
   Configuration - SNS URLs and Settings
   ======================================== */

/**
 * サイト設定
 * ここでSNSのURLを変更できます
 */
const CONFIG = {
  // SNS Links
  sns: {
    // LINE公式アカウントのURL
    // 例: 'https://line.me/R/ti/p/@your-line-id'
    line: 'https://lin.ee/obN7MvJ',

    // InstagramのURL
    // 例: 'https://www.instagram.com/your-instagram-id/'
    instagram: 'https://www.instagram.com/atsuya_koshida/'
  },

  // Animation Settings
  animation: {
    // スクロールアニメーションの遅延時間（ミリ秒）
    scrollDelay: 100,

    // フェードインの閾値（0-1）
    // 要素がビューポートの何%表示されたらアニメーションを開始するか
    fadeInThreshold: 0.1,

    // カルーセルの自動再生間隔（ミリ秒）
    carouselAutoPlayInterval: 5000
  },

  // Header Settings
  header: {
    // スクロール時にヘッダーの背景を変更する閾値（ピクセル）
    scrollThreshold: 100
  },

  // Floating CTA Settings
  floatingCta: {
    // フローティングCTAボタンを表示する閾値（ピクセル）
    showThreshold: 300
  },

  // Smooth Scroll Settings
  smoothScroll: {
    // スムーススクロールの動作時間（ミリ秒）
    duration: 800,

    // ヘッダーの高さ分のオフセット（ピクセル）
    offset: 80
  }
};

// 設定をグローバルに公開
window.SITE_CONFIG = CONFIG;
