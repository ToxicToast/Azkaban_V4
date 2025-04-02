import { Factory } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';
import { CharacterDomain } from '../domains';
import { CharacterData } from '../data';
import { CharacterAggregate } from '../aggregates';

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

		const characterDomain = new CharacterDomain(
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
			character_class,
			spec,
			level,
			item_level,
			guild,
			rank,
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

		return new CharacterAggregate('uuid-helper-here', characterDomain);
	}

	constitute(domain: CharacterDomain): CharacterAnemic {
		return domain.toAnemic();
	}

	createDomain(data: CharacterData): CharacterAggregate {
		const { character_id, region, realm, name, rank } = data;
		const domain = new CharacterDomain(
			0,
			character_id,
			region,
			realm,
			name,
			realm,
			name,
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
			0,
			null,
			null,
			null,
			new Date(),
			null,
			null,
		);
		return new CharacterAggregate('uuid-helper-here', domain);
	}
}
