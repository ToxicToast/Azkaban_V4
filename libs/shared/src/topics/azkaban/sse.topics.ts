export enum AzkabanSSETopics {
	VERSION = 'azkaban.sse.version',
	LOGIN = 'azkaban.sse.login',
	TWITCHBOT = 'azkaban.sse.twitchbot',
}

export const AzkabanSSETopicArray = Object.values(AzkabanSSETopics);
