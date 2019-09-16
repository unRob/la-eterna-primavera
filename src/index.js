import throttle from 'lodash.throttle'
import NamedPoints from './points'
import ControlPoint from './control-point'
import Config from './config'

window.AnimationTimeout = null;
window._Canvas = {
  display: {
    slideshow: () => _Canvas.mapDiv.classList.add('hidden'),
    map: () => _Canvas.mapDiv.classList.remove('hidden')
  },
  images: document.querySelector('#screenshots'),
  map: null,
  mapDiv: document.getElementById('map'),
}

const ControlPoints = []

// The main loop
function Render() {
  // Figure out where the user is at now
  const top = window.scrollY;
  for (let cp of ControlPoints) {
    // Fiind the content that should be rendered
    if (cp.shouldRender(top)) {
      // Stop any pending animations
      clearTimeout(AnimationTimeout)
      console.info(`view:${cp.type}:begin ${cp.name}`)
      // Update state
      ControlPoints.forEach(n => n.shown = false);
      console.debug(`view:${cp.type}:entering`)
      // Schedule the transition to new content
      return cp.render()
    }
  }
}

if (Config.debugEnabled) {
  // Prints copy-pasteable control-point frame location
  window._debug_sv = function() {
    const {pov, getLocation: pos} = _Canvas.map.getStreetView()
    return {pov, position: pos().latLng.toJSON()}
  }
}

// Setup the map canvas once the google maps sdk loads
window.initMap = function() {
  const { position: center, zoom, type } = NamedPoints.mexico
  _Canvas.map = new google.maps.Map(_Canvas.mapDiv, {center, zoom, streetViewControl: true})
  _Canvas.map.setMapTypeId(type);

  document.querySelectorAll('.control-map').forEach(n => {
    const prev = ControlPoints[ControlPoints.length - 1]
    const cp = new ControlPoint(n)
    ControlPoints.push(cp)
    if (prev) {
      // Add the new control point upper bound as the previous' cp lower bound
      prev.bounds.push(cp.bounds[0])
    }
  })
  const last = ControlPoints[ControlPoints.length -1]
  // end the last at the very bottom of the document
  // https://javascript.info/size-and-scroll-window#width-height-of-the-document
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  last.bounds.push(document.body.scrollHeight)

  // Setup our scroll listener
  window.addEventListener('scroll',
    // trigger at most once every 350ms
    throttle(Render, Config.scrollDelay, {leading: false})
  )
  // Setup the canvas
  Render();
}

// Load google maps once the document is ready
window.addEventListener('load', function(){
  const script = document.createElement("script")
  script.async = true
  script.defer = true
  script.src = `https://maps.googleapis.com/maps/api/js?key=${Config.key}&callback=initMap`
  document.body.appendChild(script)
})
