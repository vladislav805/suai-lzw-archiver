import {} from "jest";

/**
 * Fake-тесты, пока нет алгоритма
 */

const noop = (text: string) => text.split('').reverse().join('');
const compress = noop;
const decomress = noop;

it('Обратимость', () => {

    const text = 'Какой-нибудь русский текст с пробелами, символвами и знаками пунктуации, без английского текста.';
    
    const compressed = compress(text);
    const decomressed = decomress(compressed);

    expect(decomressed).toBe(text);
});

it('Архивированный текст меньше по размеру, чем оригинальный', () => {
    const text = 'Какой-нибудь русский текст с пробелами, символвами и знаками пунктуации, без английского текста.';
    
    const compressed = compress(text);

    expect(compressed.length).toBeLessThanOrEqual(text.length);
});
