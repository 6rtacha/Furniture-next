import { Direction } from '../../enums/common.enum';
import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';

export interface NoticeInput {
	noticeCategory: NoticeCategory;
	noticeStatus: NoticeStatus;
	noticeTitle: string;
	noticeContent: string;
	memberId?: string;
}

export interface NoticesInquiry {
	page: number;
	limit: number;
	direction?: Direction;
}
