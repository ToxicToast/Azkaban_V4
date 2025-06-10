import { CategoryService as DomainService } from '@azkaban/foodfolio-domain';
import { CategoryRepository } from '../repositories';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Nullable, Optional, UuidHelper } from '@azkaban/shared';
import { CategoryDAO } from '../../dao';
import { RpcException } from '@nestjs/microservices';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../../dto';

export class CategoryService {
	private readonly domainService: DomainService;

	constructor(
		private readonly repository: CategoryRepository,
		private readonly eventEmitter: EventEmitter2,
	) {
		this.domainService = new DomainService(this.repository);
	}

	async getCategoryList(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CategoryDAO>> {
		const result = await this.domainService.getCategories(
			limit,
			offset,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { limit, offset, withDeleted },
			});
		}
	}

	async getCategoryById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<CategoryDAO> {
		const result = await this.domainService.getCategoryById(
			id,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id, withDeleted },
			});
		}
	}

	async getCategoryByCategoryId(
		category_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<CategoryDAO> {
		const result = await this.domainService.getCategoryByCategoryId(
			category_id,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { category_id, withDeleted },
			});
		}
	}

	async getCategoryByParentId(
		parent_id: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CategoryDAO>> {
		const result = await this.domainService.getCategoriesByParentId(
			parent_id,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { category_id, withDeleted },
			});
		}
	}

	async createCategory(data: CreateCategoryDTO): Promise<CategoryDAO> {
		const category_id = UuidHelper.create().value;
		const result = await this.domainService.createCategory({
			...data,
			category_id,
		});
		if (result.isSuccess) {
			const events = result.events;
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { data, category_id },
			});
		}
	}

	async updateCategory(
		id: number,
		data: UpdateCategoryDTO,
	): Promise<CategoryDAO> {
		const { title, parent_id } = data;
		const result = await this.domainService.updateCategory({
			id,
			title,
			parent_id,
		});
		if (result.isSuccess) {
			const events = result.events;
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id, data },
			});
		}
	}

	async deleteCategory(id: number): Promise<CategoryDAO> {
		const result = await this.domainService.deleteCategory(id);
		if (result.isSuccess) {
			const events = result.events;
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async restoreCategory(id: number): Promise<CategoryDAO> {
		const result = await this.domainService.restoreCategory(id);
		if (result.isSuccess) {
			const events = result.events;
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async activateCategory(id: number): Promise<CategoryDAO> {
		const result = await this.domainService.activateCategory(id);
		if (result.isSuccess) {
			const events = result.events;
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async deactivateCategory(id: number): Promise<CategoryDAO> {
		const result = await this.domainService.deactivateCategory(id);
		if (result.isSuccess) {
			const events = result.events;
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}
}
