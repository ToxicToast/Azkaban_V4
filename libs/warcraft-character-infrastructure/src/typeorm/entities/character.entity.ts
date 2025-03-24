import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({
	name: 'characters',
})
export class CharacterEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	region: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	realm: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	name: string;

	@Column({ unique: false, nullable: true, type: 'int', default: null })
	gender_id: number;

	@Column({ unique: false, nullable: true, type: 'int', default: null })
	faction_id: number;

	@Column({ unique: false, nullable: true, type: 'int', default: null })
	race_id: number;

	@Column({ unique: false, nullable: true, type: 'int', default: null })
	class_id: number;

	@Column({ unique: false, nullable: true, type: 'int', default: null })
	spec_id: number;

	@Column({ unique: false, nullable: true, type: 'int', default: 0 })
	level: number;

	@Column({ unique: false, nullable: true, type: 'int', default: 0 })
	item_level: number;

	@Column({ unique: false, nullable: true, type: 'int', default: null })
	guild_id: number;

	@Column({ unique: false, nullable: true, type: 'int', default: null })
	rank_id: number;

	@Column({ unique: false, nullable: true, default: null, type: 'timestamp' })
	activated_at: Date | null;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
	updated_at: Date | null;

	@DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
	deleted_at: Date | null;
}
