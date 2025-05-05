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
	name: 'users',
})
@Index(['username', 'email'], { unique: true })
export class UserEntity {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ unique: true, nullable: false, type: 'uuid' })
	user_id: string;

	@Column({ unique: true, nullable: false, type: 'varchar' })
	username: string;

	@Column({ unique: true, nullable: false, type: 'varchar' })
	email: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	password: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	salt: string;

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
