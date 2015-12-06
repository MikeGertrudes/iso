var Iso = (function() {

  'use strict';

  const DEFAULTS = {
    active: false,
    activeBackgroundColor: '#333333',
    inactiveBackgroundColor: '#FFFFFF',
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

  const characterMap = new Map([
    ['0', [
      [true, true, true],
      [true, false, true],
      [true, false, true],
      [true, false, true],
      [true, true, true] 
    ]],
    ['1', [
      [true, true, false],
      [false, true, false],
      [false, true, false],
      [false, true, false],
      [true, true, true] 
    ]],
    ['2', [
      [true, true, true],
      [false, false, true],
      [true, true, true],
      [true, false, false],
      [true, true, true],
    ]],
    ['3', [
      [true, true, true],
      [false, false, true],
      [false, true, true],
      [false, false, true],
      [true, true, true],
    ]],
    ['4', [
      [true, false, true],
      [true, false, true],
      [true, true, true],
      [false, false, true],
      [false, false, true],
    ]],
    ['5', [
      [true, true, true],
      [true, false, false],
      [true, true, true],
      [false, false, true],
      [true, true, true],
    ]],
    ['6', [
      [true, true, true],
      [true, false, false],
      [true, true, true],
      [true, false, true],
      [true, true, true],
    ]],
    ['7', [
      [true, true, true],
      [false, false, true],
      [false, false, true],
      [false, true, false],
      [false, true, false],
    ]],
    ['8', [
      [true, true, true],
      [true, false, true],
      [true, true, true],
      [true, false, true],
      [true, true, true] 
    ]],
    ['9', [
      [true, true, true],
      [true, false, true],
      [true, true, true],
      [false, false, true],
      [true, true, true] 
    ]],
    [':', [
      [false],
      [true],
      [false],
      [true],
      [false]
    ]]
  ]);

  const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  class Iso {

    constructor(config) {
      config = config || {};

      this.divisions = config.divisions || 10;

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

      const time = new Date();

      const currentTime = getTimeUnitWithLeadingZeroes(time.getHours()) + ':' + getTimeUnitWithLeadingZeroes(time.getMinutes());

      let cachedTime = currentTime;

      this.input = this.stringToInputMap(currentTime) || this.loadInput() || DEFAULTS.input;

      // TODO: set the time initially, and determine
      // how many seconds are left until the minute changes
      // then change the time then, and kick off this setInterval
      // for every minute from them on
      // TODO: iso grid, how we will do this? CSS?
      // TODO: more efficient reset- why reset everything?
      const timer = setInterval(() => {
        const time = new Date();

        const currentTime = getTimeUnitWithLeadingZeroes(time.getHours()) + ':' + getTimeUnitWithLeadingZeroes(time.getMinutes());

        if (currentTime !== cachedTime) {
          this.input = this.stringToInputMap(currentTime);

          test.resetTheWorld();

          test.buildTheWorld();

          this.applyInputs();

          cachedTime = currentTime;
        }

      }, 1000);

      function getTimeUnitWithLeadingZeroes(unit) {
        unit = unit || '00';

        if (unit < 10) {
          unit = '0' + unit;
        }

        return unit;
      }
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

        //element.innerHTML = tileKey;

        element.addEventListener('click', function() {
          if (!tileValue.active) {
            element.style.backgroundColor = DEFAULTS.activeBackgroundColor;

            tileValue.active = true;
            tileValue.backgroundColor = DEFAULTS.activeBackgroundColor;

            that.saveInput(tileValue, tileKey);
          } else {
            element.style.backgroundColor = DEFAULTS.inactiveBackgroundColor;

            tileValue.active = false;
            tileValue.backgroundColor = DEFAULTS.inactiveBackgroundColor;

            that.removeInput(tileValue, tileKey);
          }

        });

        fragment.appendChild(element);
      }, this.world);

      document.body.appendChild(fragment);
    }

    applyInputs() {
      let fragment = document.createDocumentFragment();

      let that = this;

      this.input.forEach(function(value, key) {
        let tile = that.world.get(key);

        tile.active = value.active;

        tile.backgroundColor = value.backgroundColor;

        let element = tile.element;

        element.style.backgroundColor = value.backgroundColor;
      }, this.input);
    }

    saveInput(tileValue, tileKey) {
      this.input.set(tileKey, {
        active: true,
        backgroundColor: DEFAULTS.activeBackgroundColor
      });

      sessionStorage.setItem('input', JSON.stringify(Array.from(this.input.entries())));
    }

    removeInput(tileValue, tileKey) {
      this.input.delete(tileKey);

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

      element.style.backgroundColor = DEFAULTS.inactiveBackgroundColor;

      element.style.display = 'inline-block';

      element.style.boxSizing = 'border-box';

      // element.style.border = '1px solid #e6e6e6';

      // element.style.color = '#e6e6e6';

      return element;
    }

    addElement(element) {
      document.body.appendChild(element);
    }

    stringToInputMap(string) {
      string = string ||  '00:00';

      const characterSpacing = 1;

      let startingColumnIndex = 1;

      let startingRowIndex = 1;

      let currentCharacterStartingColumn = startingColumnIndex;

      let input = new Map();

      string.split('').forEach((character, characterIndex) => {
        const currentCharacter = characterMap.get(character);

        if (currentCharacter) {
          const currentCharacterHeight = currentCharacter.length;

          currentCharacter.forEach((row, rowIndex) => {
            let inputRow = alphabet[startingRowIndex + rowIndex];

            row.forEach((isActive, columnIndex) => {
              if (isActive) {
                input.set(alphabet[currentCharacterStartingColumn + columnIndex] + inputRow, {
                  active: true,
                  backgroundColor: DEFAULTS.activeBackgroundColor
                })
              }
            });

            if (rowIndex === currentCharacterHeight - 1) {
              currentCharacterStartingColumn = currentCharacterStartingColumn + row.length + characterSpacing;
            }
          });
        }
      });

      return input;
    }

  }

  return Iso;

})();
