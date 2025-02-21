export enum TwitchViewerTopics {
	VERSION = 'twitch.viewer.version',
	JOIN = 'twitch.viewer.join',
	PART = 'twitch.viewer.part',
	TIMEOUT = 'twitch.viewer.timeout',
	BAN = 'twitch.viewer.ban',
	MESSAGE = 'twitch.viewer.message',
}

export const TwitchViewerTopicArray = Object.values(TwitchViewerTopics);
