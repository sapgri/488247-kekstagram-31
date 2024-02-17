function isValidString(str, length) {
  return str.length <= length;
}

function isPalindrom(str) {
  const normalizedStr = str.toLowerCase().replaceAll(' ', '');
  const reversedStr = [...normalizedStr].reverse().join('');
  return normalizedStr === reversedStr;
}

function stringToNumber(str) {
  return [...str]
    .filter((item) => !isNaN(parseInt(item, 10)))
    .join('')
    || NaN;
}