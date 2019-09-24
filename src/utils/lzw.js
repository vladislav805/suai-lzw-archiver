"use strict";

const LZW = {
    compress: function(input) {
        if (!input || !input.length) {
            throw new Error('Задана пустая строка');
        }

        const dictionary = {};
        let w = "";
        const result = [];
        let dictSize = 256; // длина словаря

        for (let i = 0; i < dictSize; ++i) {
            dictionary[String.fromCharCode(i)] = i;
        }

        for (let i = 0; i < input.length; ++i) {
            let c = input.charAt(i);
            let wc = w + c;

            if (wc in dictionary) {
                w = wc;
            } else {
                result.push(dictionary[w]);
                dictionary[wc] = dictSize++;
                w = String(c);
            }
        }

        if (w) {
            result.push(dictionary[w]);
        }

        return result;
    },

    toBinary: (codes) => codes.map(code => String.fromCodePoint(code)).join(''),

    fromBinary: (str) => str.split('').map(i => i.charAt(0)).join(''),

    decompress: function(input) {
        const dictionary = [];
        let w, k;
        let result;
        let entry = "";
        let dictSize = 256;

        for (let i = 0; i < dictSize; ++i) {
            dictionary[i] = String.fromCharCode(i);
        }

        w = String.fromCharCode(input[0]);

        result = w;
        for (let i = 1; i < input.length; ++i) {
            k = input[i];

            if (k in dictionary) {
                entry = dictionary[k];
            } else {
                if (k === dictSize) {
                    entry = w + w.charAt(0);
                } else {
                    return null;
                }
            }

            result += entry;
            dictionary[dictSize++] = w + entry.charAt(0);
            w = entry;
        }

        return result;
    }
};

module.exports = LZW;

