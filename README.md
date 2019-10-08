## LZW text archiver
Данная "софтина" позволяет запаковать (сжать) и распаковать (восстановить) текст на русском языке при помощи алгоритма [ЗЛВ](https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC_%D0%9B%D0%B5%D0%BC%D0%BF%D0%B5%D0%BB%D1%8F_%E2%80%94_%D0%97%D0%B8%D0%B2%D0%B0_%E2%80%94_%D0%92%D0%B5%D0%BB%D1%87%D0%B0).

> Поскольку эта софтина выполнялась в рамках научно-исследовательской работы, есть ограничения по реаизации алгоритма:
> * Разрешены только русские символы (`А-Я`, `а-я`, `Ё`, `ё`) и символы из диапазона `32-64` ASCII.

## Использование
```bash
git clone git@github.com:vladislav805/suai-lzw-archiver.git

npm install

npm start
```
