import van from 'vanjs-core'
import type { State } from 'vanjs-core'

type Props = {
  symbol: State<string>
  stop: VoidFunction
}

export const Reel = ({ symbol, stop }: Props) => {
  const { div, span, button } = van.tags

  return div(
    span(symbol),
    button(
      {
        type: 'button',
        onclick: () => stop(),
      },
      'STOP',
    ),
  )
}
