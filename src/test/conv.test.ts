import {} from 'jest';
import { StringToUInt8 as s2i, UInt8ToString as i2s } from '../util/conv';

it('Обратимость', () => {
    const text = 'Test here is more text';

    expect(i2s(s2i(text))).toBe(text);
});

it('Из-за uint8 русские символы не будут сохраняться (поскольку код символа вне 255)', () => {
    const text = 'Русский';

    expect(i2s(s2i(text))).not.toBe(text);
});
