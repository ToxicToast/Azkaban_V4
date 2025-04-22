export enum AzkabanGroupTopics {
	LIST = 'azkaban.group.list',
	ID = 'azkaban.group.id',
	GROUPID = 'azkaban.group.groupId',
	CREATE = 'azkaban.group.create',
	UPDATE = 'azkaban.group.update',
	DELETE = 'azkaban.group.delete',
	RESTORE = 'azkaban.group.restore',
	ACTIVATE = 'azkaban.group.activate',
	DEACTIVATE = 'azkaban.group.deactivate',
}

export const AzkabanGroupTopicArray = Object.values(AzkabanGroupTopics);
