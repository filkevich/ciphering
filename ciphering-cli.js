function caesar_shift(lowerCasedLetter, config) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const currentIndex = alphabet.indexOf(lowerCasedLetter)
  const shift = config ? 1 : -1
  const shiftedIndex = currentIndex + shift
  if (shiftedIndex > 25) return alphabet[shiftedIndex - 26]
  if (shiftedIndex < 0) return alphabet[shiftedIndex + 26]
  return alphabet[shiftedIndex]
}

function caesar(letter, config) {
  const isLetter = letter.match(/[A-Z]/gi)
  if (!isLetter) return letter
  const isUpperCased = letter.match(/[A-Z]/g)
  const letterToShift = isUpperCased ? letter.toLowerCase() : letter
  const shiftedLetter = caesar_shift(letterToShift, config)
  return isUpperCased ? shiftedLetter.toUpperCase() : shiftedLetter
}

function iterate(string, shift) {

  return string
    .split('')
    .map(char => caesar(char, shift))
    .join('')
}

const coded = iterate('ZZZzzz!', 1)
const decoded = iterate(coded, 0)

console.log('coded: ', coded)
console.log('decoded: ', decoded)
