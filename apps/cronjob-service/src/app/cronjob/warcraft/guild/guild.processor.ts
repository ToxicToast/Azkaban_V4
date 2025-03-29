import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { GuildService } from './guild.service';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { Nullable } from '@azkaban/shared';
import { ApiGuildModel } from '../models';
import { CharacterDAO } from '@azkaban/warcraft-character-infrastructure';

@Processor('blizzard-guild')
export class GuildProcessor extends WorkerHost {
	constructor(private readonly service: GuildService) {
		super();
	}

	private async onGetGuildFromApi(data: {
		id: string;
		region: string;
		realm: string;
		name: string;
	}): Promise<Nullable<ApiGuildModel>> {
		try {
			const { region, realm, name } = data;
			return await this.service.getGuildFromApi(region, realm, name);
		} catch (error) {
			Logger.error(error, 'onGetGuildFromApi');
			return null;
		}
	}

	async process(
		job: Job<
			{ id: string; region: string; realm: string; name: string },
			Nullable<ApiGuildModel>,
			string
		>,
	): Promise<Nullable<ApiGuildModel>> {
		return await this.onGetGuildFromApi(job.data);
	}

	@OnWorkerEvent('completed')
	async onCompleted(
		job: Job<
			Nullable<{ id: string; region: string }>,
			Nullable<ApiGuildModel>,
			string
		>,
	): Promise<void> {
		try {
			const { id, region } = job.data;
			const data = job.returnvalue;

			data?.members?.forEach((member) => {
				const realm = member.character.realm.slug;
				const name = member.character.name.toLowerCase();
				const rank = member.rank;
				this.service
					.checkCharacterExists(region, realm, name)
					.then((character: Nullable<CharacterDAO>) => {
						if (character !== null) {
							this.service.updateCharacter(character.id, rank);
						} else {
							this.service.createCharacter(
								region,
								realm,
								name,
								rank,
							);
						}
					});
			});
		} catch (error) {
			Logger.error(error, 'onCompleted');
			const { id } = job.data;
			Logger.error(id, 'Deleting guild');
			// await this.service.deleteGuild(id);
		}
	}
}
