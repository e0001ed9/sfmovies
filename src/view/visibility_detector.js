export default class {
  constructor(component) {
    this.component = component;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (document.hidden)
      return false;

    if (this._inViewport()) {
      return this._wasRendered = true;
    } else {
      return this._wasRendered = false;
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this._checkViewport.bind(this));
    this._interval = setInterval(this._checkViewport.bind(this), 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._checkViewport.bind(this));
    clearInterval(this._interval);
  }

  _checkViewport() {
    if (!this._wasRendered && this._inViewport()) {
      this._wasRendered = true;
      this.component.forceUpdate()
    }
  }

  _inViewport() {
    if (this.component.getDOMNode() === null) {
      return false;
    }

    const rect = this.component.getDOMNode().getBoundingClientRect();

    const vpHeight = window.innerHeight || document.documentElement.clientHeight;
    const vpWidth = window.innerWidth || document.documentElement.clientWidth;

    return rect.bottom >= 0 && rect.right >= 0 && rect.top <= vpHeight && rect.left <= vpWidth;
  }
}
