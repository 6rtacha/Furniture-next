import { Product } from '../../types/product/product';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { GET_MEMBER_FOLLOWERS, GET_MEMBER_FOLLOWINGS, GET_PRODUCTS } from '../../../apollo/user/query';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { T } from '../../types/common';
import { Following, Followings } from '../../types/follow/follow';
import { FollowInquiry } from '../../types/follow/follow.input';
import { Messages } from '../../config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { LIKE_TARGET_MEMBER } from '../../../apollo/user/mutation';
import { userVar } from '../../../apollo/store';
import AgentFollowingCard from '../agent/AgentFollowingCard';

const MyFollowings = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [myFollowings, setMyFollowings] = useState<Followings[]>([]);
	const [searchFollowing, setSearchFollowing] = useState<FollowInquiry>({
		page: 1,
		limit: 20,
		search: {
			followerId: user?._id,
		},
	});
	const [memberFollowings, setMemberFollowings] = useState<Following[]>([]);

	/** APOLLO REQUESTS **/

	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

	const {
		loading: getMemberFollowingsLoading,
		data: getMemberFollowingsData,
		error: getMemberFollowsingError,
		refetch: getMemberFollowingsRefetch,
	} = useQuery(GET_MEMBER_FOLLOWINGS, {
		skip: !searchFollowing?.search?.followerId,
		fetchPolicy: 'network-only',
		variables: { input: searchFollowing },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMemberFollowings(data?.getMemberFollowings?.list);
		},
	});

	const likeMemberHandler = async (user: any, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetMember({
				variables: {
					input: id,
				},
			});

			await getMemberFollowingsRefetch({ input: searchFollowing });
			console.log('memberFollowers', memberFollowings);

			await sweetTopSmallSuccessAlert('succes', 800);
		} catch (err: any) {
			console.log('Error, likeMemberHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	return (
		<>
			{memberFollowings.map((memberFollowing: Following) => {
				return <AgentFollowingCard memberFollowing={memberFollowing} likeMemberHandler={likeMemberHandler} />;
			})}
		</>
	);
};

MyFollowings.defaultProps = {
	initialInput: {
		page: 1,
		limit: 20,
		search: {
			memberId: '',
		},
	},
};

export default MyFollowings;
