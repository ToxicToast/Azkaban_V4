export enum AzkabanAuthTopics {
	LOGIN = 'azkaban.auth.login',
	REGISTER = 'azkaban.auth.register',
	FORGET_PASSWORD = 'azkaban.auth.forgetpassword',
	VERSION = 'azkaban.auth.version',
}

export const AzkabanAuthTopicArray = Object.values(AzkabanAuthTopics);
