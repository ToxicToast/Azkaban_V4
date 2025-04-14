export enum WarcraftGuildTopics {
	LIST = 'warcraft.guild.list',
	ID = 'warcraft.guild.id',
	GUILDID = 'warcraft.guild.guildId',
	CREATE = 'warcraft.guild.create',
	UPDATE = 'warcraft.guild.update',
	DELETE = 'warcraft.guild.delete',
	RESTORE = 'warcraft.guild.restore',
	ACTIVATE = 'warcraft.guild.activate',
	DEACTIVATE = 'warcraft.guild.deactivate',
}

export const WarcraftGuildTopicArray = Object.values(WarcraftGuildTopics);
