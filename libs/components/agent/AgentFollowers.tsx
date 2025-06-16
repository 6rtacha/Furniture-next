import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MEMBER_FOLLOWERS } from '../../../apollo/user/query';
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
	const [memberFollowers, setMemberFollowers] = useState<Follower[]>([]);
	const [searchFollower, setSearchFollower] = useState<FollowInquiry>({
		page: 1,
		limit: 20,
		search: {
			followingId: searchFilter.search.memberId || '',
		},
	});

	/** APOLLO REQUESTS **/
	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

	const {
		loading: getMemberFollowersLoading,
		data: getMemberFollowersData,
		error: getMemberFollowersError,
		refetch: getMemberFollowersRefetch,
	} = useQuery(GET_MEMBER_FOLLOWERS, {
		fetchPolicy: 'network-only', // Ensure fresh data on load
		variables: { input: searchFollower },
		skip: !searchFollower?.search?.followingId, // Skip only if followingId is empty
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMemberFollowers(data?.getMemberFollowers?.list || []);
		},
	});

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

	// Trigger refetch when searchFollower or refetchTrigger changes
	useEffect(() => {
		if (searchFollower.search.followingId) {
			getMemberFollowersRefetch({ input: searchFollower });
		}
	}, [searchFollower.search.followingId, refetchTrigger]);

	/** HANDLERS **/
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
			await sweetTopSmallSuccessAlert('Success', 800);
		} catch (err: any) {
			console.log('Error, likeMemberHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	// if (getMemberFollowersLoading) return <div>Loading followers...</div>;
	if (getMemberFollowersError) return <div>Error loading followers: {getMemberFollowersError.message}</div>;

	return (
		<>
			{memberFollowers.length > 0 ? (
				memberFollowers.map((memberFollower: Follower) => (
					<AgentFollowerCard
						key={memberFollower._id}
						memberFollower={memberFollower}
						likeMemberHandler={likeMemberHandler}
					/>
				))
			) : (
				<div>No followers found</div>
			)}
		</>
	);
};

export default AgentFollowers;
