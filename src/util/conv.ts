/**
 * Конвертация UInt16Array в строку и наоборот
 */

export const UInt16ToString = (data: Uint16Array): string => Array.from(data).map(i => String.fromCharCode(i)).join('');
export const StringToUInt16 = (data: string): Uint16Array => Uint16Array.from(data.split('').map(i => i.charCodeAt(0)) as number[]);
