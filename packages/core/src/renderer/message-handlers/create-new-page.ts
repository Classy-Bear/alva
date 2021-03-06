import * as M from '@meetalva/message';
import { MessageHandlerContext, MessageHandler } from '../create-handlers';
import * as Types from '@meetalva/types';

export function createNewPage({ store }: MessageHandlerContext): MessageHandler<M.CreateNewPage> {
	return () => {
		const project = store.getProject();

		if (!project) {
			return;
		}

		const page = store.executePageAddNew();

		if (!page) {
			return;
		}

		store.getProject().setActivePage(page);
		page.setNameState(Types.EditableTitleState.Editing);
	};
}
