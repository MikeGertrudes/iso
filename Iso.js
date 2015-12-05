var Iso = (function() {

  'use strict';

  const DEFAULTS = {
    active: false,
    backgroundColor: '#CCCCCC',
    input: new Map([
      [
        'BB', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'CB', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'DB', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'BC', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'DC', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'BD', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'CD', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'DD', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'BE', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'DE', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'BF', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'CF', {
          active: true,
          backgroundColor: '#333333'
        }
      ],
      [
        'DF', {
          active: true,
          backgroundColor: '#333333'
        }
      ]
    ])
  };

  class Iso {

    constructor(config) {
      config = config || {};

      this.divisions = config.divisions || 10;

      const alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ];

      this.world = new Map();

      let row;

      for (let i = 0; i < this.divisions; i++) {
        row = alphabet[i]
        for (let j = 0; j < this.divisions; j++) {
          this.world.set(alphabet[j] + row, {
            active: false,
            row: row,
            column: alphabet[j],
          });
        }
      }

      this.input = this.loadInput() || DEFAULTS.input;

      // next steps:
      // conditional apply #333333
      // find a way to map the input coordinates to the world map
      // can we use Map or WeakMap to hold a hard reference to the world object?
      // is that worth it? the Map will only be referencing the world, and we will never destroy the world
      // build the world one function
    }

    resetTheWorld() {
      document.body.style.margin = 0;

      document.body.innerHTML = '';
    }

    buildTheWorld() {
      let fragment = document.createDocumentFragment();

      let that = this;

      this.world.forEach(function(tileValue, tileKey) {
        let element = that.buildElement();

        tileValue.element = element;

        element.innerHTML = tileKey;

        element.addEventListener('click', function() {
          if (!tileValue.active) {
            element.style.backgroundColor = 'yellow';
            tileValue.active = true;
          } else {
            element.style.backgroundColor = DEFAULTS.backgroundColor;
            tileValue.active = false;
          }

          that.saveInput(tileValue, tileKey);
        });

        fragment.appendChild(element);
      }, this.world);

      document.body.appendChild(fragment);
    }

    applyInputs() {
      let fragment = document.createDocumentFragment();

      let that = this;

      this.input.forEach(function(value, key) {
        let element = that.world.get(key).element;

        element.style.backgroundColor = value.backgroundColor;

      }, this.input);
    }

    saveInput(tileValue, tileKey) {
      this.input.set(tileKey, {
        active: true,
        backgroundColor: 'yellow'
      });

      sessionStorage.setItem('input', JSON.stringify(Array.from(this.input.entries())));
    }

    loadInput() {
      let retrieved = sessionStorage.getItem('input');

      return retrieved ? new Map(JSON.parse(retrieved)) : false;
    }

    getWindowWidth() {
      return window.outerWidth;
    }

    getWindowHeight() {
      return window.outerHeight;
    }

    buildElement() {
      let element = document.createElement('div');

      element.style.width = this.getWindowWidth() / this.divisions + 'px';

      element.style.height = element.style.width;

      element.style.backgroundColor = '#cccccc';

      element.style.display = 'inline-block';

      return element;
    }

    addElement(element) {
      document.body.appendChild(element);
    }

  }

  return Iso;

})();
