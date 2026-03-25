export default function horizontalPager() {
    return {
        activeIndex: 0,
        total: 1,
        init() {
            this.update();

            const sync = () => this.update();
            this.$refs.track?.addEventListener("scroll", sync, { passive: true });
            window.addEventListener("resize", sync, { passive: true });
        },
        scrollTo(index) {
            const track = this.$refs.track;
            if (!track) {
                return;
            }

            const card = track.children[index];
            if (!card) {
                return;
            }

            track.scrollTo({
                left: card.offsetLeft - track.offsetLeft,
                behavior: "smooth"
            });
        },
        scrollByPage(direction) {
            this.scrollTo(Math.max(0, Math.min(this.total - 1, this.activeIndex + direction)));
        },
        update() {
            const track = this.$refs.track;
            if (!track) {
                return;
            }

            const cards = Array.from(track.children);
            this.total = cards.length || 1;

            const current = cards.reduce(
                (closest, card, index) => {
                    const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);

                    if (distance < closest.distance) {
                        return { distance, index };
                    }

                    return closest;
                },
                { distance: Number.POSITIVE_INFINITY, index: 0 }
            );

            this.activeIndex = current.index;
        }
    };
}
