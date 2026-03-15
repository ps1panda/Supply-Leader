import Alpine from "alpinejs";
import "../css/app.css";

window.Alpine = Alpine;

Alpine.data("reveal", (delay = 0) => ({
  shown: false,
  init() {
    const run = () => {
      window.setTimeout(() => {
        window.requestAnimationFrame(() => {
          this.shown = true;
        });
      }, delay);
    };

    if (document.readyState === "complete") {
      run();
      return;
    }

    window.addEventListener("load", run, { once: true });
  }
}));

Alpine.data("scrollReveal", (options = {}) => ({
  shown: false,
  observer: null,
  init() {
    const threshold = options.threshold ?? 0.2;
    const rootMargin = options.rootMargin ?? "0px 0px -10% 0px";

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        this.shown = true;
        this.observer?.disconnect();
        this.observer = null;
      },
      { threshold, rootMargin }
    );

    this.observer.observe(this.$el);
  },
  destroy() {
    this.observer?.disconnect();
    this.observer = null;
  }
}));

Alpine.start();
