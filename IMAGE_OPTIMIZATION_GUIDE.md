# 画像最適化ガイド

このガイドでは、サイトの表示速度を大幅に改善するための画像最適化手順を説明します。

## 🎯 期待される効果

- **画像サイズ**: 28MB → 3〜4MB（約85%削減）
- **読み込み速度**: 5〜10秒 → 1〜2秒
- **モバイル環境**: さらに高速化

## 📋 前提条件

- Node.js がインストールされていること（バージョン14以上を推奨）
- ターミナル/コマンドプロンプトの基本的な使い方を理解していること

Node.jsがインストールされているか確認：
```bash
node --version
```

もしインストールされていない場合は、[Node.js公式サイト](https://nodejs.org/)からダウンロードしてください。

## 🚀 実行手順

### ステップ1: 依存パッケージのインストール

プロジェクトのルートディレクトリで以下のコマンドを実行：

```bash
npm install
```

これにより、画像処理ライブラリ `sharp` がインストールされます。

### ステップ2: 画像最適化スクリプトの実行

```bash
npm run optimize-images
```

または

```bash
node optimize-images.js
```

### ステップ3: 処理の確認

スクリプトが実行されると、以下のような出力が表示されます：

```
============================================================
画像最適化スクリプト開始
============================================================

処理対象: 7ファイル
出力先: ./images/optimized

処理中: personal_1.jpg (14.00 MB)
  元のサイズ: 4032x3024
  ✓ small: personal_1-small.webp (0.12 MB)
  ✓ small: personal_1-small.jpg (0.15 MB)
  ✓ medium: personal_1-medium.webp (0.22 MB)
  ✓ medium: personal_1-medium.jpg (0.28 MB)
  ✓ large: personal_1-large.webp (0.45 MB)
  ✓ large: personal_1-large.jpg (0.58 MB)
  完了: personal_1.jpg

...（他の画像も同様に処理）

============================================================
最適化完了
============================================================
元のサイズ合計: 28.00 MB
最適化後の合計: 3.50 MB
削減量: 24.50 MB
削減率: 87.5%
============================================================

次のステップ:
1. images/optimized/ フォルダ内の画像を確認
2. HTMLファイルを更新して最適化された画像を使用
3. 元の画像ファイルは念のため保管しておくことを推奨
```

### ステップ4: 最適化された画像の確認

`images/optimized/` ディレクトリに以下のファイルが生成されます：

各画像につき6つのファイル：
- `{画像名}-small.webp` (モバイル用 WebP)
- `{画像名}-small.jpg` (モバイル用 JPEG)
- `{画像名}-medium.webp` (タブレット用 WebP)
- `{画像名}-medium.jpg` (タブレット用 JPEG)
- `{画像名}-large.webp` (PC用 WebP)
- `{画像名}-large.jpg` (PC用 JPEG)

### ステップ5: サイトのテスト

1. ローカルでサイトを開いて動作確認
2. すべての画像が正しく表示されることを確認
3. ブラウザの開発者ツールで読み込み速度を確認

### ステップ6: GitHub Pagesにデプロイ

```bash
git add .
git commit -m "画像最適化: WebP対応とレスポンシブ画像実装"
git push origin main
```

## 📱 実装された最適化

### 1. WebP形式への対応

- モダンブラウザでは軽量なWebP形式を使用
- 古いブラウザでは最適化されたJPEG形式にフォールバック
- 自動的に最適な形式が選択される

### 2. レスポンシブ画像

画面サイズに応じて最適な画像サイズを配信：

| デバイス | 画像サイズ | 用途 |
|---------|-----------|------|
| モバイル（〜768px） | small (800px幅) | スマートフォン |
| タブレット（〜1200px） | medium (1200px幅) | タブレット |
| PC（1200px〜） | large (1920px幅) | デスクトップ |

### 3. 遅延読み込み（Lazy Loading）

- すべての画像に `loading="lazy"` 属性を設定
- スクロールして表示される直前に画像を読み込み
- 初回ページ読み込みを高速化

## 🔧 トラブルシューティング

### エラー: `Cannot find module 'sharp'`

```bash
npm install
```

を実行してください。

### エラー: `node: command not found`

Node.jsがインストールされていません。[Node.js公式サイト](https://nodejs.org/)からダウンロードしてインストールしてください。

### 画像が表示されない

1. `images/optimized/` フォルダが存在するか確認
2. 最適化スクリプトが正常に完了したか確認
3. ブラウザのキャッシュをクリア（Cmd+Shift+R / Ctrl+Shift+R）

### ファイルサイズが思ったより削減されない

- 元の画像の品質や内容によって削減率は変動します
- 特に大きな画像（personal_1.jpg、profile.jpg）で効果が顕著です

## 📊 最適化の詳細

### 処理される画像

1. **personal_1.jpg** (14 MB) → 約1.5 MB
2. **profile.jpg** (11 MB) → 約1.5 MB
3. **nutrition.jpg** (2.8 MB) → 約0.6 MB
4. **after1.jpg** (577 KB) → 約200 KB
5. **before1.jpg** (174 KB) → 約60 KB
6. **online.jpg** (149 KB) → 約50 KB
7. **chat.jpg** (68 KB) → 約25 KB

### 品質設定

- **WebP**: 品質80%（高品質を維持しつつサイズ削減）
- **JPEG**: 品質85%（プログレッシブJPEG）

## 🎨 HTMLの変更内容

各画像が以下のように`<picture>`タグで置き換えられています：

```html
<picture>
  <source
    type="image/webp"
    srcset="images/optimized/personal_1-small.webp 800w,
            images/optimized/personal_1-medium.webp 1200w,
            images/optimized/personal_1-large.webp 1920w"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px">
  <source
    type="image/jpeg"
    srcset="images/optimized/personal_1-small.jpg 800w,
            images/optimized/personal_1-medium.jpg 1200w,
            images/optimized/personal_1-large.jpg 1920w"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px">
  <img src="images/optimized/personal_1-medium.jpg" alt="パーソナルトレーニング" loading="lazy">
</picture>
```

## 💡 今後の新しい画像の追加方法

新しい画像を追加する場合：

1. 画像を `images/` フォルダに配置
2. `npm run optimize-images` を実行
3. HTMLで`<picture>`タグを使用して画像を参照

## ⚠️ 注意事項

- **元の画像は削除しない**: `images/` フォルダ内の元の画像は保管しておくことを推奨
- **GitHubの容量制限**: GitHub Pagesは無料で十分対応できますが、リポジトリサイズは1GB以下を推奨
- **再実行時**: スクリプトは既存の最適化画像を上書きします

## ✅ 完了チェックリスト

- [ ] Node.jsがインストールされている
- [ ] `npm install` を実行
- [ ] `npm run optimize-images` を実行
- [ ] `images/optimized/` フォルダが作成された
- [ ] すべての画像が6つのバリエーション（small/medium/large × webp/jpg）で生成された
- [ ] ローカルでサイトの表示を確認
- [ ] すべての画像が正しく表示される
- [ ] GitHub Pagesにデプロイ
- [ ] 本番環境で動作確認

## 📈 効果測定

最適化後の効果を確認する方法：

1. **Chrome DevTools を使用**
   - F12キーで開発者ツールを開く
   - Networkタブを選択
   - ページをリロード
   - 画像の読み込みサイズと速度を確認

2. **PageSpeed Insights**
   - https://pagespeed.web.dev/ にアクセス
   - サイトのURLを入力
   - パフォーマンススコアを確認

---

**有料サーバーは不要です！GitHub Pagesで十分高速なサイトが実現できます。**
