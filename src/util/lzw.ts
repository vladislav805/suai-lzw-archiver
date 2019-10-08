import Dictionary from "./dict";

/**
 * Реализация алгоритма ЗЛВ
 */

export default class LZW {

    /**
     * Функция запаковщика
     * @returns возвращает uint16-массив запакованных байт
     */
    public static compress = (input: string): Uint16Array => {
        if (!input || !input.length) {
            throw new Error('Задана пустая строка');
        }

        // Шаг 1. Инициализация словаря всеми возможными односимвольными фразами.
        const dict: Dictionary = new Dictionary();

        let w: string = ""; // входная фраза; более длинная строка из корня дерева, предшествующая k в тексте
        const result: number[] = []; // результат сжатия; коды символов из словаря

        for (let i = 0; i < input.length; ++i) {
            // Шаг 2. Считать очередной символ k из текста
            let k = input.charAt(i);

            // Новая запись/фраза словаря
            let wk = w + k;

            // Шаг 3. Если фраза WK уже есть в словаре
            if (dict.hasSequence(wk)) {
                // То присвоить входной фразе W значение WK и перейти к шагу 2.
                w = wk;
                continue;
            }

            // Шаг 4. Если фразы WK нет
            // 4.1. получить код W из словаря
            const codeW = dict.getCodeOfSequence(w);

            // 4.2. добавить WK в словарь
            dict.putSequence(wk);

            // 4.3. присвоить входной фразе W значение K
            w = String(k);

            // 4.4. добавить код W в результат
            result.push(codeW);
        }

        // Шаг 5. Если сообщение закончилось и остался W
        if (w) {
            // то выдать код для W
            result.push(dict.getCodeOfSequence(w));
        }

        return Uint16Array.from(result);
    }

    /**
     * Функция распаковщика
     * @returns возвращает распаованные данные
     * @throws если что-то пошло не так
     */
    public static decompress = (input: Uint16Array): string => {
        let k;
        let entry = "";

        // Шаг 1. Инициализация словаря всеми возможными односимвольными фразами.
        const dict = new Dictionary();

        // Инициализация фразы W первым символом сообщения по коду
        let w = dict.getSequenceByCode(input[0]);

        let result = w;

        for (let i = 1; i < input.length; ++i) {
            // Шаг 2. Считать очередной код символа k
            k = input[i];

            // Пропускаем символы, которые не входят в словарь
            if (k === undefined) {
                continue;
            }

            // Шаг 3. Если код k уже есть в словаре
            if (dict.hasCode(k)) {
                // То получаем фразу по коду
                entry = dict.getSequenceByCode(k);
            } else {
                // Иначе
                // Если k - это следующий символ, после последнего в словаре
                if (k === dict.getSize()) {
                    // То конкатенируем его с последней фразой
                    entry = w + w.charAt(0);
                } else {
                    // Иначе это неизвестный символ, ошибка декодирования
                    throw new Error('Данные повреждены, распаковка невозможна');
                }
            }

            // Добавляем entry в результат
            result += entry;

            // Добавляем в словарь предыдущую фразу и первый символ в словарь
            dict.putSequence(w + entry.charAt(0));

            // Заменяем последнюю фразу текущим элементом
            w = entry;
        }

        return result;
    }
}
