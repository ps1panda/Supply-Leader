export default function partnerMarquee() {
    return {
        offset: 0,
        speed: 0.6,
        frameId: null,
        trackWidth: 0,
        paused: false,
        prefersReducedMotion: false,
        resizeHandler: null,
        init() {
            this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            this.measure();

            this.resizeHandler = () => this.measure();
            window.addEventListener("resize", this.resizeHandler, { passive: true });

            if (this.prefersReducedMotion) {
                return;
            }

            const step = () => {
                if (!this.paused && this.trackWidth > 0) {
                    this.offset -= this.speed;

                    if (-this.offset >= this.trackWidth) {
                        this.offset += this.trackWidth;
                    }
                }

                this.frameId = window.requestAnimationFrame(step);
            };

            this.frameId = window.requestAnimationFrame(step);
        },
        measure() {
            this.trackWidth = this.$refs.set?.offsetWidth ?? 0;

            if (this.trackWidth === 0 || -this.offset < this.trackWidth) {
                return;
            }

            this.offset = 0;
        },
        pause() {
            this.paused = true;
        },
        resume() {
            this.paused = false;
        },
        trackStyle() {
            return `transform: translate3d(${this.offset}px, 0, 0);`;
        },
        destroy() {
            if (this.frameId) {
                window.cancelAnimationFrame(this.frameId);
            }

            if (this.resizeHandler) {
                window.removeEventListener("resize", this.resizeHandler);
            }
        }
    };
}
