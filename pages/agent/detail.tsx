import React, { ChangeEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import PropertyBigCard from '../../libs/components/common/PropertyBigCard';
import ReviewCard from '../../libs/components/agent/ReviewCard';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { Product } from '../../libs/types/product/product';
import { Member } from '../../libs/types/member/member';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { userVar } from '../../apollo/store';
import { ProductsInquiry } from '../../libs/types/product/product.input';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Messages, REACT_APP_API_URL } from '../../libs/config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CREATE_COMMENT, LIKE_TARGET_PRODUCT } from '../../apollo/user/mutation';
import { GET_COMMENTS, GET_MEMBER, GET_PRODUCTS } from '../../apollo/user/query';
import { T } from '../../libs/types/common';

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import AgentBlogCard from '../../libs/components/agent/AgentBlogCard';
import AgentFloowerCard from '../../libs/components/agent/AgentFollowerCard';
import AgentProductCard from '../../libs/components/agent/AgentProductCard';
import AgentProduct from '../../libs/components/agent/AgentProduct';
import AgentBlogs from '../../libs/components/agent/AgentBlogs';
import AgentFollowers from '../../libs/components/agent/AgentFollowers';
import AgentFollowings from '../../libs/components/agent/AgentFollowings';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const AgentDetail: NextPage = ({ initialInput, initialComment, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [agentId, setAgentId] = useState<string | null>(null);
	const [agent, setAgent] = useState<Member | null>(null);
	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(initialInput);
	const [agentProducts, setAgentProducts] = useState<Product[]>([]);
	const [productTotal, setProductTotal] = useState<number>(0);
	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
	const [agentComments, setAgentComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);
	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.MEMBER,
		commentContent: '',
		commentRefId: '',
	});

	/** APOLLO REQUESTS **/
	const [createComment] = useMutation(CREATE_COMMENT);
	const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);

	const {
		loading: getMemberLoading,
		data: getMemberData,
		error: getMemberError,
		refetch: getMemberRefetch,
	} = useQuery(GET_MEMBER, {
		fetchPolicy: 'network-only',
		variables: { input: agentId },
		skip: !agentId,
		onCompleted: (data: T) => {
			setAgent(data?.getMember);
			setSearchFilter({ ...searchFilter, search: { memberId: data?.getMember?._id } });
			setCommentInquiry({ ...commentInquiry, search: { commentRefId: data?.getMember?._id } });
			setInsertCommentData({ ...insertCommentData, commentRefId: data?.getMember?._id });
		},
	});

	const {
		loading: getCommentssLoading,
		data: getCommentsData,
		error: getCommentsError,
		refetch: getCommentsRefetch,
	} = useQuery(GET_COMMENTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: commentInquiry },
		skip: !commentInquiry.search.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentComments(data?.getComments?.list);
			setCommentTotal(data?.getComments?.metaCounter[0].total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.agentId) setAgentId(router.query.agentId as string);
		console.log('agentId:', agentId);
	}, [router]);

	useEffect(() => {}, [searchFilter]);
	useEffect(() => {}, [commentInquiry]);

	/** HANDLERS **/

	const redirectToMemberPageHandler = async (memberId: string) => {
		try {
			if (memberId === user?._id) await router.push(`/mypage?memberId=${memberId}`);
			else await router.push(`/member?memberId=${memberId}`);
		} catch (error) {
			await sweetErrorHandling(error);
		}
	};

	const productPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		searchFilter.page = value;
		setSearchFilter({ ...searchFilter });
	};

	const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		commentInquiry.page = value;
		setCommentInquiry({ ...commentInquiry });
	};

	const createCommentHandler = async () => {
		try {
			if (!user._id) throw new Error(Messages.error2);
			if (user._id === agentId) throw new Error('Cannot write a revieew for yourself');
			await createComment({
				variables: {
					input: insertCommentData,
				},
			});

			setInsertCommentData({ ...insertCommentData, commentContent: '' });

			await getCommentsRefetch({ input: commentInquiry });
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const likeProductHandler = async (user: any, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetProduct({
				variables: {
					input: id,
				},
			});

			// await getProductsRefetch({ input: searchFilter });
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('Error, likeProductHandler: ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const changeTabHandler = (tab: string) => {
		router.push(
			{
				pathname: '/agent/detail',
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
				pathname: '/agent/detail',
				query: { tab1: tab1 },
			},
			undefined,
			{ scroll: false },
		);
	};
	const tab1 = router.query.tab1 ?? 'followers';

	if (device === 'mobile') {
		return <div>AGENT DETAIL PAGE MOBILE</div>;
	} else {
		return (
			<Stack className={'agent-detail-page'}>
				<Stack className={'container'}>
					<Stack className={'info-card'}>
						<Stack className={'agent-image'}>
							{agent?.memberImage ? (
								<img src={`${REACT_APP_API_URL}/${agent?.memberImage}`} alt="" />
							) : (
								<span>Agent's Image is not available right now!</span>
							)}
						</Stack>
						<Stack className={'agent-info'}>
							<Stack className={'agent-name'}>
								<span>{agent?.memberNick}</span>
								<Button className={'follow-btn'}>
									<span>Follow</span>
								</Button>
							</Stack>
							<Stack className={'agent-desc'}>
								<Stack className={'designer'}>
									<span>Designer</span>
								</Stack>
								<Stack className={'description'}>
									<span>{agent?.memberDesc}</span>
								</Stack>
								<Stack className={'mail-info'}>
									<img src="/img/icons/mail.png" />
									<span>info@youremail.com</span>
								</Stack>
								<Stack className={'mail-info'}>
									<img src="/img/icons/phone.png" />
									<span>+821034401234</span>
								</Stack>
								<Stack className={'mail-info'}>
									<img src="/img/icons/domain.png" />
									<span>yourdomain.com</span>
								</Stack>
								<Stack className={'social-media'}>
									<FacebookOutlinedIcon />
									<TelegramIcon />
									<InstagramIcon />
									<TwitterIcon />
								</Stack>
							</Stack>
						</Stack>
					</Stack>
					<Stack className={'agent-home-list'}>
						<Stack className={'project-blog'}>
							<Stack className={'button'}>
								<Button
									// className={'btn'}
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
									<div>Blog</div>
								</Button>
							</Stack>
							<div className="divider"></div>
							<Stack className={'cards'}>
								{tab === 'product' && <AgentProduct searchFilter={searchFilter} />}

								{tab === 'blog' && <AgentBlogs searchFilter={searchFilter} />}
							</Stack>
						</Stack>
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
								{tab1 === 'followers' && <AgentFollowers searchFilter={searchFilter} />}

								{tab1 === 'followings' && <AgentFollowings searchFilter={searchFilter} />}
							</Stack>
						</Stack>
					</Stack>
					<Stack className={'review-box'}>
						<Stack className={'main-intro'}>
							<span>Reviews</span>
							<p>we are glad to see you again</p>
						</Stack>
						{commentTotal !== 0 && (
							<Stack className={'review-wrap'}>
								<Box component={'div'} className={'title-box'}>
									<StarIcon />
									<span>
										{commentTotal} review{commentTotal > 1 ? 's' : ''}
									</span>
								</Box>
								{agentComments?.map((comment: Comment) => {
									return <ReviewCard comment={comment} key={comment?._id} />;
								})}
								<Box component={'div'} className={'pagination-box'}>
									<Pagination
										page={commentInquiry.page}
										count={Math.ceil(commentTotal / commentInquiry.limit) || 1}
										onChange={commentPaginationChangeHandler}
										shape="circular"
										color="primary"
									/>
								</Box>
							</Stack>
						)}

						<Stack className={'leave-review-config'}>
							<Typography className={'main-title'}>Leave A Review</Typography>
							<Typography className={'review-title'}>Review</Typography>
							<textarea
								onChange={({ target: { value } }: any) => {
									setInsertCommentData({ ...insertCommentData, commentContent: value });
								}}
								value={insertCommentData.commentContent}
							></textarea>
							<Box className={'submit-btn'} component={'div'}>
								<Button
									className={'submit-review'}
									disabled={insertCommentData.commentContent === '' || user?._id === ''}
									onClick={createCommentHandler}
								>
									<Typography className={'title'}>Submit Review</Typography>
									<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
										<g clipPath="url(#clip0_6975_3642)">
											<path
												d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
												fill="#181A20"
											/>
										</g>
										<defs>
											<clipPath id="clip0_6975_3642">
												<rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
											</clipPath>
										</defs>
									</svg>
								</Button>
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

AgentDetail.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {
			memberId: '',
		},
	},
	initialComment: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'ASC',
		search: {
			commentRefId: '',
		},
	},
};

export default withLayoutBasic(AgentDetail);
