# 越田敦也 パーソナルトレーニングサービス ホームページ

「人生最後のパーソナルトレーニング」をコンセプトとしたパーソナルトレーニングサービスのホームページです。

## 🎨 デザインコンセプト

- **メインカラー**: 黒とオレンジのスタイリッシュな配色
- **テーマ**: プロフェッショナルかつエネルギッシュ
- **レスポンシブ**: モバイルファーストデザイン

## 🚀 機能

### セクション構成
1. **ヒーローセクション** - 印象的なメインビジュアル
2. **コンセプト** - サービスの3つの特徴
3. **料金プラン** - 3つのプランをカード形式で表示
4. **サービス詳細** - タブで切り替え可能な詳細説明
5. **トレーナープロフィール** - 資格と実績の紹介
6. **お客様の声** - カルーセル形式のレビュー
7. **FAQ** - アコーディオン形式の質問集
8. **アクセス情報** - 対応エリアと営業時間
9. **お問い合わせ** - LINE/Instagram連携

### UI/UX機能
- ✅ スムーススクロール
- ✅ スクロールアニメーション（Intersection Observer使用）
- ✅ パララックス効果
- ✅ カルーセルスライダー
- ✅ タブ切り替え
- ✅ FAQアコーディオン
- ✅ フローティングCTAボタン
- ✅ ローディングアニメーション
- ✅ レスポンシブデザイン（モバイル/タブレット/デスクトップ）

## 📁 ファイル構成

```
personal_homepage/
├── index.html              # メインHTML
├── css/
│   ├── variables.css      # CSS変数・カラーパレット
│   ├── base.css          # 基本スタイル・リセット
│   ├── components.css    # コンポーネント（ボタン、カードなど）
│   ├── sections.css      # セクション別スタイル
│   ├── animations.css    # アニメーション定義
│   └── responsive.css    # レスポンシブ対応
├── js/
│   ├── config.js         # 設定ファイル（SNS URLなど）
│   ├── animations.js     # アニメーション機能
│   ├── carousel.js       # カルーセル機能
│   └── main.js           # メインスクリプト
├── images/
│   └── placeholder/      # プレースホルダー画像
└── README.md            # このファイル
```

## ⚙️ 設定方法

### 1. SNSリンクの設定

`js/config.js` ファイルを編集して、LINE公式アカウントとInstagramのURLを設定してください。

```javascript
const CONFIG = {
  sns: {
    // LINE公式アカウントのURL
    line: 'https://line.me/R/ti/p/@your-line-id',

    // InstagramのURL
    instagram: 'https://www.instagram.com/your-instagram-id/'
  }
};
```

### 2. 画像の配置

`images/` フォルダに以下の画像を配置してください：

- `images/placeholder/training.jpg` - トレーニング画像
- `images/placeholder/nutrition.jpg` - 食事指導画像
- `images/placeholder/support.jpg` - オンラインサポート画像
- `images/placeholder/coaching.jpg` - コーチング画像
- `images/placeholder/trainer.jpg` - トレーナー写真
- `images/placeholder/before1.jpg` - ビフォー画像1
- `images/placeholder/after1.jpg` - アフター画像1
- `images/placeholder/before2.jpg` - ビフォー画像2
- `images/placeholder/after2.jpg` - アフター画像2

※画像がない場合は、自動的にプレースホルダーが表示されます。

## 🌐 GitHub Pagesへのデプロイ

### 手順

1. **GitHubリポジトリの作成**
   ```bash
   cd personal_homepage
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **GitHub Pagesの設定**
   - GitHubリポジトリのページにアクセス
   - Settings → Pages に移動
   - Source: "Deploy from a branch" を選択
   - Branch: "main" / "/ (root)" を選択
   - Save をクリック

3. **公開URLの確認**
   - 数分後、`https://YOUR_USERNAME.github.io/YOUR_REPO/` でアクセス可能になります

### カスタムドメインの設定（オプション）

1. `CNAME` ファイルをルートディレクトリに作成
   ```
   your-domain.com
   ```

2. DNSプロバイダーで以下を設定：
   - A レコード: `185.199.108.153`
   - A レコード: `185.199.109.153`
   - A レコード: `185.199.110.153`
   - A レコード: `185.199.111.153`
   - または CNAME レコード: `YOUR_USERNAME.github.io`

## 🛠️ 開発・カスタマイズ

### カラーパレットの変更

`css/variables.css` を編集してカラーを変更できます：

```css
:root {
  --color-primary: #FF6B35;      /* メインオレンジ */
  --color-primary-light: #FF8C42; /* 明るいオレンジ */
  --color-black: #000000;         /* 黒 */
  /* ... */
}
```

### アニメーション設定の変更

`js/config.js` でアニメーションの動作を調整できます：

```javascript
animation: {
  scrollDelay: 100,                 // スクロールアニメーションの遅延（ミリ秒）
  fadeInThreshold: 0.1,             // フェードイン開始の閾値（0-1）
  carouselAutoPlayInterval: 5000    // カルーセル自動再生の間隔（ミリ秒）
}
```

## 📱 対応ブラウザ

- ✅ Chrome（最新版）
- ✅ Firefox（最新版）
- ✅ Safari（最新版）
- ✅ Edge（最新版）
- ✅ iOS Safari（iOS 12+）
- ✅ Chrome for Android

## 🔧 技術スタック

- **HTML5** - セマンティックマークアップ
- **CSS3** - CSS Variables, Flexbox, Grid
- **JavaScript (ES6+)** - モダンJavaScript
- **Web APIs** - Intersection Observer, Smooth Scroll

## 📈 パフォーマンス最適化

- ✅ 画像の遅延読み込み（lazy loading）
- ✅ CSSの分割読み込み
- ✅ JavaScriptの最適化
- ✅ アニメーションのパフォーマンス最適化
- ✅ レスポンシブ画像

## 🎯 SEO対策

- ✅ セマンティックHTML
- ✅ メタタグの最適化
- ✅ 構造化データ（今後実装可能）
- ✅ 適切な見出し階層
- ✅ alt属性の設定

## 📝 今後の拡張可能性

- [ ] ブログ機能の追加
- [ ] 予約システムの統合
- [ ] 多言語対応
- [ ] PWA化
- [ ] Google Analytics連携
- [ ] お問い合わせフォームの実装

## 📞 サポート

質問や問題がある場合は、以下からお問い合わせください：
- LINE公式アカウント
- Instagram

## 📄 ライセンス

このプロジェクトは越田敦也パーソナルトレーニングサービス専用です。

---

**制作日**: 2024年
**最終更新**: 2024年
**バージョン**: 1.0.0
