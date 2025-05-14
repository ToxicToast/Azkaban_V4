import { Mapper } from '@azkaban/shared';
import { CharacterDAO } from '../../dao';
import { CharacterEntity } from '../entities';
import { CharacterFactory } from '@azkaban/warhammer-domain';

export class CharacterMapper implements Mapper<CharacterDAO, CharacterEntity> {
	private readonly domainFactory: CharacterFactory = new CharacterFactory();

	toEntity(data: CharacterDAO): CharacterEntity {
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
		} = data;
		const entity = new CharacterEntity();
		entity.id = id;
		entity.character_id = character_id;
		entity.name = name;
		entity.role = role;
		entity.current_fate = fate.current;
		entity.total_fate = fate.total;
		entity.current_wounds = wounds.current;
		entity.total_wounds = wounds.total;
		entity.critical_wounds = wounds.critical;
		entity.current_corruption = corruption.current;
		entity.total_corruption = corruption.total;
		entity.activated_at = activated_at;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		return entity;
	}

	toDomain(data: CharacterEntity): CharacterDAO {
		const {
			id,
			character_id,
			name,
			role,
			current_fate,
			total_fate,
			current_wounds,
			total_wounds,
			critical_wounds,
			current_corruption,
			total_corruption,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const aggregate = this.domainFactory.reconstitute({
			id,
			character_id,
			name,
			role,
			fate: {
				current: current_fate,
				total: total_fate,
			},
			wounds: {
				current: current_wounds,
				total: total_wounds,
				critical: critical_wounds,
			},
			corruption: {
				current: current_corruption,
				total: total_corruption,
			},
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		});
		return aggregate.toAnemic().character;
	}
}
