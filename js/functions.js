function isValidString(str, length) {
  return str.length <= length;
}

console.log('Тест №1. Ожидаю true, получаю -', isValidString('проверяемая строка', 20));
console.log('Тест №2. Ожидаю true, получаю -', isValidString('проверяемая строка', 18));
console.log('Тест №3. Ожидаю false, получаю -', isValidString('проверяемая строка', 10));

function isPalindrom(str) {
  const normalizedStr = str.toLowerCase().replaceAll(' ', '');
  const reversedStr = [...normalizedStr].reverse().join('');
  return normalizedStr === reversedStr;
}

console.log('Тест №4. Ожидаю true, получаю -', isPalindrom('топот'));
console.log('Тест №5. Ожидаю true, получаю -', isPalindrom('ДовОд'));
console.log('Тест №6. Ожидаю false, получаю -', isPalindrom('Кекс'));
console.log('Тест №7. Ожидаю true, получаю -', isPalindrom('Лёша на полке клопа нашёл '));

function stringToNumber(str) {
  return [...str]
    .filter((item) => !isNaN(parseInt(item, 10)))
    .join('')
    || NaN;
}

console.log('Тест №8. Ожидаю 2023, получаю -', stringToNumber('2023 год'));
console.log('Тест №9. Ожидаю 2022, получаю -', stringToNumber('ECMAScript 2022'));
console.log('Тест №10. Ожидаю 105, получаю -', stringToNumber('1 кефир, 0.5 батона'));
console.log('Тест №11. Ожидаю 007, получаю -', stringToNumber('агент 007'));
console.log('Тест №12. Ожидаю NaN, получаю -', stringToNumber('а я томат'));
