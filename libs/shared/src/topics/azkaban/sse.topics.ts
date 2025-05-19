export enum AzkabanSSETopics {
	VERSION = 'azkaban.sse.version',
	CREATE = 'azkaban.sse.create',
	WARCRAFT = 'azkaban.sse.warcraft',
	AZKABAN = 'azkaban.sse.azkaban',
	WARHAMMER = 'azkaban.sse.warhammer',
}

export const AzkabanSSETopicArray = Object.values(AzkabanSSETopics);
