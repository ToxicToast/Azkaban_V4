export enum AzkabanCronjobTopics {
	VERSION = 'azkaban.cronjob.version',
	WARCRAFT_CHARACTER = 'azkaban.cronjob.warcraft.character',
	WARCRAFT_GUILD = 'azkaban.cronjob.warcraft.guild',
	WARCRAFT_INSET = 'azkaban.cronjob.warcraft.inset',
	WARCRAFT_MYTHIC = 'azkaban.cronjob.warcraft.mythic',
}

export const AzkabanCronjobTopicArray = Object.values(AzkabanCronjobTopics);
