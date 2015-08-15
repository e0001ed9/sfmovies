export default {
  shouldComponentUpdate(nextProps, nextState) {
    if (document.hidden)
      return false;

    if (this._inViewport()) {
      return this._wasRendered = true;
    } else {
      return this._wasRendered = false;
    }
  },

  componentDidMount() {
    window.addEventListener('scroll', this._checkViewport);
    this._interval = setInterval(this._checkViewport(), 1000);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this._checkViewport);
    clearInterval(this._interval);
  },

  // mixin private methods
  _checkViewport() {
    if (!this._wasRendered && this._inViewport()) {
      this._wasRendered = true;
      this.forceUpdate()
    }
  },

  _inViewport() {
    const rect = this.getDOMNode().getBoundingClientRect();

    const vpHeight = window.innerHeight || document.documentElement.clientHeight;
    const vpWidth = window.innerWidth || document.documentElement.clientWidth;

    return rect.bottom >= 0 && rect.right >= 0 && rect.top <= vpHeight && rect.left <= vpWidth;
  }
};
