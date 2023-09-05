import van from 'vanjs-core'

import { Reel } from './Reel'

import { useIntervalChanger } from './useIntervalChanger'

const symbols = ['🍦', '🔔', '🍒', '🍉', '💎', '🍇', '💰', '🍀', '🍋']

const SlotGame = () => {
  const { h1, div, span, button } = van.tags

  const [intervalChanger, handler] = useIntervalChanger(symbols)
  const [intervalChanger2, handler2] = useIntervalChanger(symbols)
  const [intervalChanger3, handler3] = useIntervalChanger(symbols)

  // 絵柄の変更を開始する
  const reset = () => {
    handler.start()
    handler2.start()
    handler3.start()
  }

  // init
  reset()

  van.derive(() => {
    // どれか１つでも変更中の場合、リターン
    if (
      intervalChanger.isChanging.val ||
      intervalChanger2.isChanging.val ||
      intervalChanger3.isChanging.val
    ) {
      return
    }

    // 絵柄が全て揃った場合、アラートを表示
    if (
      intervalChanger.currentValue.val === intervalChanger2.currentValue.val &&
      intervalChanger2.currentValue.val === intervalChanger3.currentValue.val
    ) {
      alert('Congratulations!')
    }
  })

  return div(
    { class: 'slot-game' },
    h1({ class: 'title' }, 'VanJS Slot Game'),
    div(
      { class: 'order' },
      symbols.map((symbol) => span(symbol)),
    ),
    div(
      { class: 'reels' },
      Reel({
        symbol: intervalChanger.currentValue,
        stop: () => handler.stop(),
      }),
      Reel({
        symbol: intervalChanger2.currentValue,
        stop: () => handler2.stop(),
      }),
      Reel({
        symbol: intervalChanger3.currentValue,
        stop: () => handler3.stop(),
      }),
    ),
    button({ class: 'reset-btn', onclick: () => reset() }, 'RESET'),
  )
}

van.add(document.getElementById('app')!, SlotGame())
