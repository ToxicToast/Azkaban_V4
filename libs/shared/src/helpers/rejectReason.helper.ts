import { reasons } from './reasons';

export function RejectReasonHelper(): string {
	const maxLength = reasons.length;
	const randomIndex = Math.floor(Math.random() * maxLength);
	return reasons[randomIndex];
}
