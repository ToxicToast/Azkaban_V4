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
			user_id,
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
			user_id,
			name,
			role,
			{
				current: fateValueObject.getCurrentFate(),
				total: fateValueObject.getTotalFate(),
			},
			{
				current: woundsValueObject.getCurrentWounds(),
				total: woundsValueObject.getTotalWounds(),
				critical: woundsValueObject.getCriticalWounds(),
			},
			{
				current: corruptionValueObject.getCurrentCorruption(),
				total: corruptionValueObject.getTotalCorruption(),
			},
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
		const { character_id, name, role, fate, wounds } = data;
		const fateValueObject = new Fate(fate, fate);
		const woundsValueObject = new Wound(wounds, wounds, 0);
		const corruptionValueObject = new Corruption(0, 0);
		const domain = new CharacterDomain(
			0,
			character_id,
			null,
			name,
			role,
			{
				current: fateValueObject.getCurrentFate(),
				total: fateValueObject.getTotalFate(),
			},
			{
				current: woundsValueObject.getCurrentWounds(),
				total: woundsValueObject.getTotalWounds(),
				critical: woundsValueObject.getCriticalWounds(),
			},
			{
				current: corruptionValueObject.getCurrentCorruption(),
				total: corruptionValueObject.getTotalCorruption(),
			},
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
