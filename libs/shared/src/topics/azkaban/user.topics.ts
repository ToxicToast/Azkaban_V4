export enum AzkabanUserTopics {
	LIST = 'azkaban.user.list',
	ID = 'azkaban.user.id',
	USERID = 'azkaban.user.userId',
	CREATE = 'azkaban.user.create',
	UPDATE = 'azkaban.user.update',
	DELETE = 'azkaban.user.delete',
	RESTORE = 'azkaban.user.restore',
	ACTIVATE = 'azkaban.user.activate',
	DEACTIVATE = 'azkaban.user.deactivate',
}

export const AzkabanUserTopicArray = Object.values(AzkabanUserTopics);
