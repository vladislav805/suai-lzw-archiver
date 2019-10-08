import { isTextSync } from 'istextorbinary';

export default async (file: File, throwIfBinary: boolean = true) => new Promise<string>((resolve, reject) => {
    if (!file) {
        throw new Error('Файл не выбран');
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = reader.result;

        if (throwIfBinary && !isTextSync(undefined, result as Buffer)) {
            reject(new Error('Binary data'));
            return;
        }

        resolve(result as string);
    };   
});
