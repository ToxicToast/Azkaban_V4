export enum FoodFolioCategoryTopics {
	LIST = 'foodfolio.category.list',
	ID = 'foodfolio.category.id',
	CATEGORYID = 'foodfolio.category.categoryId',
	CREATE = 'foodfolio.category.create',
	UPDATE = 'foodfolio.category.update',
	DELETE = 'foodfolio.category.delete',
	RESTORE = 'foodfolio.category.restore',
	ACTIVATE = 'foodfolio.category.activate',
	DEACTIVATE = 'foodfolio.category.deactivate',
}

export const FoodFolioCategoryTopicArray = Object.values(
	FoodFolioCategoryTopics,
);
