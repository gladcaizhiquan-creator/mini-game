# Default Project

以 **Vite + Phaser** 打造的 2D 網頁小遊戲「Coin Collector」。

## 遊戲玩法

- 使用 **方向鍵 ← →** 或 **A / D** 移動角色。
- 收集從天而降的金幣得分，分數超過 3 後會開始掉落尖刺。
- 被尖刺擊中即遊戲結束，按 **SPACE** 可重新開始。
- 按 **M** 可開關音效（音效為程式即時合成，無需額外音檔）。

## 需求環境

- Node.js 20 以上（本專案以 24 開發）
- npm 10 以上

## 快速開始

```bash
npm install
npm run dev
```

開啟瀏覽器進入終端機顯示的網址（預設 http://localhost:5173）。

## 指令

| 指令 | 說明 |
| --- | --- |
| `npm run dev` | 啟動開發伺服器（熱更新） |
| `npm run build` | 產生正式版檔案至 `dist/` |
| `npm run preview` | 預覽正式版建置結果 |

## 專案結構

```
.
├── index.html            # 進入點 HTML
├── vite.config.js        # Vite 設定
├── src/
│   ├── main.js           # Phaser 遊戲初始化與設定
│   ├── audio/
│   │   └── sfx.js        # 程式即時合成的音效
│   └── scenes/
│       ├── BootScene.js  # 資源產生與載入
│       ├── MenuScene.js  # 主選單
│       └── GameScene.js  # 主要遊戲邏輯
├── .env.example          # 環境變數範例
└── package.json
```

## 環境變數

複製 `.env.example` 為 `.env` 後依需求調整：

```bash
cp .env.example .env
```

| 變數 | 預設值 | 說明 |
| --- | --- | --- |
| `VITE_PORT` | `5173` | 開發伺服器連接埠 |

## 建置與部署

```bash
npm run build
```

產物位於 `dist/`，可直接部署至任何靜態網站託管服務（GitHub Pages、Netlify、Vercel 等）。

## 授權

MIT
