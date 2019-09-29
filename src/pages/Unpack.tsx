import React from 'react';
import FileChooser from '../components/FileChooser';
import readFileAsync from '../util/read-file';

export interface IUnpackProps {}

export interface IUnpackState {
    output: string; // результат распаковки
    busy: boolean; // loading...
}

/**
 * Временная функция-заглушка
 * @param input исходные сжатые данные
 */
const noop = async (input: string) => input;

/**
 * Вкладка распаковщика
 */
export default class Unpack extends React.Component<IUnpackProps, IUnpackState> {

    /**
     * Состояние
     */
    state: IUnpackState = {
        output: '',
        busy: false
    };

    /**
     * Ссылка на файл
     */
    private file: File | null = null;

    /**
     * Обработчик выбора файла пользователем
     */
    private onFileOpened = async (file: File) => {
        this.file = file;
    };

    /**
     * При нажатии на кнопку читаем файл и распаковываем его
     */
    private onRequestDecompress = async (event: React.MouseEvent) => {
        if (!this.file) {
            alert('Вы не выбрали файл');
            return;
        }

        this.setState({ busy: true });

        const fileContent = await readFileAsync(this.file);
        const result = await noop(fileContent);

        this.setState({ output: result, busy: false });
    };

    render() {
        return <div className="tab-content">
            <div className="label">Выберите файл *.lzwf для распаковки содержимого</div>
            <FileChooser
                onChange={this.onFileOpened}
                label="Открыть файл" />
            <div className="tab-content--actions">
                <button
                    disabled={this.state.busy}
                    className="button"
                    onClick={this.onRequestDecompress}>Распаковать</button>
            </div>
            <textarea
                readOnly
                name="output"
                className="textfield textfield__high"
                value={this.state.output} />
        </div>;
    }
}
