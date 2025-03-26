export enum WarcraftCharacterTopics {
	LIST = 'warcraft.character.list',
	ID = 'warcraft.character.id',
	CREATE = 'warcraft.character.create',
	UPDATE = 'warcraft.character.update',
	DELETE = 'warcraft.character.delete',
	RESTORE = 'warcraft.character.restore',
	VERSION = 'warcraft.character.version',
	CHECK = 'warcraft.character.check',
}

export const WarcraftCharacterTopicArray = Object.values(
	WarcraftCharacterTopics,
);
