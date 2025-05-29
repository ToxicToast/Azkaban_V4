export enum WarhammerCharacterTopics {
	LIST = 'warhammer.character.list',
	ID = 'warhammer.character.id',
	CHARACTERID = 'warhammer.character.characterId',
	CREATE = 'warhammer.character.create',
	UPDATE = 'warhammer.character.update',
	DELETE = 'warhammer.character.delete',
	RESTORE = 'warhammer.character.restore',
	ACTIVATE = 'warhammer.character.activate',
	DEACTIVATE = 'warhammer.character.deactivate',
	ASSIGN = 'warhammer.character.assign',
}

export const WarhammerCharacterTopicArray = Object.values(
	WarhammerCharacterTopics,
);
