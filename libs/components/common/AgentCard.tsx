import React, { use } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../config';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface AgentCardProps {
	agent: any;
	likeMemberHandler: any;
}

const AgentCard = (props: AgentCardProps) => {
	const { agent, likeMemberHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = agent?.memberImage
		? `${REACT_APP_API_URL}/${agent?.memberImage}`
		: '/img/profile/defaultStore.jpg';

	console.log('agent', agent);

	if (device === 'mobile') {
		return <div>AGENT CARD</div>;
	} else {
		return (
			<>
				<Stack className="agent-general-card">
					<Link
						href={{
							pathname: '/store/detail',
							query: { agentId: agent?._id },
						}}
					>
						<Box
							component={'div'}
							className={'agent-img'}
							style={{
								backgroundImage: '/img/profile/defaultStore.jpg',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
								width: '100%',
								height: '433px',
							}}
						>
							<img
								src={imagePath}
								// style={{
								// 	position: 'relative',
								// 	backgroundSize: 'cover',
								// 	backgroundPosition: 'center',
								// 	backgroundRepeat: 'no-repeat',
								// 	width: '100%',
								// 	height: '433px',
								// 	borderRadius: '30px',
								// 	objectFit: 'cover',
								// 	marginTop: '5px',
								// }}
							/>
						</Box>
					</Link>

					<Stack className={'agent-desc'}>
						<Box component={'div'} className={'agent-info'}>
							<Link
								href={{
									pathname: '/agent/detail',
									query: { agentId: 'id' },
								}}
							>
								<strong>{agent?.memberFullName ?? agent?.memberNick}</strong>
								{/* <strong>John</strong> */}
							</Link>
							<span>{agent?.memberAddress ?? 'Seoul'}</span>
						</Box>
						<Box component={'div'} className={'buttons'}>
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{agent?.memberViews}</Typography>
							<IconButton color={'default'} onClick={() => likeMemberHandler(user, agent?._id)}>
								{agent?.meLiked && agent?.meLiked[0]?.myFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
							</IconButton>
							<Typography className="view-cnt">{agent?.memberLikes}</Typography>
						</Box>
					</Stack>
				</Stack>
			</>
		);
	}
};

export default AgentCard;
