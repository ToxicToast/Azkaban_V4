export interface ApiCharacterModel {
	name: string;
	realm: {
		name: string;
	};
	gender?: {
		name: string;
	};
	faction?: {
		name: string;
	};
	race: {
		name: string;
	};
	character_class: {
		name: string;
	};
	active_spec?: {
		name: string;
	};
	guild?: {
		name: string;
	};
	level: number;
	equipped_item_level: number;
}

export interface ApiInsetModel {
	assets: Array<{
		key: string;
		value: string;
	}>;
}

interface ApiGuildMember {
	character: {
		name: string;
		realm: {
			slug: string;
		};
	};
	rank: number;
}

export interface ApiGuildModel {
	members: Array<ApiGuildMember>;
}
