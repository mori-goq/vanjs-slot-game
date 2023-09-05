import van from 'vanjs-core'

import { createRandomNumber } from './utils'

export const useIntervalChanger = (items: string[]) => {
  const currentIndex = van.state(0)

  // 現在の値（絵柄）
  const currentValue = van.derive(() => items[currentIndex.val])

  // 変更中かどうか
  const isChanging = van.state(false)

  const intervalId = van.state(0)

  // 変更を開始する
  const start = () => {
    if (isChanging.val) return

    currentIndex.val = createRandomNumber(items.length)

    // 100ミリ秒毎にindexを足して値を変更
    intervalId.val = setInterval(() => {
      currentIndex.val++

      if (currentIndex.val > items.length - 1) {
        currentIndex.val = 0
      }
    }, 100)

    isChanging.val = true
  }

  // 停止する
  const stop = () => {
    clearInterval(intervalId.val)
    isChanging.val = false
  }

  return [
    { currentValue, isChanging },
    { start, stop },
  ] as const
}
