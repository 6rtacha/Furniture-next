import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Button, Stack } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import MyProperties from '../../libs/components/mypage/MyProperties';
import MyFavorites from '../../libs/components/mypage/MyFavorites';
import RecentlyVisited from '../../libs/components/mypage/RecentlyVisited';
import AddProperty from '../../libs/components/mypage/AddNewProperty';
import MyProfile from '../../libs/components/mypage/MyProfile';
import MyArticles from '../../libs/components/mypage/MyArticles';
import { useMutation, useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import MyMenu from '../../libs/components/mypage/MyMenu';
import WriteArticle from '../../libs/components/mypage/WriteArticle';
import MemberFollowers from '../../libs/components/member/MemberFollowers';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import MemberFollowings from '../../libs/components/member/MemberFollowings';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LIKE_TARGET_MEMBER, SUBSCRIBE, UNSUBSCRIBE } from '../../apollo/user/mutation';
import { Messages } from '../../libs/config';
import AgentBlogCard from '../../libs/components/agent/AgentBlogCard';
import AgentFloowerCard from '../../libs/components/agent/AgentFollowerCard';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const MyPage: NextPage = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const category: any = router.query?.category ?? 'myProfile';

	/** APOLLO REQUESTS **/
	const [subscribe] = useMutation(SUBSCRIBE);
	const [unsubscribe] = useMutation(UNSUBSCRIBE);
	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

	/** LIFECYCLES **/
	useEffect(() => {
		if (!user._id) router.push('/').then();
	}, [user]);

	/** HANDLERS **/
	const subscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
			console.log('id:', id);
			if (!id) throw new Error(Messages.error1);
			if (!user._id) throw new Error(Messages.error2);

			await subscribe({
				variables: {
					input: id,
				},
			});
			await sweetTopSmallSuccessAlert('Subscribed!', 800);
			await refetch({ input: query });
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const unsubscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
			if (!id) throw new Error(Messages.error1);
			if (!user._id) throw new Error(Messages.error2);

			await unsubscribe({
				variables: {
					input: id,
				},
			});
			await sweetTopSmallSuccessAlert('Unsubscribed!', 800);
			await refetch({ input: query });
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const likeMemberHandler = async (id: string, refetch: any, query: any) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetMember({
				variables: {
					input: id,
				},
			});
			await sweetTopSmallSuccessAlert('Success!', 800);
			await refetch({ input: query });
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const redirectToMemberPageHandler = async (memberId: string) => {
		try {
			if (memberId === user?._id) await router.push(`/mypage?memberId=${memberId}`);
			else await router.push(`/member?memberId=${memberId}`);
		} catch (error) {
			await sweetErrorHandling(error);
		}
	};

	if (device === 'mobile') {
		return <div>MY PAGE</div>;
	} else {
		return (
			<div id="my-page" style={{ position: 'relative' }}>
				<Stack className={'container'}>
					<Stack className={'info-card'}>
						<Stack className={'agent-image'}>
							<img src="https://s3-alpha-sig.figma.com/img/ef08/0257/2c6e28c6aa31cb138d47922a76a4bf10?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pbQj8T20uv6M96bjpR15Pbotqnyps1AUdp8rlAL1JgQ23Z8Ddil0gGcNW5HlvLrMckXnr1be5FrGJ~-KxBncwJAJHM62wvMPOkF8nqWkEdhfNiB686vj71hK5DX8DkiTZu2A8IhxBaENJLO0OFmaQnNhqwK4y-QLehtLMfTynqy36n1jtYcCc258bfOvza5Z8f7-G~a9meIVFEo9g3JKYohA978WLMS9nhh2aV357VnbtoKvoCqkwxC2EQeYIBlHKBPk1WDNsqLEQ6z9eur1Nnr9C5h7Xw-7VQL~blWeSUqzIKBJUES9WYc7tIPOkDG7Nd0zOhnlw30a85f0C3b-1w__" />
						</Stack>
						<Stack className={'agent-info'}>
							<Stack className={'agent-name'}>
								<span>John Smith</span>
								<Button className={'logout-btn'}>
									<span>Logout</span>
								</Button>
							</Stack>
							<Stack className={'agent-desc'}>
								<Stack className={'designer'}>
									<span>Designer</span>
									<span>01034401234</span>
								</Stack>
							</Stack>
							<MyProfile />
						</Stack>
					</Stack>
					<Stack className={'agent-home-list'}>
						<Stack className={'project-blog'}>
							<Stack className={'button'}>
								<Button className={'btn'}>
									<span>Projects</span>
								</Button>
								<Button className={'btn'}>
									<span>Blog</span>
								</Button>
							</Stack>
							<div className="divider"></div>
							<Stack className={'cards'}>
								<AgentBlogCard />
							</Stack>
						</Stack>
						<Stack className={'follower-following'}>
							<Stack className={'button'}>
								<Button className={'btn'}>
									<span>Followers</span>
								</Button>
								<Button className={'btn'}>
									<span>Followings</span>
								</Button>
							</Stack>
							<div className="divider"></div>
							<Stack className={'cards'}>
								<AgentFloowerCard />
							</Stack>
						</Stack>
					</Stack>
					<AddProperty />
				</Stack>
			</div>
		);
	}
};

export default withLayoutBasic(MyPage);
// {category === 'addProperty' && <AddProperty />}
// 									{category === 'myProperties' && <MyProperties />}
// 									{category === 'myFavorites' && <MyFavorites />}
// 									{category === 'recentlyVisited' && <RecentlyVisited />}
// 									{category === 'myArticles' && <MyArticles />}
// 									{category === 'writeArticle' && <WriteArticle />}
// 									{category === 'myProfile' && <MyProfile />}
// 									{category === 'followers' && (
// 										<MemberFollowers
// 											subscribeHandler={subscribeHandler}
// 											unsubscribeHandler={unsubscribeHandler}
// 											likeMemberHandler={likeMemberHandler}
// 											redirectToMemberPageHandler={redirectToMemberPageHandler}
// 										/>
// 									)}
// 									{category === 'followings' && (
// 										<MemberFollowings
// 											subscribeHandler={subscribeHandler}
// 											unsubscribeHandler={unsubscribeHandler}
// 											likeMemberHandler={likeMemberHandler}
// 											redirectToMemberPageHandler={redirectToMemberPageHandler}
// 										/>
// 									)}
