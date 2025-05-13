import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';
import { MeLiked, TotalCounter } from '../product/product';
import { MeFollowed } from '../follow/follow';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';
import { Member } from '../member/member';

export interface Notification1 {
	_id: string;
	notificationType: NotificationType;
	notificationStatus: NotificationStatus;
	notificationGroup: NotificationGroup;
	notificationTitle: string;
	notificationDesc?: string;
	authorId?: string;
	receiverId: string;
	memberData?: Member;
}

export interface Notifications {
	list: Notification1[];
	metaCounter: TotalCounter[];
}
