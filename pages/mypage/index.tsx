import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Button, Stack } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import MyProfile from '../../libs/components/mypage/MyProfile';
import MyArticles from '../../libs/components/mypage/MyArticles';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { sweetConfirmAlert, sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LIKE_TARGET_MEMBER, SUBSCRIBE, UNSUBSCRIBE } from '../../apollo/user/mutation';
import { Messages, REACT_APP_API_URL } from '../../libs/config';
import MyProducts from '../../libs/components/mypage/MyProducts';
import { GET_MEMBER } from '../../apollo/user/query';
import { Member } from '../../libs/types/member/member';
import { T } from '../../libs/types/common';
import { MemberType } from '../../libs/enums/member.enum';
import { logOut } from '../../libs/auth';
import MyFollowers from '../../libs/components/mypage/MyFollowers';
import MyFollowings from '../../libs/components/mypage/MyFollowings';
import AddProduct from '../../libs/components/mypage/AddNewProduct';
import WriteArticle from '../../libs/components/mypage/WriteArticle';

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
	const [member, setMember] = useState<Member | null>(null);
	const { memberId } = router.query;
	const imagePath: string = user.memberImage
		? `${REACT_APP_API_URL}/${user.memberImage}`
		: '/img/community/communityImg.png';

	/** APOLLO REQUESTS **/
	const [subscribe] = useMutation(SUBSCRIBE);
	const [unsubscribe] = useMutation(UNSUBSCRIBE);
	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

	// const {
	// 	loading: getMemberLoading,
	// 	data: getMemberData,
	// 	error: getMemberError,
	// 	refetch: getMemberRefetch,
	// } = useQuery(GET_MEMBER, {
	// 	fetchPolicy: 'network-only',
	// 	variables: { input: memberId },
	// 	skip: !memberId,
	// 	notifyOnNetworkStatusChange: true,
	// 	onCompleted: (data: T) => {
	// 		setMember(data?.getMember);
	// 	},
	// });
	console.log('member', member);
	console.log('memberId', memberId);

	/** LIFECYCLES **/
	useEffect(() => {
		if (!user._id) router.push('/mypage').then();
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

	const logoutHandler = async () => {
		try {
			if (await sweetConfirmAlert('Do you want to logout?')) logOut();
			await router.push({ pathname: '/account/join' }).then();
		} catch (err: any) {
			console.log('ERROR, logoutHandler:', err.message);
		}
	};

	const changeTabHandler = (tab: string) => {
		router.push(
			{
				pathname: '/mypage',
				query: { tab: tab },
			},
			undefined,
			{ scroll: false },
		);
	};
	const tab = router.query.tab ?? 'product';

	const changeTabHandler1 = (tab1: string) => {
		router.push(
			{
				pathname: '/mypage',
				query: { tab1: tab1 },
			},
			undefined,
			{ scroll: false },
		);
	};
	const tab1 = router.query.tab1 ?? 'followers';

	const changeTabHandler2 = (tab2: string) => {
		router.push(
			{
				pathname: '/mypage',
				query: { tab2: tab2 },
			},
			undefined,
			{ scroll: false },
		);
	};
	const tab2 = router.query.tab2 ?? 'followings';

	if (device === 'mobile') {
		return <div>MY PAGE</div>;
	} else {
		return (
			<div id="my-page" style={{ position: 'relative' }}>
				<Stack className={'container'}>
					<Stack className={'info-card'}>
						<Stack className={'agent-image'}>
							<img src={imagePath} />
						</Stack>
						<Stack className={'agent-info'}>
							<Stack className={'agent-name'}>
								<span>{user?.memberNick}</span>
								<Button className={'logout-btn'} onClick={logoutHandler}>
									<span>Logout</span>
								</Button>
							</Stack>
							<Stack className={'agent-desc'}>
								<Stack className={'designer'}>
									{user.memberType == MemberType.AGENT ? <span>Store</span> : <span>User</span>}

									<span>{user?.memberPhone}</span>
								</Stack>
							</Stack>
							<MyProfile />
						</Stack>
					</Stack>
					<Stack className={'agent-home-list'}>
						{user?.memberType === MemberType.AGENT && (
							<Stack className={'project-blog'}>
								<Stack className={'button'}>
									<Button
										id={'btn'}
										className={tab == 'product' ? 'active' : ''}
										onClick={() => {
											changeTabHandler('product');
										}}
									>
										<div>Products</div>
									</Button>
									<Button
										id={'btn'}
										className={tab == 'blog' ? 'active' : ''}
										onClick={() => {
											changeTabHandler('blog');
										}}
									>
										<div>Blogs</div>
									</Button>
								</Stack>
								<div className="divider"></div>
								<Stack className={'cards'}>
									{tab === 'product' && <MyProducts />}

									{tab === 'blog' && <MyArticles />}
								</Stack>
							</Stack>
						)}
						{user?.memberType === MemberType.AGENT && (
							<Stack className={'follower-following'}>
								<Stack className={'button'}>
									<Button
										id={'btn'}
										className={tab1 == 'followers' ? 'active' : ''}
										onClick={() => {
											changeTabHandler1('followers');
										}}
									>
										<span>Followers</span>
									</Button>

									<Button
										id={'btn'}
										className={tab1 == 'followings' ? 'active' : ''}
										onClick={() => {
											changeTabHandler1('followings');
										}}
									>
										<span>Followings</span>
									</Button>
								</Stack>
								<div className="divider"></div>
								<Stack className={'cards'}>
									{tab1 === 'followers' && <MyFollowers />}

									{tab1 === 'followings' && <MyFollowings />}
								</Stack>
							</Stack>
						)}
						{user?.memberType === MemberType.USER && (
							<Stack className={'follower-following'}>
								<Stack className={'button'}>
									<Button
										id={'btn'}
										className={tab2 == 'followings' ? 'active' : ''}
										onClick={() => {
											changeTabHandler2('followings');
										}}
									>
										<span>Followings</span>
									</Button>

									<Button
										id={'btn'}
										className={tab2 == 'blog' ? 'active' : ''}
										onClick={() => {
											changeTabHandler2('blog');
										}}
									>
										<div>Blogs</div>
									</Button>
								</Stack>
								<div className="divider"></div>
								<Stack className={'cards'}>
									{tab2 === 'followings' && <MyFollowings />}

									{tab2 === 'blog' && <MyArticles />}
								</Stack>
							</Stack>
						)}
						{/* {user?.memberType === MemberType.USER && <WriteArticle />} */}
					</Stack>
					{user?.memberType === MemberType.AGENT && <AddProduct />}
				</Stack>
			</div>
		);
	}
};

MyPage.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {
			memberId: '',
		},
	},
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
