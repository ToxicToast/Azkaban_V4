import { Factory, UuidHelper } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';
import { CharacterDomain } from '../domains';
import { CharacterData } from '../data';
import { CharacterAggregate } from '../aggregates';
import { Fate, Wound, Corruption } from '../valueObjects';

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
			name,
			role,
			fate,
			wounds,
			corruption,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = anemic;

		const fateValueObject = new Fate(fate.current, fate.total);
		const woundsValueObject = new Wound(
			wounds.current,
			wounds.total,
			wounds.critical,
		);
		const corruptionValueObject = new Corruption(
			corruption.current,
			corruption.total,
		);

		const characterDomain = new CharacterDomain(
			id,
			character_id,
			name,
			role,
			fateValueObject,
			woundsValueObject,
			corruptionValueObject,
			activated_at,
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
		const { character_id, name, role } = data;
		const fateValueObject = new Fate(0, 0);
		const woundsValueObject = new Wound(0, 0, 0);
		const corruptionValueObject = new Corruption(0, 0);
		const domain = new CharacterDomain(
			0,
			character_id,
			name,
			role,
			fateValueObject,
			woundsValueObject,
			corruptionValueObject,
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
