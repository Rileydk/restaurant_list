const selected = function (target, btn, options) {
  return target === btn ? options.fn(this) : options.inverse(this)
}

module.exports = { selected }
