import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Notice1 } from '../../types/notice/notice';
import { useQuery } from '@apollo/client';
import { GET_NOTICES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import Moment from 'react-moment';

const Notice = () => {
	const device = useDeviceDetect();
	const [notices, setNotices] = useState<Notice1[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getNoticesLoading,
		data: getNoticesData,
		error: getNoticesError,
		refetch: getNoticesRefetch,
	} = useQuery(GET_NOTICES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: {
				page: 1,
				limit: 100,
			},
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNotices(data?.getNotices?.list);
		},
	});
	console.log('notices', notices);

	/** LIFECYCLES **/
	/** HANDLERS **/

	// const data = [
	// 	{
	// 		no: 1,
	// 		event: true,
	// 		title: 'Register to use and get discounts',
	// 		date: '01.03.2024',
	// 	},
	// 	{
	// 		no: 2,
	// 		title: "It's absolutely free to upload and trade properties",
	// 		date: '31.03.2024',
	// 	},
	// ];

	if (device === 'mobile') {
		return <div>NOTICE MOBILE</div>;
	} else {
		return (
			<Stack className={'notice-content'}>
				<span className={'title'}>Notice</span>
				<Stack className={'main'}>
					<Box component={'div'} className={'top'}>
						<span>number</span>
						<span>title</span>
						<span>date</span>
					</Box>
					<Stack className={'bottom'}>
						{notices.map((notice: Notice1) => (
							<div className={`notice-card`} key={notice.noticeTitle}>
								<span className={'notice-number'}>{notice?.noticeCategory}</span>
								<span className={'notice-title'}>{notice?.noticeTitle}jbbjj</span>
								<Moment format="DD MMMM, YYYY" className={'notice-date'}>
									{notice?.createdAt}
								</Moment>
							</div>
						))}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Notice;
