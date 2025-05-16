import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';
import { TotalCounter } from '../product/product';

export interface Notice1 {
	_id: string;
	noticeCategory: NoticeCategory;
	noticeStatus: NoticeStatus;
	noticeTitle: string;
	noticeContent: string;
	memberId: string;
	deletedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface Notices {
	list: Notice1[];
	metaCounter: TotalCounter[];
}
