import isInRange from "./isInRange";

/**
 * Таблица символов:
 * 0x00-0x20 (0-32) - пробелы, символы и знаки пунктуации, цифры
 * 0x21-0x63 (33-99) - русский алфавит в двух регистрах
 *
 * 1040 - А -> 33
 * 1071 - Я -> 64
 * 1072 - а -> 65
 * 1103 - я -> 96
 * 1025 - Ё -> 97
 * 1105 - ё -> 98
 */

 export default class Dictionary {

    private sequences: Record<string, number> = {};
    private codes: Record<number, string> = {};
    private size: number = 0;

    public constructor() {
        this.initDictionarys();
    }

    private initDictionarys = () => {
        for (let code = 0x20; code <= 0x40; ++code) {
            this.addLetter(String.fromCharCode(code));
        }

        for (let code = 1040; code <= 1103; ++code) {
            this.addLetter(String.fromCharCode(code));
        }

        this.addLetter('Ё');
        this.addLetter('ё');
        this.addLetter('\n');
    }

    private addLetter = (letter: string) => {
        return this.add(this.getFixedCodeByChar(letter), letter);
    }

    /**
     * Добавление последовательности в словарь
     * Возвращает код символа, используемый в словаре
     */
    private add = (code: number, sequence?: string) => {
        if (!sequence || !sequence.length) {
            throw new Error('Нельзя добавить пустую строку');
        }

        let fixedCode;
        if (!sequence) {
            sequence = String.fromCharCode(code);
            fixedCode = this.getFixedCodeByCode(code);
        } else {
            fixedCode = code;
        }
        this.sequences[sequence] = fixedCode;
        this.codes[fixedCode] = sequence;

        return this.size++;
    }

    /**
     * Возвращает исправленный код по символу
     */
    public getFixedCodeByChar = (char: string): number => this.getFixedCodeByCode(char.charCodeAt(0));

    /**
     * Возвращает исправленный код по настоящему коду символа
     */
    public getFixedCodeByCode = (code: number): number => {
        let fixed = 0;

        if (code === 10) {
            fixed = 99;
        }

        // Пробел, знаки пунктуации, цифры
        if (isInRange(code, 0x20, 0x40)) {
            fixed = code - 0x20;
        }

        // Русский алфавит сдвигаем на место латинского, без "Ё"
        else if (isInRange(code, 1040, 1104) || code === 1105) {
            fixed = code - 1007;
        }

        // Если Ё
        else if (code === 1025) {
            fixed = code - 928;
        }

        return fixed;
    }

    /**
     * Возвращает исправленный код настоящего кода символа
     * Если это символ вне словаря - будет возвращаен 0x1f ("?")
     */
    public getCharByCode = (code: number) => {
        let fixed = this.getFixedCodeByCode(code);

        if (fixed === null) {
            fixed = 0x1f; // "?"
        }

        return String.fromCharCode(fixed);
    }

    /**
     * Возвращает размер словаря
     */
    public getSize = () => this.size;

    /**
     * Проверяет есть ли последовательность в словаре
     */
    public hasSequence = (sequence: string) => (sequence in this.sequences);

    /**
     * Проверка есть ли код в словаре
     */
    public hasCode = (code: number) => (code in this.codes);

    /**
     * Возвращает код последовательности из словаря
     */
    public getCodeOfSequence = (sequence: string) => this.sequences[sequence];

    /**
     * Возвращает последовательность по коду из словаря
     */
    public getSequenceByCode = (code: number) => this.codes[code];

    /**
     * Добавляет последовательность в словарь и возвращает код
     */
    public putSequence = (sequence: string) => this.add(this.size, sequence);

};
