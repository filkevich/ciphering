const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE_REGEXP = /[A-Z]/
const LETTER_REGEXP = /[a-z]/i
const CIPHER_CONFIG_REGEXP = /^[CR][01]$|^[A]$/

function ciphersFromConfig(config) {
  const ciphers = config.split('-')
  const isValid = ciphers.every(elem => CIPHER_CONFIG_REGEXP.test(elem))
  
  return isValid ? ciphers : false
}

function convertCurrentShift(currentShift) {
  if (currentShift >= 0 && currentShift <= 25) return currentShift

  const multiple = Math.trunc(Math.abs(currentShift / 25))
  if (currentShift < 0) {
    const convertedShift = currentShift + multiple * 25 + 26
    return convertedShift
  }
  if (currentShift > 0) {
    const convertedShift = currentShift - multiple * 25 - 1
    return convertedShift
  }
}

function shiftedPosition(ciphersArr, initialPosition) {
  return ciphersArr.reduce((prevShift, currentCipher) => {
    const [cipher, direction] = currentCipher.split('')
    if (cipher === 'A') {
      const currentShiftA = 25 - prevShift
      return convertCurrentShift(currentShiftA)
    }

    const shiftDirection = direction === '1'
    if (cipher === 'C') {
      const currentShiftC = shiftDirection ? prevShift + 1 : prevShift - 1
      return convertCurrentShift(currentShiftC)
    }

    if (cipher === 'R') {
      const currentShiftR = shiftDirection ? prevShift + 8 : prevShift - 8
      return convertCurrentShift(currentShiftR)
    }
  }, initialPosition)
}

function doShift(char, ciphersArr) {
  const isLetter = LETTER_REGEXP.test(char)
  if (!isLetter) return char

  const isLetterUpperCase = UPPERCASE_REGEXP.test(char)

  const currentPosition = ALPHABET.indexOf(char.toLowerCase())
  const newPosition = shiftedPosition(ciphersArr, currentPosition)
  const shiftedChar = ALPHABET[newPosition]

  if (isLetterUpperCase) return shiftedChar.toUpperCase()
  return shiftedChar
}

function doCipher(str, config) {
  const ciphersArr = ciphersFromConfig(config)
  if (!ciphersArr) return 'The config is not valid. Please correct it. Example: "C1-C1-C0-R1-A"'

  return str
    .split('')
    .map(char => doShift(char, ciphersArr))
    .join('')
}

const result = doCipher('This is secret. Message about "_" symbol!', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1')
console.log(result)
