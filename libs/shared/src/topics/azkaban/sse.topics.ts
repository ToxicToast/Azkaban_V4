export enum AzkabanSSETopics {
	VERSION = 'azkaban.sse.version',
	LOGIN = 'azkaban.sse.login',
	REGISTER = 'azkaban.sse.register',
	TWITCHBOT = 'azkaban.sse.twitchbot',
}

export const AzkabanSSETopicArray = Object.values(AzkabanSSETopics);
