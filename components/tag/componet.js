(() => {
  class Tag extends HTMLElement {
    constructor(props) {
      console.log(props);
      super();
      console.dir(this);
      const { text, closable } = this;
      console.log(text, closable);

      const container = document.createElement("span");
      container.innerText = text;
      const Text = document.createElement("span");
      const closeIcon = document.createElement("span");

      container.append(Text, closeIcon);
      this.appendChild(container);
    }
  }

  customElements.define("cus-tag", Tag);
})();
