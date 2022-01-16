import {$} from '../../core/dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)

    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    let value

    $resizer.css({opacity: 1})
    let resizerLine

    if (type === 'col') {
      resizerLine = $root.$el.clientHeight - $parent.getCoords().height
      document.onmousemove = e => {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({
          right: -delta + 'px',
          bottom: -resizerLine + 'px'
        })
      }
    } else {
      resizerLine = $root.$el.clientWidth - $parent.firstChild().getCoords().width
      document.onmousemove = e => {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({
          bottom: -delta + 'px',
          right: -resizerLine + 'px'
        })
      }
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: value + 'px'})
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })
    }
  })
}

