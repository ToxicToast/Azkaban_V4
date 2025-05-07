import { Factory, UuidHelper } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';
import { CharacterDomain } from '../domains';
import { CharacterData } from '../data';
import { CharacterAggregate } from '../aggregates';
import { DisplayName, DisplayRealm } from '../valueObjects';

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
			character_id,
			region,
			realm,
			name,
			display_realm,
			display_name,
			gender,
			faction,
			race,
			class: character_class,
			spec,
			level,
			item_level,
			guild,
			rank,
			old_guild,
			inset,
			avatar,
			mythic,
			raid,
			activated_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
		} = anemic;

		const displayRealmValueObject = new DisplayRealm(display_realm);
		const displayNameValueObject = new DisplayName(display_name);

		const characterDomain = new CharacterDomain(
			id,
			character_id,
			region,
			realm,
			name,
			displayRealmValueObject,
			displayNameValueObject,
			gender,
			faction,
			race,
			character_class,
			spec,
			level,
			item_level,
			guild,
			rank,
			old_guild,
			inset,
			avatar,
			mythic,
			raid,
			activated_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
		);
		const uuid = UuidHelper.create().value;
		return new CharacterAggregate(uuid, characterDomain);
	}

	constitute(domain: CharacterDomain): CharacterAnemic {
		return domain.toAnemic();
	}

	createDomain(data: CharacterData): CharacterAggregate {
		const { character_id, region, realm, name, rank } = data;

		const displayRealmValueObject = new DisplayRealm(realm);
		const displayNameValueObject = new DisplayName(name);

		const domain = new CharacterDomain(
			0,
			character_id,
			region,
			realm,
			name,
			displayRealmValueObject,
			displayNameValueObject,
			null,
			null,
			null,
			null,
			null,
			1,
			0,
			null,
			rank,
			null,
			null,
			null,
			0,
			null,
			null,
			null,
			new Date(),
			null,
			null,
		);
		domain.createCharacter();
		const uuid = UuidHelper.create().value;
		return new CharacterAggregate(uuid, domain);
	}
}
