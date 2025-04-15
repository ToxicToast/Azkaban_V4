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
	name: 'guilds',
})
@Index(['region', 'realm', 'name'], { unique: true })
export class GuildEntity {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ unique: true, nullable: false, type: 'uuid' })
	guild_id: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	region: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	realm: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	name: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	faction: string | null;

	@Column({ unique: false, nullable: false, type: 'int', default: 0 })
	member_count: number;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	raid: string | null;

	@Column({ unique: false, nullable: true, default: null, type: 'timestamp' })
	activated_at: Date | null;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
	updated_at: Date | null;

	@DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
	deleted_at: Date | null;
}
