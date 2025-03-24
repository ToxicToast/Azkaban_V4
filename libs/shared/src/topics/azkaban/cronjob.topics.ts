export enum AzkabanCronjobTopics {
	VERSION = 'azkaban.cronjob.version',
	WARCRAFT_CHARACTER = 'azkaban.cronjob.warcraft.character',
	WARCRAFT_GUILD = 'azkaban.cronjob.warcraft.guild',
}

export const AzkabanCronjobTopicArray = Object.values(AzkabanCronjobTopics);
