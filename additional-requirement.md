# 額外需求

## 主頁面九宮格動畫

1. 為了避免球被背景的呼吸效果影響，核心概念是從圖層上將兩者分開，因此另外一個做法會考慮設置兩層同樣的九宮格容器。其中第二層是透明不可見的，並且重疊在同一個容器中，接著同樣在第1, 3, 7, 9 格的位置給予球的樣式和動畫即可

2. 為了要朝同一座標移動，球就無法單純依賴 CSS 而必須改用 JS 執行，大致做法會是綁定每顆球的狀態在球的 `inline-style` 上，動態控制 `translate(x, y)` 的位置，配合 `requestAnimationFrame` 更新

3. 沒有大量動畫更新的相關經驗，用 Chat 查詢一下大致思路是用 `canvas` tag 繪製大量球，這樣可以避免操作大量的 dom node 導致頻繁觸發 reflow & repaint，另外就是每一幀球狀態的更新都透過 `requestAnimationFrame` 去呼叫可以穩定幀數表現。

## 側邊選單

1. 因為目前做法狀態統一更新在 `currentSelectedList`，所以做個 dropdown list 並且點擊 item 之後更新 depth 0 即可同步所有表單的狀態。

2. 將 `currentSelectedList` 同步到 `localStorage`，並且初始化時檢查有無需要同步即可

3. 目前的結構應付 100 層的陣列操作已經足夠，需使用 `v-show` 避免 dom 頻繁抽換