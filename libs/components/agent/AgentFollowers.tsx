import { Product } from '../../types/product/product';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MEMBER_FOLLOWERS, GET_PRODUCTS } from '../../../apollo/user/query';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { T } from '../../types/common';
import { Follower } from '../../types/follow/follow';
import AgentFollowerCard from './AgentFollowerCard';
import { FollowInquiry } from '../../types/follow/follow.input';

interface AgentFollowersProps {
	searchFilter: any;
}

const AgentFollowers = (props: AgentFollowersProps) => {
	const { searchFilter } = props;
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

	/** APOLLO REQUESTS **/
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

	return (
		<>
			{memberFollowers.map((memberFollower: Follower) => {
				return <AgentFollowerCard memberFollower={memberFollower} />;
			})}
		</>
	);
};

export default AgentFollowers;
