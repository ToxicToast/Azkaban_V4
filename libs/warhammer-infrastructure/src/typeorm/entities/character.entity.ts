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
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ unique: true, nullable: false, type: 'uuid' })
	character_id: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	name: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	role: string;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	current_fate: number;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	total_fate: number;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	current_wounds: number;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	total_wounds: number;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	critical_wounds: number;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	current_corruption: number;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	total_corruption: number;

	@Column({ unique: false, nullable: true, default: null, type: 'timestamp' })
	activated_at: Date | null;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
	updated_at: Date | null;

	@DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
	deleted_at: Date | null;
}
