import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({
	name: 'characters',
})
@Index(['region', 'realm', 'name'], { unique: true })
export class CharacterEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	region: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	realm: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	display_realm: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	name: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	display_name: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	gender_id: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	faction_id: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	race_id: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	class_id: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	spec_id: string;

	@Column({ unique: false, nullable: false, type: 'int', default: 0 })
	level: number;

	@Column({ unique: false, nullable: false, type: 'int', default: 0 })
	item_level: number;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	guild_id: string;

	@Column({ unique: false, nullable: true, type: 'int', default: null })
	rank_id: number;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	inset: string;

	@Column({ unique: false, nullable: false, type: 'int', default: 0 })
	mythic: number;

	@Column({ unique: false, nullable: true, default: null, type: 'timestamp' })
	loggedin_at: Date | null;

	@Column({ unique: false, nullable: true, default: null, type: 'timestamp' })
	activated_at: Date | null;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
	updated_at: Date | null;

	@DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
	deleted_at: Date | null;
}
