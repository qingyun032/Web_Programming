# Web hw3
---
### Function
* 當 list 中沒有 todo 時 list 和 footer 都會隱藏，若沒有完成的 todo `Clear completed` 也不會出現
* 在顯示 `What needs to be done?` 的 input 方框中輸入文字並按下 `enter` 即建立一個新的 todo 且會顯示在 list 最下方
* 點擊每個 todo 的 checkbox 會更新其狀態，若原本為完成則變為未完成，若原本為未完成則改為完成。完成的 todo 內文會被劃線且透明度變成 50%
* footer 左邊的未完成數量會計算總共有幾個 todo 還未完成
* 點擊每個 todo 右方的 **x** 符號可刪除 todo ，若刪除未完成 todo，footer 左邊的未完成數量會減1
* 點擊 footer 中的 `All` 會顯示所有未被刪除的 todo
* 點擊 footer 中的 `Active` 會顯示所有未完成的 todo
* 點擊 footer 中的 `Completed` 會顯示所有已完成的 todo
* 點擊 footer 中的 `Clear completed` 會刪除所有已完成的 todo