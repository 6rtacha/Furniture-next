import { Product } from '../../types/product/product';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MEMBER_FOLLOWERS, GET_PRODUCTS } from '../../../apollo/user/query';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { T } from '../../types/common';
import { Follower } from '../../types/follow/follow';
import AgentFollowerCard from './AgentFollowerCard';
import { FollowInquiry } from '../../types/follow/follow.input';
import { Messages } from '../../config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { LIKE_TARGET_MEMBER } from '../../../apollo/user/mutation';

interface AgentFollowersProps {
	searchFilter: any;
	refetchTrigger: any;
}

const AgentFollowers = (props: AgentFollowersProps) => {
	const { searchFilter, refetchTrigger } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [agentProducts, setAgentProducts] = useState<Product[]>([]);
	const [searchFollower, setSearchFollower] = useState<FollowInquiry>({
		page: 1,
		limit: 20,
		search: {
			followingId: searchFilter.search.memberId,
		},
	});
	const [memberFollowers, setMemberFollowers] = useState<Follower[]>([]);

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.memberId) {
			setSearchFollower((prev) => ({
				...prev,
				search: {
					...prev.search,
					followingId: searchFilter.search.memberId,
				},
			}));
		}
	}, [searchFilter?.search?.memberId]);

	useEffect(() => {
		getMemberFollowersRefetch();
	}, [refetchTrigger]);

	/** APOLLO REQUESTS **/

	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

	const {
		loading: getMemberFollowersLoading,
		data: getMemberFollowersData,
		error: getMemberFollowersError,
		refetch: getMemberFollowersRefetch,
	} = useQuery(GET_MEMBER_FOLLOWERS, {
		skip: !searchFollower?.search?.followingId,
		fetchPolicy: 'network-only',
		variables: { input: searchFollower },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMemberFollowers(data?.getMemberFollowers?.list);
		},
	});

	console.log('memberFollowers', memberFollowers);
	console.log('searchFilter', searchFilter);
	console.log('searchFollower', searchFollower);

	const likeMemberHandler = async (user: any, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetMember({
				variables: {
					input: id,
				},
			});

			await getMemberFollowersRefetch({ input: searchFollower });
			console.log('memberFollowers', memberFollowers);

			await sweetTopSmallSuccessAlert('succes', 800);
		} catch (err: any) {
			console.log('Error, likeMemberHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	return (
		<>
			{memberFollowers.map((memberFollower: Follower) => {
				return <AgentFollowerCard memberFollower={memberFollower} likeMemberHandler={likeMemberHandler} />;
			})}
		</>
	);
};

export default AgentFollowers;
