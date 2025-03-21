export enum WarcraftCharacterTopics {
	LIST = 'warcraft.character.list',
	ID = 'warcraft.character.id',
	CREATE = 'warcraft.character.create',
	UPDATE = 'warcraft.character.update',
	VERSION = 'warcraft.character.version',
}

export const WarcraftCharacterTopicArray = Object.values(
	WarcraftCharacterTopics,
);
