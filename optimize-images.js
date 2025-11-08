const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 設定
const INPUT_DIR = './images';
const OUTPUT_DIR = './images/optimized';
const SIZES = {
  small: { width: 800, suffix: '-small' },   // モバイル用
  medium: { width: 1200, suffix: '-medium' }, // タブレット用
  large: { width: 1920, suffix: '-large' }    // PC用
};

const QUALITY = {
  webp: 80,
  jpeg: 85
};

// 出力ディレクトリの作成
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 画像ファイルのリスト取得
const getImageFiles = (dir) => {
  return fs.readdirSync(dir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .map(file => path.join(dir, file));
};

// ファイルサイズを取得（MB単位）
const getFileSizeMB = (filePath) => {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
};

// 画像を最適化
const optimizeImage = async (inputPath) => {
  const fileName = path.basename(inputPath, path.extname(inputPath));
  const originalSize = getFileSizeMB(inputPath);

  console.log(`\n処理中: ${path.basename(inputPath)} (${originalSize} MB)`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`  元のサイズ: ${metadata.width}x${metadata.height}`);

    // 各サイズごとに処理
    for (const [sizeName, config] of Object.entries(SIZES)) {
      const outputBaseName = `${fileName}${config.suffix}`;

      // リサイズ処理（アスペクト比維持）
      const resized = image.clone().resize(config.width, null, {
        withoutEnlargement: true, // 元のサイズより大きくしない
        fit: 'inside'
      });

      // WebP形式で保存
      const webpPath = path.join(OUTPUT_DIR, `${outputBaseName}.webp`);
      await resized.clone()
        .webp({ quality: QUALITY.webp })
        .toFile(webpPath);
      const webpSize = getFileSizeMB(webpPath);
      console.log(`  ✓ ${sizeName}: ${outputBaseName}.webp (${webpSize} MB)`);

      // JPEG形式で保存（フォールバック用）
      const jpegPath = path.join(OUTPUT_DIR, `${outputBaseName}.jpg`);
      await resized.clone()
        .jpeg({ quality: QUALITY.jpeg, progressive: true })
        .toFile(jpegPath);
      const jpegSize = getFileSizeMB(jpegPath);
      console.log(`  ✓ ${sizeName}: ${outputBaseName}.jpg (${jpegSize} MB)`);
    }

    console.log(`  完了: ${path.basename(inputPath)}`);

  } catch (error) {
    console.error(`  エラー: ${path.basename(inputPath)} - ${error.message}`);
  }
};

// メイン処理
const main = async () => {
  console.log('='.repeat(60));
  console.log('画像最適化スクリプト開始');
  console.log('='.repeat(60));

  const imageFiles = getImageFiles(INPUT_DIR);

  if (imageFiles.length === 0) {
    console.log('処理する画像が見つかりませんでした。');
    return;
  }

  console.log(`\n処理対象: ${imageFiles.length}ファイル`);
  console.log(`出力先: ${OUTPUT_DIR}`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  // ファイルサイズの集計（処理前）
  imageFiles.forEach(file => {
    totalOriginalSize += parseFloat(getFileSizeMB(file));
  });

  // 各画像を処理
  for (const imagePath of imageFiles) {
    await optimizeImage(imagePath);
  }

  // ファイルサイズの集計（処理後）
  const optimizedFiles = fs.readdirSync(OUTPUT_DIR);
  optimizedFiles.forEach(file => {
    const filePath = path.join(OUTPUT_DIR, file);
    totalOptimizedSize += parseFloat(getFileSizeMB(filePath));
  });

  // 結果表示
  console.log('\n' + '='.repeat(60));
  console.log('最適化完了');
  console.log('='.repeat(60));
  console.log(`元のサイズ合計: ${totalOriginalSize.toFixed(2)} MB`);
  console.log(`最適化後の合計: ${totalOptimizedSize.toFixed(2)} MB`);
  console.log(`削減量: ${(totalOriginalSize - totalOptimizedSize).toFixed(2)} MB`);
  console.log(`削減率: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));
  console.log('\n次のステップ:');
  console.log('1. images/optimized/ フォルダ内の画像を確認');
  console.log('2. HTMLファイルを更新して最適化された画像を使用');
  console.log('3. 元の画像ファイルは念のため保管しておくことを推奨');
};

// スクリプト実行
main().catch(console.error);
