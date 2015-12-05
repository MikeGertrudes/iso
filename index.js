var Iso = function Iso(config) {
  config = config || {};

  this.divisions = config.divisions || 10;

  var alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  this.world = [];

  var row;

  for (var i = 0; i < this.divisions; i++) {
    row = alphabet[i]
    for (var j = 0; j < this.divisions; j++) {
      this.world.push([alphabet[j], row]);
    }
  }

  this.input = new Map([
    [
      ['A', 'A'], {
        active: true,
        backgroundColor: 'blue'
      }
    ],
    [
      ['B', 'A'], {
        active: true,
        backgroundColor: 'blue'
      }
    ],
    [
      ['C', 'A'], {
        active: true,
        backgroundColor: 'blue'
      }
    ],
    [
      ['A', 'B'], {
        active: true,
        backgroundColor: 'blue'
      }
    ],
    [
      ['C', 'B'], {
        active: true,
        backgroundColor: 'blue'
      }
    ],
    [
      ['A', 'C'], {
        active: true,
        backgroundColor: 'blue'
      }
    ],
    [
      ['B', 'C'], {
        active: true,
        backgroundColor: 'blue'
      }
    ],
    [
      ['C', 'C'], {
        active: true,
        backgroundColor: 'blue'
      }
    ]
  ]);

  // next steps:
  // conditional apply blue
  // find a way to map the input coordinates to the world map
  // can we use Map or WeakMap to hold a hard reference to the world object?
  // is that worth it? the Map will only be referencing the world, and we will never destroy the world
  // build the world one function
};

Iso.prototype.resetTheWorld = function resetTheWorld() {
  document.body.style.margin = 0;

  document.body.innerHTML = '';
};

Iso.prototype.buildTheWorld = function buildTheWorld() {
  var fragment = document.createDocumentFragment();

  var that = this;

  this.world.forEach(function(tile) {
    var element = that.buildElement();

    tile.element = element;

    element.innerHTML = tile[0] + tile[1];

    this.appendChild(element);
  }, fragment);

  document.body.appendChild(fragment);
};

Iso.prototype.buildTheInputs = function buildTheInputs() {
  var fragment = document.createDocumentFragment();

  var that = this;

  this.input.forEach(function(value, key) {
    var element = that.buildElement();

    element.style.backgroundColor = value.backgroundColor;

    this.appendChild(element);
  }, fragment);

  document.body.appendChild(fragment);
};

Iso.prototype.getWindowWidth = function getWindowWidth() {
  return window.outerWidth;
};

Iso.prototype.getWindowHeight = function getWindowHeight() {
  return window.outerHeight;
};

Iso.prototype.buildElement = function buildElement() {
  var element = document.createElement('div');

  element.style.width = this.getWindowWidth() / this.divisions + 'px';

  element.style.height = element.style.width;

  element.style.backgroundColor = 'red';

  element.style.display = 'inline-block';

  return element;
};

Iso.prototype.addElement = function addElement(element) {
  document.body.appendChild(element);
};