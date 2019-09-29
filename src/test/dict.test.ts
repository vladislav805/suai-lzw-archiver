import {} from "jest";
import Dictionary from "../util/dict";

let dict: Dictionary;

beforeEach(() => dict = new Dictionary());

it('Должны совпадать исправленные коды символов русского алфавита', () => {
    const data: Record<string, number> = {
        ' ': 0,
        'А': 33,
        'Я': 64,
        'а': 65,
        'я': 96,
        'Ё': 97,
        'ё': 98
    };

    Object.keys(data).forEach((key: string) => expect(dict.getFixedCodeByChar(key)).toBe(data[key]));
})

it('Код для любого английского символа должен быть 0', () => {
    expect(dict.getFixedCodeByChar('f')).toBe(0);
    expect(dict.getFixedCodeByChar('a')).toBe(0);
    expect(dict.getFixedCodeByChar('l')).toBe(0);
    expect(dict.getFixedCodeByChar('F')).toBe(0);
    expect(dict.getFixedCodeByChar('Z')).toBe(0);
    expect(dict.getFixedCodeByChar('😀')).toBe(0);
});

it('Добавить неизвестную последовательность и проверить её код', () => {
    // Наша последовательность
    const seq = 'Йцу';

    // Запоминаем длину словаря
    let currentSize = dict.getSize();

    // Проверяем, что сейчас этой последовательности нет
    expect(dict.hasSequence(seq)).toBe(false);

    // Добавляем и сохраняем её код
    const codeOfSeq = dict.putSequence(seq);

    // Проверяем, что новая последовательность получила код 
    expect(codeOfSeq).toBe(currentSize);

    ++currentSize;

    // Проверяем что размер увеличился
    expect(dict.getSize()).toBe(currentSize);

    // Проверяем, что последовательность теперь есть в словаре
    expect(dict.hasSequence(seq)).toBe(true);

    // Проверяем, что по коду в словаре есть последовательность
    expect(dict.hasCode(codeOfSeq)).toBe(true);

    // Проверяем, что код последовательности из словаря совпдает
    // с выданным при добавлении
    expect(dict.getCodeOfSequence(seq)).toBe(codeOfSeq);
});

it('При попытке добавить пустую строку должно выпасть исключение', () => {
    const fx = () => dict.putSequence('');
    expect(fx).toThrow(Error);
});

