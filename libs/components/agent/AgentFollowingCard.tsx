import { Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Following } from '../../types/follow/follow';
import { REACT_APP_API_URL } from '../../config';

interface AgentFollowingCardProps {
	memberFollowing: Following;
}

const AgentFollowingCard = (props: AgentFollowingCardProps) => {
	const { memberFollowing } = props;
	return (
		<Stack className={'pb-card'}>
			<img src={`${REACT_APP_API_URL}/${memberFollowing?.followingData?.memberImage}`} alt="" />
			<Stack className={'card-info'}>
				<Stack className={'pb-name'}>
					<div className="name">{memberFollowing?.followingData?.memberNick}</div>
					<FavoriteIcon color="#cda274" />
					<FavoriteBorderIcon />
				</Stack>
				<Stack className={'status'}>
					<span>Follower ({memberFollowing?.followingData?.memberFollowers})</span>
					<span>Following ({memberFollowing?.followingData?.memberFollowings})</span>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AgentFollowingCard;
