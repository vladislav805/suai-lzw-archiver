import {} from 'jest';
import { StringToUInt16 as s2i, UInt16ToString as i2s } from '../util/conv';

it('Обратимость', () => {
    const text = 'Test here is more text или даже русский!"@@@#-1`';

    expect(i2s(s2i(text))).toBe(text);
});
