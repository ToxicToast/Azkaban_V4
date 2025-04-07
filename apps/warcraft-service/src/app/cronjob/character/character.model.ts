export interface CharacterModel {
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
	last_login_timestamp: number;
	equipped_item_level: number;
}
