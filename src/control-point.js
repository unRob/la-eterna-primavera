import NamedPoints from './points'
import Config from './config'

const _Helpers = {
  slideshow: {
    wait: 3000,
    enter: function(cp) {
      const canvas = window._Canvas.images
      const initial = canvas.querySelector('.shown')
      if (initial) {
        initial.addEventListener('transitionend', () => setTimeout(() => {
          cp.log("found initial")
          initial.remove()
        }, 750))
        initial.classList.remove('shown')
      }
      canvas.querySelectorAll('.image:not(.shown)').forEach(n => n.remove())

      cp.point.frames.forEach(image => {
        const div = document.createElement("div")
        div.style.backgroundImage = `url(screenshots/${image})`
        div.classList.add('image')
        canvas.appendChild(div)
      })
      
      canvas.querySelector('.image:not(.shown)').classList.add('shown')
      window._Canvas.display.slideshow()
      return Promise.resolve({})
    },
    animate: function(done, _state) {
      const outgoing = window._Canvas.images.querySelector('.shown')  
      let incoming = outgoing.nextElementSibling
      if (!incoming) {
        incoming = window._Canvas.images.firstElementChild
        if (incoming == outgoing) {
          return
        }
      }

      incoming.addEventListener('transitionend', done())
      incoming.classList.add('shown')
      outgoing.classList.remove('shown')
    },
  },
  streetview: {
    wait: 1000,
    enter: function({ point }) {
      const { map } = window._Canvas
      let { position, heading, pitch, zoom } = point.frames ? point.frames[0] : point 
      const pano = map.getStreetView()
      pano.setPosition(position)
      pano.setPov({heading, pitch, zoom})
      
      if (point.id) {
        pano.setPano(point.id)
      }
      
      pano.setVisible(true)
      return new Promise(
        (resolve, _reject) => google.maps.event.addListenerOnce(pano, 'pano_changed', () => {
          map.setStreetView(pano)
          window._Canvas.display.map()
          resolve({frames: point.frames, pano, index: 0})
        })
      )
    },
    animate: function(done, state) {
      const { frames, index, pano } = state
      let incomingIdx = index + 1
      let incoming = frames[incomingIdx]
      if (incomingIdx >= frames.length) {
        incomingIdx = 0
        incoming = frames[0]
        if (incoming.loop == false) {
          return
        }
      }
      state.index = enteringIdx
      
      if (!entering.continue) {
        google.maps.event.addListenerOnce(pano, 'pano_changed', done(state))
      }
      
      const { position, heading, pitch, zoom } = entering
      pano.setPosition(position)
      pano.setPov({heading, pitch, zoom: zoom || 0})
    },
  },
  map: {
    wait: 360,
    enter: function(cp) {
      const { map } = window._Canvas
      const { position, zoom } = cp.point
      map.getStreetView().setVisible(false)
      map.setMapTypeId(cp.type)
      map.panTo(position)
      return new Promise((resolve, _reject) => {
        let current = map.getZoom()
        google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
          window._Canvas.display.map()
          cp.needsAnimation = Math.round(zoom) != current
          resolve({target: Math.round(zoom), current})
        })
      })
    },
    animate: function(done, { target, current }) {
      const { map } = window._Canvas
      if (target != current) {
        current = target > current ? current + 1 : current - 1;
        google.maps.event.addListenerOnce(map, 'zoom_changed', done({target, current}) )
        map.setZoom(current);
      }
    }
  }
}

export default class ControlPoint {
  constructor(node) {
    const name = node.dataset.point
    const point = NamedPoints[name]
    if (!point) {
      throw Error(`point not found "${name}"`)
    }
    
    const { y } = node.getBoundingClientRect();
    this.node = node
    this.name = name
    this.point = point
    this.bounds = [window.scrollY + y - Config.scrollOffset]
    this.shown = false
    this.needsAnimation = point.frames && point.frames.length > 1
    this.type = point.type

    if (point.type == "slideshow") {
      this.helpers = _Helpers.slideshow
    } else {
      this.helpers = _Helpers[point.type == "streetview" ? "streetview" : "map"]
    }
  }

  render() {
    clearTimeout(window.AnimationTimeout)
    this.log('point:render:start')
    this.helpers.enter(this).then((state) => {
      this.log('point:render:done')
      this.shown = true
      if (this.needsAnimation) {
        this.scheduleNext(state)()
      }
    })
  }

  scheduleNext(state) {
    this.log('point:animation:schedule', state)
    return () => {
      clearTimeout(window.AnimationTimeout)
      window.AnimationTimeout = setTimeout(() => {
        this.log('point:animate:run', state)
        this.helpers.animate(this.scheduleNext.bind(this), state)
      }, this.helpers.wait)
    }
  }
  
  log(action, message) {
    if (message) {
      console.debug(`${action}:${this.type}`, message)
    } else {
      console.debug(`${action}:${this.type}`)      
    }
  }

  shouldRender(top) {
    return !this.shown && top >= this.bounds[0] && top < this.bounds[1]
  }
}
