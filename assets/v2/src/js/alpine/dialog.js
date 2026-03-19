export default function dialogModal() {
  return {
    isOpen: false,

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    },
  };
}
