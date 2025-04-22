export enum AzkabanSSETopics {
	VERSION = 'azkaban.sse.version',
	CREATE = 'azkaban.sse.create',
	WARCRAFT = 'azkaban.sse.warcraft',
}

export const AzkabanSSETopicArray = Object.values(AzkabanSSETopics);
