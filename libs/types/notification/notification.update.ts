import { Direction } from '../../enums/common.enum';
import { NotificationStatus } from '../../enums/notification.enum';

export interface NotificationUpdate {
	_id: string;
	notificationStatus: NotificationStatus;
}

export interface NotificationsInquiry {
	page: number;
	limit: number;
	direction?: Direction;
	notificationStatus?: NotificationStatus;
}
