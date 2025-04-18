import { Product } from '../../types/product/product';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MEMBER_FOLLOWINGS } from '../../../apollo/user/query';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { T } from '../../types/common';
import { Following } from '../../types/follow/follow';
import { FollowInquiry } from '../../types/follow/follow.input';
import AgentFollowingCard from './AgentFollowingCard';
import { LIKE_TARGET_MEMBER } from '../../../apollo/user/mutation';
import { Messages } from '../../config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';

interface AgentFollowingsProps {
	searchFilter: any;
	refetchTrigger: any;
}

const AgentFollowings = (props: AgentFollowingsProps) => {
	const { searchFilter, refetchTrigger } = props;
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

	useEffect(() => {
		getMemberFollowingsRefetch();
	}, [refetchTrigger]);

	/** APOLLO REQUESTS **/

	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

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
			console.log('memberFollowings', memberFollowings);

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

export default AgentFollowings;
