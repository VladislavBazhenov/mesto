export { Section };

class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document
    .querySelector(containerSelector);
  }
  
createElement() {
  this._items.reverse().forEach((item) => {
    this._renderer(item);
  });
};


addItem(elem) {
  this._container.prepend(elem);
};

}