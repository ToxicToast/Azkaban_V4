export enum AzkabanNotificationTopics {
	LOGIN = 'azkaban.notification.login',
	REGISTER = 'azkaban.notification.register',
	VERSION = 'azkaban.notification.version',
}

export const AzkabanNotificationTopicArray = Object.values(
	AzkabanNotificationTopics,
);
