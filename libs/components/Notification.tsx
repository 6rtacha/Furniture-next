import React, { useEffect, useState, useRef } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { socketVar, userVar } from '../../apollo/store';
import { GET_ALL_NOTIFICATIONS, GET_ALL_NOTIFICATIONS1 } from '../../apollo/user/query';
import { NotificationsInquiry } from '../types/notification/notification.update';
import { T } from '../types/common';
import { Notification1 } from '../types/notification/notification';
import { LoggingWebSocket } from '../../apollo/client';
import { NotificationStatus } from '../enums/notification.enum';
import { Box } from '@mui/material';
import { UPDATE_NOTIFICATION } from '../../apollo/user/mutation';

interface NotificationPayload {
	event: string;
	notification: Notification1;
}

const Notifications = ({ initialInput, initialInput1, ...props }: any) => {
	const [notificationInput, setNotificationInput] = useState<NotificationsInquiry>(initialInput);
	const [openNotification, setOpenNotification] = useState(false);
	const [notifications, setNotifications] = useState<Notification1[]>([]);
	const [total, setTotal] = useState<number>(0);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const wsRef = useRef<LoggingWebSocket | null>(null);

	const user = useReactiveVar(userVar);
	const socket = useReactiveVar(socketVar);

	/** APOLLO REQUESTS **/
	const [updateNotification] = useMutation(UPDATE_NOTIFICATION);
	const {
		loading: getAllNotificationsLoading,
		data: getAllNotificationsData,
		error: getAllNotificationsError,
		refetch: getAllNotificationsRefetch,
	} = useQuery(GET_ALL_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: notificationInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNotifications(data?.getAllNotifications?.list);
			// setTotal(data?.getAllNotifications?.metaCounter[0]?.total ?? 0);
		},
	});

	const {
		loading: getAllNotificationsLoading1,
		data: getAllNotificationsData1,
		error: getAllNotificationsError1,
		refetch: getAllNotificationsRefetch1,
	} = useQuery(GET_ALL_NOTIFICATIONS1, {
		fetchPolicy: 'network-only',
		variables: { input: initialInput1 },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTotal(data?.getAllNotifications1?.metaCounter[0]?.total ?? 0);
		},
	});
	console.log('notifications', notifications);

	/** WEBSOCKET SETUP **/
	useEffect(() => {
		if (!socket) return;

		const handleMessage = (msg: MessageEvent) => {
			const data = JSON.parse(msg.data);
			console.log('WebSocket notification data:', data);

			if (data.event === 'notification') {
				const newNotification: NotificationPayload = data;
				console.log('newNotification', newNotification);
				// setNotifications((prevNotifications) => [...prevNotifications, newNotification.notification]);
				getAllNotificationsRefetch({ input: notificationInput });
				getAllNotificationsRefetch1({ input: initialInput1 });
				// setTotal((prevTotal) => prevTotal + 1);
			}
		};

		socket.addEventListener('message', handleMessage);

		return () => {
			socket.removeEventListener('message', handleMessage);
		};
	}, [socket]);

	const toggleDropdown = () => setOpenNotification((prev) => !prev);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setOpenNotification(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// HANDLERS

	const readHandler = (notificationId: string) => {
		updateNotification({
			variables: {
				input: {
					_id: notificationId,
					notificationStatus: NotificationStatus.READ,
				},
			},
		});
		getAllNotificationsRefetch({ input: notificationInput });
		getAllNotificationsRefetch1({ input: initialInput1 });
	};

	return (
		<div className="notification" ref={dropdownRef}>
			{user?._id && (
				<>
					<NotificationsIcon className="notification-icon" onClick={toggleDropdown} />
					{total > 0 && <span className="notification-count">{total}</span>}

					{openNotification && (
						<div className="notificationInfo">
							{notifications.length > 0 ? (
								notifications.map((notification: Notification1) => (
									<Box
										key={notification._id}
										sx={{
											backgroundColor: notification.notificationStatus === NotificationStatus.WAIT ? '#e5d3bf' : '#fff',
											padding: '8px',
											borderRadius: '4px',
										}}
										onClick={() => readHandler(notification?._id)}
									>
										{notification.memberData?.memberNick} {notification.notificationTitle}
									</Box>
								))
							) : (
								<span>No notifications</span>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
};

Notifications.defaultProps = {
	initialInput: {
		page: 1,
		limit: 100,
	},
	initialInput1: {
		page: 1,
		limit: 100,
		notificationStatus: NotificationStatus.WAIT,
	},
};

export default Notifications;
