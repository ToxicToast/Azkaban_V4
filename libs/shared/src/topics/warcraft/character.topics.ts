export enum WarcraftCharacterTopics {
	LIST = 'warcraft.character.list',
	ID = 'warcraft.character.id',
	CHARACTERID = 'warcraft.character.characterId',
	GUILD = 'warcraft.character.guild',
	CREATE = 'warcraft.character.create',
	UPDATE = 'warcraft.character.update',
	DELETE = 'warcraft.character.delete',
	RESTORE = 'warcraft.character.restore',
	ACTIVATE = 'warcraft.character.activate',
	DEACTIVATE = 'warcraft.character.deactivate',
}

export const WarcraftCharacterTopicArray = Object.values(
	WarcraftCharacterTopics,
);
