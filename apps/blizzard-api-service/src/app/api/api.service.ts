import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WoWClient } from 'blizzard.js/dist/wow';
import { Nullable, Optional } from '@azkaban/shared';
import { AccessToken } from 'blizzard.js/dist/core';
import { Origins } from 'blizzard.js/dist/endpoints';
import { wow } from 'blizzard.js';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ApiService {
	private blizzardInstance: WoWClient = null;
	private accessToken: Nullable<AccessToken> = null;

	constructor(
		@Inject('BLIZZARD_CLIENT_ID') private readonly clientId: string,
		@Inject('BLIZZARD_CLIENT_SECRET') private readonly clientSecret: string,
	) {}

	async setApiClient(region?: Optional<Origins>) {
		const defaultRegion = region ?? 'eu';
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

	async getCharacter(
		realm: string,
		name: string,
	): Promise<Nullable<unknown>> {
		const data = await this.blizzardInstance?.characterProfile({
			realm,
			name,
		});
		if (data.status !== 200) {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'Character not found',
				raw: { realm, name },
			});
		}
		return data?.data ?? null;
	}

	async getCharacterInsetPath(
		realm: string,
		name: string,
	): Promise<Nullable<unknown>> {
		const data = await this.blizzardInstance.characterMedia({
			realm,
			name,
		});
		if (data.status !== 200) {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'Character not found',
				raw: { realm, name },
			});
		}
		return data?.data ?? null;
	}

	async getGuild(realm: string, name: string): Promise<Nullable<unknown>> {
		const data = await this.blizzardInstance.guild({
			realm,
			name,
			resource: 'roster',
		});
		if (data.status !== 200) {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'Guild not found',
				raw: { realm, name },
			});
		}
		return data?.data ?? null;
	}

	async getMythicRating(
		realm: string,
		name: string,
	): Promise<Nullable<unknown>> {
		const data = await this.blizzardInstance.characterMythicKeystone({
			realm,
			name,
		});
		if (data.status !== 200) {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'Character not found',
				raw: { realm, name },
			});
		}
		return data?.data ?? null;
	}
}
