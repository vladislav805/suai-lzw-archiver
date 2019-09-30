import {} from 'jest';
import LZW from '../util/lzw';

it('Обратимость', () => {
    const text = 'Какой-нибудь русский текст с пробелами, символвами и знаками пунктуации, без английского текста.';
    
    const compressed = LZW.compress(text);
    const decomressed = LZW.decompress(compressed);

    expect(decomressed).toBe(text);
});

it('Архивированный текст меньше по размеру, чем оригинальный', () => {
    const text = 'Какой-нибудь русский текст с пробелами, символвами и знаками пунктуации, без английского текста.';
    
    const compressed = LZW.compress(text);

    expect(compressed.length).toBeLessThanOrEqual(text.length);
});

it('Запаковка и распаковка строки с английскими символами утрачивает английские символы', () => {
    const text = 'Текст с english буквами';

    const compressed = LZW.compress(text);
    const decompressed = LZW.decompress(compressed);

    expect(decompressed).toBe('Текст с         буквами');
});
