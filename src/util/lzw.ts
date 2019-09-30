import Dictionary from "./dict";

/**
 * Реализация алгоритма ЗЛВ
 */

export default class LZW {

    /**
     * Функция запаковщика
     * @returns возвращает uint8-массив запакованных байт
     */
    public static compress = (input: string): Uint8Array => {
        if (!input || !input.length) {
            throw new Error('Задана пустая строка');
        }

        const dict = new Dictionary;

        let w: string = "";
        const result: number[] = [];

        for (let i = 0; i < input.length; ++i) {
            let c = input.charAt(i);
            let wc = w + c;

            if (dict.hasSequence(wc)) {
                w = wc;
            } else {
                result.push(dict.getCodeOfSequence(w));
                dict.putSequence(wc);
                w = String(c);
            }
        }

        if (w) {
            result.push(dict.getCodeOfSequence(w));
        }

        return Uint8Array.from(result);
    }

    /**
     * Функция распаковщика
     * @returns возвращает строку или null, если что-то пошло не так
     */
    public static decompress = (input: Uint8Array): string | null => {
        let w;
        let k;
        let result;
        let entry = "";

        const dict = new Dictionary;

        w = dict.getSequenceByCode(input[0]);

        result = w;
        for (let i = 1; i < input.length; ++i) {
            k = input[i];

            if (k === undefined) {
                continue;
            }

            if (dict.hasCode(k)) {
                entry = dict.getSequenceByCode(k);
            } else {
                if (k === dict.getSize()) {
                    entry = w + w.charAt(0);
                } else {
                    return null;
                }
            }

            result += entry;
            dict.putSequence(w + entry.charAt(0));
            w = entry;
        }

        return result;
    }
}
