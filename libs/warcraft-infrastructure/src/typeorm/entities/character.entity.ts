import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Generated,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({
	name: 'characters',
})
@Index(['region', 'realm', 'name'], { unique: true })
export class CharacterEntity {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Generated('uuid')
	character_id: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	region: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	realm: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	name: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	display_realm: string | null;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	display_name: string | null;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	gender: string | null;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	faction: string | null;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	race: string | null;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	class: string | null;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	spec: string | null;

	@Column({ unique: false, nullable: false, type: 'int', default: 1 })
	level: number;

	@Column({ unique: false, nullable: false, type: 'int', default: 0 })
	item_level: number;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	guild: string | null;

	@Column({ unique: false, nullable: true, type: 'int', default: null })
	rank: number | null;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	old_guild: string | null;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	inset: string | null;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	avatar: string | null;

	@Column({ unique: false, nullable: false, type: 'int', default: 0 })
	mythic: number;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	raid: string | null;

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
