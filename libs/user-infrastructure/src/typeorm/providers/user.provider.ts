import { UserEntity } from '../entities';
import { DataSource } from 'typeorm';

export const userProvider = [
	{
		provide: 'USER_REPOSITORY',
		useFactory: (dataSource: DataSource) => {
			return dataSource.getRepository(UserEntity);
		},
		inject: ['DATA_SOURCE'],
	},
];
