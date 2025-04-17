import { Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Follower } from '../../types/follow/follow';
import { REACT_APP_API_URL } from '../../config';

interface AgentFollowerCardProps {
	memberFollower: Follower;
}

const AgentFollowerCard = (props: AgentFollowerCardProps) => {
	const { memberFollower } = props;
	return (
		<Stack className={'pb-card'}>
			<img src={`${REACT_APP_API_URL}/${memberFollower?.followerData?.memberImage}`} alt="" />
			<Stack className={'card-info'}>
				<Stack className={'pb-name'}>
					<div className="name">{memberFollower?.followerData?.memberNick}</div>
					<FavoriteIcon color="#cda274" />
					<FavoriteBorderIcon />
				</Stack>
				<Stack className={'status'}>
					<span>Follower ({memberFollower?.followerData?.memberFollowers})</span>
					<span>Following ({memberFollower?.followerData?.memberFollowings})</span>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AgentFollowerCard;
