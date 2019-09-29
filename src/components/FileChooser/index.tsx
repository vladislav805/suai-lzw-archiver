import React from 'react';
import './file-chooser.scss';

export interface IFileChooserProps {
	onChange: (file: File) => void;
	label: string;
}

export interface IFileChooserState {

}

class FileChooser extends React.Component<IFileChooserProps, IFileChooserState> {

	onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (this.props.onChange && typeof this.props.onChange === 'function') {
			const target: HTMLInputElement = event.target;
			const file: File = (target.files as FileList)[0];
			this.props.onChange(file);
		}
	};

	render() {
		return (
			<div className="file-chooser">
				<input
					type="file"
					className="file-chooser-native"
					onChange={this.onChangeFile} />
				<div className="file-chooser-label">
					<svg className="file-chooser-icon" viewBox="0 0 24 24">
						<path fill="#000000" d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
					</svg>
					<span>{this.props.label}</span>
				</div>
			</div>
		);
	}

}

export default FileChooser;
