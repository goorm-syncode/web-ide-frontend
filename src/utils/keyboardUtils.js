/**
 * Maps KeyboardEvent.code to English characters (Qwerty layout).
 * This allows forcing English input regardless of the current IME (Input Method Editor) state.
 */

const CODE_TO_CHAR = {
  // Letters
  KeyA: ['a', 'A'],
  KeyB: ['b', 'B'],
  KeyC: ['c', 'C'],
  KeyD: ['d', 'D'],
  KeyE: ['e', 'E'],
  KeyF: ['f', 'F'],
  KeyG: ['g', 'G'],
  KeyH: ['h', 'H'],
  KeyI: ['i', 'I'],
  KeyJ: ['j', 'J'],
  KeyK: ['k', 'K'],
  KeyL: ['l', 'L'],
  KeyM: ['m', 'M'],
  KeyN: ['n', 'N'],
  KeyO: ['o', 'O'],
  KeyP: ['p', 'P'],
  KeyQ: ['q', 'Q'],
  KeyR: ['r', 'R'],
  KeyS: ['s', 'S'],
  KeyT: ['t', 'T'],
  KeyU: ['u', 'U'],
  KeyV: ['v', 'V'],
  KeyW: ['w', 'W'],
  KeyX: ['x', 'X'],
  KeyY: ['y', 'Y'],
  KeyZ: ['z', 'Z'],

  // Digits
  Digit1: ['1', '!'],
  Digit2: ['2', '@'],
  Digit3: ['3', '#'],
  Digit4: ['4', '$'],
  Digit5: ['5', '%'],
  Digit6: ['6', '^'],
  Digit7: ['7', '&'],
  Digit8: ['8', '*'],
  Digit9: ['9', '('],
  Digit0: ['0', ')'],

  // Symbols
  Minus: ['-', '_'],
  Equal: ['=', '+'],
  BracketLeft: ['[', '{'],
  BracketRight: [']', '}'],
  Backslash: ['\\', '|'],
  Semicolon: [';', ':'],
  Quote: ["'", '"'],
  Comma: [',', '<'],
  Period: ['.', '>'],
  Slash: ['/', '?'],
  Backquote: ['`', '~'],
  Space: [' ', ' '],
};

/**
 * Returns the English character associated with a physical key code.
 * @param {string} code - KeyboardEvent.code
 * @param {boolean} isShifted - Whether shift key is pressed
 * @returns {string|null} - The mapped character, or null if not mapped.
 */
export const getEnglishCharFromCode = (code, isShifted) => {
  const mapping = CODE_TO_CHAR[code];
  if (!mapping) return null;
  return isShifted ? mapping[1] : mapping[0];
};
