const fs = require('fs');
const LZW = require('./lzw');

// Чтение строки из файла
const input = fs.readFileSync('test.txt', { encoding: 'utf-8' });

// Сжатие строки
const resCompressed = LZW.compress(input);

// Распаковка сжатой строки
const resDepcomressed = LZW.decompress(resCompressed);

// Вывод исходной, сжатой и распакованной строки и их длины
process.stdout.write(`Input:        ${input} (len=${input.length})\nCompressed:   ${LZW.toBinary(resCompressed)} (length=${resCompressed.length})\nDecompressed: ${resDepcomressed} (len=${resDepcomressed.length})\nDiff: ${100 - (input.length / resCompressed.length)}%\n`);

