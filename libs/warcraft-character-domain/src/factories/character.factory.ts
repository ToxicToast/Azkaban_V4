import { Factory } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';
import { CharacterDomain } from '../domains';
import { CharacterData } from '../data';
import { CharacterAggregate } from '../aggregates';
import {
	NameValueObject,
	RealmValueObject,
	RegionValueObject,
} from '../valueObjects';
export class CharacterFactory
	implements
		Factory<
			CharacterAnemic,
			CharacterDomain,
			CharacterData,
			CharacterAggregate
		>
{
	reconstitute(anemic: CharacterAnemic): CharacterAggregate {
		const {
			id,
			region,
			realm,
			display_realm,
			name,
			display_name,
			gender_id,
			faction_id,
			race_id,
			class_id,
			spec_id,
			level,
			item_level,
			guild_id,
			rank_id,
			inset,
			mythic,
			loggedin_at,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = anemic;

		const regionVO = new RegionValueObject(region);
		const realmVO = new RealmValueObject(realm);
		const displayRealmVO = new RealmValueObject(display_realm);
		const nameVO = new NameValueObject(name);
		const displayNameVO = new NameValueObject(display_name);

		const characterDomain = new CharacterDomain(
			id,
			regionVO.value,
			realmVO.value,
			displayRealmVO.value,
			nameVO.value,
			displayNameVO.value,
			gender_id,
			faction_id,
			race_id,
			class_id,
			spec_id,
			level,
			item_level,
			guild_id,
			rank_id,
			inset,
			mythic,
			loggedin_at,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		);
		return new CharacterAggregate(characterDomain);
	}

	constitute(domain: CharacterDomain): CharacterAnemic {
		return domain.toAnemic();
	}

	createDomain(data: CharacterData): CharacterAggregate {
		const { id, region, realm, name, rank_id } = data;
		const regionVO = new RegionValueObject(region);
		const realmVO = new RealmValueObject(realm);
		const nameVO = new NameValueObject(name);
		const domain = new CharacterDomain(
			id,
			regionVO.value,
			realmVO.value,
			null,
			nameVO.value,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			rank_id,
			null,
			null,
			null,
			null,
			new Date(),
			null,
			null,
		);
		return new CharacterAggregate(domain);
	}
}
