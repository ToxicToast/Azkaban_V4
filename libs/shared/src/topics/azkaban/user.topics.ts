export enum AzkabanUserTopics {
	VERSION = 'azkaban.user.version',
	LIST = 'azkaban.user.list',
	ID = 'azkaban.user.id',
	CREATE = 'azkaban.user.create',
	UPDATE = 'azkaban.user.update',
}

export const AzkabanUserTopicArray = Object.values(AzkabanUserTopics);
