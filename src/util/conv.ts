/**
 * Конвертация UInt8Array в строку и наоборот
 */

export const UInt8ToString = (data: Uint8Array): string => Array.from(data).map(i => String.fromCharCode(i)).join('');
export const StringToUInt8 = (data: string): Uint8Array => Uint8Array.from(data.split('').map(i => i.charCodeAt(0)) as number[]);