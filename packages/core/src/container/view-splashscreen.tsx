import { MessageType } from '../message';
import * as MobxReact from 'mobx-react';
import * as React from 'react';
import { SplashScreenContainer } from './splash-screen-container';
import * as uuid from 'uuid';
import { ViewStore } from '../store';
import * as T from '../types';

@MobxReact.inject('store')
@MobxReact.observer
export class ViewSplashscreen extends React.Component {
	public render(): JSX.Element {
		const props = this.props as { store: ViewStore };
		const app = props.store.getApp();
		const transaction = uuid.v4();
		const openFileRequestId = uuid.v4();

		return (
			<SplashScreenContainer
				transaction={transaction}
				onSubmit={e => {
					if (app.isHostType(T.HostType.Electron)) {
						e.preventDefault();
					}
					app.send({
						type: MessageType.CreateNewFileRequest,
						transaction,
						id: uuid.v4(),
						payload: {
							replace: false
						}
					});
				}}
				onCreateClick={() => {
					app.send({
						type: MessageType.CreateNewFileRequest,
						transaction,
						id: uuid.v4(),
						payload: {
							replace: false
						}
					});
				}}
				onOpenClick={() => {
					app.send({
						type: MessageType.OpenFileRequest,
						transaction,
						id: openFileRequestId,
						payload: {
							replace: false
						}
					});
				}}
				onOpenFile={contents => {
					app.send({
						type: MessageType.UseFileRequest,
						transaction,
						id: openFileRequestId,
						payload: {
							silent: false,
							replace: false,
							contents
						}
					});
				}}
				onGuideClick={() => {
					app.send({
						type: MessageType.OpenExternalURL,
						id: uuid.v4(),
						payload: 'https://meetalva.io/doc/docs/guides/start?guides-enabled=true'
					});
				}}
			/>
		);
	}
}
