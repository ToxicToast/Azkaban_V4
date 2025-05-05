import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Nullable, Optional } from '@azkaban/shared';
import { Origins } from 'blizzard.js/dist/endpoints';
import { wow } from 'blizzard.js';
import { WoWClient } from 'blizzard.js/dist/wow';
import { AccessToken } from 'blizzard.js/dist/core';
import { RpcException } from '@nestjs/microservices';
import { Span } from 'nestjs-otel';
import { CharacterModel } from '../cronjob/character/character.model';
import { AssetsModel } from '../cronjob/assets/assets.model';
import { MythicModel } from '../cronjob/mythic/mythic.model';

@Injectable()
export class ApiService {
	private blizzardInstance: WoWClient = null;
	private accessToken: Nullable<AccessToken> = null;

	constructor(
		@Inject('BLIZZARD_CLIENT_ID') private readonly clientId: string,
		@Inject('BLIZZARD_CLIENT_SECRET') private readonly clientSecret: string,
	) {}

	@Span('setApiClient')
	async setApiClient(region?: Optional<Origins>) {
		const defaultRegion = region ?? 'eu';
		Logger.log('Setting up Blizzard API client', defaultRegion);
		this.blizzardInstance = await wow.createInstance(
			{
				key: this.clientId,
				secret: this.clientSecret,
				origin: defaultRegion,
			},
			(token) => {
				this.accessToken = token;
			},
		);
	}

	@Span('getCharacter')
	async getCharacter(data: {
		name: string;
		realm: string;
	}): Promise<Nullable<CharacterModel>> {
		Logger.log('Getting character', data);
		const response = await this.blizzardInstance?.characterProfile({
			realm: data.realm,
			name: data.name,
		});
		if (response.status !== 200) {
			Logger.error('Character not found', data);
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'Character not found',
				raw: data,
			});
		}
		return response?.data ?? null;
	}

	@Span('getCharacterAssets')
	async getCharacterAssets(data: {
		name: string;
		realm: string;
	}): Promise<Nullable<AssetsModel>> {
		const response = await this.blizzardInstance?.characterMedia({
			realm: data.realm,
			name: data.name,
		});
		if (response.status !== 200) {
			Logger.error('Character not found', data);
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'Character not found',
				raw: data,
			});
		}
		return response?.data ?? [];
	}

	@Span('getGuildRoster')
	async getGuildRoster(data: {
		name: string;
		realm: string;
	}): Promise<Nullable<unknown>> {
		// TODO: Implement Data Body Type & Guild Selection
		const response = await this.blizzardInstance?.guild({
			realm: 'blackmoore',
			name: 'ascend',
			resource: 'roster',
		});
		if (response.status !== 200) {
			Logger.error('Guild not found', data);
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'Guild not found',
				raw: data,
			});
		}
		return response?.data ?? null;
	}

	@Span('getGuildActivity')
	async getGuildActivity(data: unknown): Promise<Nullable<unknown>> {
		// TODO: Implement Data Body Type & Guild Selection
		const response = await this.blizzardInstance?.guild({
			realm: 'blackmoore',
			name: 'ascend',
			resource: 'activity',
		});
		if (response.status !== 200) {
			Logger.error('Guild not found', data);
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'Guild not found',
				raw: data,
			});
		}
		return response?.data ?? null;
	}

	@Span('getMythicRating')
	async getMythicRating(data: {
		name: string;
		realm: string;
	}): Promise<Nullable<MythicModel>> {
		const response = await this.blizzardInstance?.characterMythicKeystone({
			realm: data.realm,
			name: data.name,
		});
		if (response.status !== 200) {
			Logger.error('Character not found', data);
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'Character not found',
				raw: data,
			});
		}
		return response?.data ?? null;
	}
}
