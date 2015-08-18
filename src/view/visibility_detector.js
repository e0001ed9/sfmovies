// roughly based on https://github.com/spudly/react-viewport-mixin with some improvements.

export default class {
  constructor(component, onFirstRender = () => {}) {
    this.component = component;
    this.onFirstRender = onFirstRender;
    this.hasRendered = false;
  }

  shouldComponentUpdate() {
    if (document.hidden)
      return false;

    if (this.inViewport()) {
      this.onRender();
      return this.wasRendered = true;
    } else {
      return this.wasRendered = false;
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkViewport.bind(this));
    this.interval = setInterval(this.checkViewport.bind(this), 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkViewport.bind(this));
    clearInterval(this.interval);
  }

  onRender() {
    if (this.hasRendered === false) {
      this.onFirstRender();
    }

    this.hasRendered = true;
  }

  checkViewport() {
    if (!this.wasRendered && this.inViewport()) {
      this.onRender();
      this.wasRendered = true;
      this.component.forceUpdate();
    }
  }

  inViewport() {
    let node = null;

    try {
      node = this.component.getDOMNode();

      if (node === null) {
        return false;
      }
    } catch(e) {
      // invariant violation: we're no longer mounted.
      // see: http://jaketrent.com/post/set-state-in-callbacks-in-react/
      return false;
    }

    const rect = node.getBoundingClientRect();

    const vpHeight = window.innerHeight || document.documentElement.clientHeight;
    const vpWidth = window.innerWidth || document.documentElement.clientWidth;

    return rect.bottom >= 0 && rect.right >= 0 && rect.top <= vpHeight && rect.left <= vpWidth;
  }
}
