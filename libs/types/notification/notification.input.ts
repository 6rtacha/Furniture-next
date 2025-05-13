import { NotificationGroup, NotificationType } from '../../enums/notification.enum';

export interface NotificationInput {
	notificationType: NotificationType;
	notificationGroup: NotificationGroup;
	notificationTitle: string;
	authorId: string;
	receiverId: string;
}
