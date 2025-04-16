export enum AzkabanWebhookTopics {
	VERSION = 'azkaban.webhook.version',
	APIALERTS = 'azkaban.webhook.apialerts',
}

export const AzkabanWebhookTopicArray = Object.values(AzkabanWebhookTopics);
