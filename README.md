# Account Book (記帳本)

簡潔的 React + TypeScript 記帳範例應用，使用 Tailwind CSS，資料儲存在 localStorage。支援新增/編輯/刪除記錄、總覽與圖表（Chart）顯示。已將全域色系放在 src/index.css，方便一次調整整個應用配色。

## 主要功能

- 新增 / 編輯 / 刪除記帳項目（收入 / 支出）
- 分類（食物、交通、娛樂、其他）
- 本地儲存（localStorage）
- Summary（收入/支出/結餘）
- Chart（依類型顯示圖表）
- 全域主題變數（透過 src/index.css 調整配色）

## 技術棧

- React + TypeScript
- Tailwind CSS
- (可選) Chart library（專案中 Chart 元件會從 CSS 變數讀色）

## 快速開始（macOS）

1. 取得專案

   - git clone <repo-url>
   - cd account-book

2. 安裝依賴

   - npm install
     或
   - pnpm install
     或
   - yarn

3. 啟動開發伺服器

   - npm run dev

4. 建置（生產）
   - npm run build
   - (預覽) npm run preview

> 若 package.json 的 script 名稱不同，請以專案內的 scripts 為準。

## 檔案結構（重要）

- src/
  - index.css // 全域樣式與主題變數
  - App.tsx
  - components/
    - RecordForm.tsx
    - RecordList.tsx
    - Summary.tsx
    - Chart.tsx
