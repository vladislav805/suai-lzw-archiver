import React from 'react';
import FileChooser from '../components/FileChooser';
import readFileAsync from '../util/read-file';
import LZW from '../util/lzw';
import { StringToUInt16 } from '../util/conv';

export interface IUnpackProps {}

export interface IUnpackState {
    output: string; // результат распаковки
    busy: boolean; // loading...
    status?: string; // статус
}

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
        try {
            this.setState({ busy: true });

            const fileContent = await readFileAsync(this.file!, false);
            const result = LZW.decompress(StringToUInt16(fileContent));

            this.setState({
                output: String(result),
                status: `Считано: ${fileContent.length} байт; исходная длина ${result.length} байт`
            });
        } catch (e) {
            this.setState({ status: e.message });
        } finally {
            this.setState({ busy: false });
        }
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
            {this.state.status && <div className="label">{this.state.status}</div>}
        </div>;
    }
}
