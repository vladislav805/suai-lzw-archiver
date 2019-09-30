import React from 'react';
import FileSaver from 'file-saver';
import FileChooser from '../components/FileChooser';
import readFileAsync from '../util/read-file';

import '../common.scss';
import LZW from '../util/lzw';
import { UInt8ToString } from '../util/conv';

export interface IPackProps {

}

export interface IPackState {
    input: string; // входные данные
    busy: boolean;
}

/**
 * Вкладка для запаковки данных
 */
export default class Pack extends React.Component<IPackProps, IPackState> {

    /**
     * Состояние компонента
     */
    state: IPackState = {
        input: '',
        busy: false
    };

    /**
     * Особенность React: при вводе текста нужно обновлять состояние
     */
    private onChangeField = (field: string) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            [field]: event.target.value
        } as Pick<IPackState, any>);
    };
    
    /**
     * Когда юзер выбрал файл, открываем, читаем его и выводим 
     * содержимое в текстовое поле
     */
    private onFileOpened = async (file: File) => {
        try {
            const fileContent = await readFileAsync(file);
            this.setState({ input: fileContent });
        } catch (e) {
            alert(`Error:\n${e.message}`);
        }
    };

    /**
     * При нажатии на кнопку архивируем текст и отдаем файл
     */
    private onRequestCompress = async (event: React.MouseEvent) => {
        try {
            this.setState({ busy: true });
            
            const compressed: Uint8Array = LZW.compress(this.state.input);
            const blob = new Blob([UInt8ToString(compressed)], {type: 'text/plain; charset=utf-8'});

            FileSaver.saveAs(blob, 'compressed.lzwf');
        } catch (e) {
            alert(`Error:\n${e.message}`);
        } finally {
            this.setState({ busy: false });
        }
    };

    render() {
        return <div className="tab-content">
            <div className="label">Вставьте в текстовое поле ниже текст, который требуется сжать.</div>
            <textarea
                name="input"
                className="textfield"
                placeholder="Оригинальный текст"
                onChange={this.onChangeField('input')}
                value={this.state.input} />
            <div className="label"> ... или выберите файл с текстом (*.txt) ... </div>
            <FileChooser
                onChange={this.onFileOpened}
                label="Открыть файл" />
            <div className="label">Поддерживается только русский текст и базовые символы.</div>
            <div className="tab-content--actions">
                <button
                    disabled={this.state.busy}
                    className="button"
                    onClick={this.onRequestCompress}>Запаковать</button>
            </div>
        </div>;
    }
}
