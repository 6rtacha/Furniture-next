import { Product } from '../../types/product/product';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MEMBER_FOLLOWERS, GET_MEMBER_FOLLOWINGS, GET_PRODUCTS } from '../../../apollo/user/query';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { T } from '../../types/common';
import { Follower, Following } from '../../types/follow/follow';
import AgentFollowerCard from './AgentFollowerCard';
import { FollowInquiry } from '../../types/follow/follow.input';
import AgentFollowingCard from './AgentFollowingCard';

interface AgentFollowingsProps {
	searchFilter: any;
}

const AgentFollowings = (props: AgentFollowingsProps) => {
	const { searchFilter } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [agentProducts, setAgentProducts] = useState<Product[]>([]);
	const [searchFollowing, setSearchFollowing] = useState<FollowInquiry>({
		page: 1,
		limit: 20,
		search: {
			followerId: searchFilter.search.memberId,
		},
	});
	const [memberFollowings, setMemberFollowings] = useState<Following[]>([]);

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.memberId) {
			setSearchFollowing((prev) => ({
				...prev,
				search: {
					...prev.search,
					followerId: searchFilter.search.memberId,
				},
			}));
		}
	}, [searchFilter?.search?.memberId]);

	/** APOLLO REQUESTS **/
	const {
		loading: getMemberFollowingsLoading,
		data: getMemberFollowingsData,
		error: getMemberFollowingsError,
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

	console.log('memberFollowings', memberFollowings);
	console.log('searchFilter', searchFilter);
	console.log('searchFollowing', searchFollowing);

	return (
		<>
			{memberFollowings.map((memberFollowing: Following) => {
				return <AgentFollowingCard memberFollowing={memberFollowing} />;
			})}
		</>
	);
};

export default AgentFollowings;
