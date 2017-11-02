console.info('[videojs.foo.js] foo script loaded')

;((function iife(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory.bind(this, root, root.videojs))
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(root, root.videojs)
  } else {
    factory(root, root.videojs)
  }
})(window, function makeFoo(window, videojs) {
  videojs.plugin('foo', foo)
  console.info('[videojs.foo.js] videojs available')
  console.info('[videojs.foo.js] register videojs plugin foo done')
}))

function foo (options) {
  var player = this
  console.info('[videojs.foo.js] lodash ready to use')
  console.info('[videojs.foo.js] player available')
  console.info('[videojs.foo.js] foo activated, see options:', options)
  return this
}
