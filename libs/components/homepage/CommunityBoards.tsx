import React, { useState } from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack, Typography } from '@mui/material';
import CommunityCard from './CommunityCard';
import { BoardArticle } from '../../types/board-article/board-article';
import { useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import { T } from '../../types/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

const CommunityBoards = () => {
	const device = useDeviceDetect();
	const [searchCommunity, setSearchCommunity] = useState({
		page: 1,
		sort: 'articleViews',
		direction: 'DESC',
	});
	const [newsArticles, setNewsArticles] = useState<BoardArticle[]>([]);
	const [freeArticles, setFreeArticles] = useState<BoardArticle[]>([]);

	/** APOLLO REQUESTS **/

	const {
		loading: getNewsArticlesLoading,
		data: getNewsArticlesData,
		error: getNewsArticlesError,
		refetch: getNewsArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'network-only', // cache + => network -
		variables: { input: { ...searchCommunity, limit: 6, search: { articleCategory: BoardArticleCategory.NEWS } } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNewsArticles(data?.getBoardArticles?.list);
		},
	});
	const {
		loading: getFreeArticlesLoading,
		data: getFreeArticlesData,
		error: getFreeArticlesError,
		refetch: getFreeArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'network-only', // cache + => network -
		variables: { input: { ...searchCommunity, limit: 3, search: { articleCategory: BoardArticleCategory.FREE } } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFreeArticles(data?.getBoardArticles?.list);
		},
	});

	if (device === 'mobile') {
		return <div>COMMUNITY BOARDS (MOBILE)</div>;
	} else {
		return (
			<Stack className={'community-board'}>
				<Stack className={'headline'}>
					<span>Articles & News</span>
				</Stack>
				<Stack className={'card-frame'}>
					<Swiper
						className={'article-swiper'}
						slidesPerView={'auto'}
						spaceBetween={30}
						modules={[Autoplay, Navigation, Pagination]}
						navigation={{
							nextEl: '.swiper-community-next',
							prevEl: '.swiper-community-prev',
						}}
						pagination={{
							el: '.swiper-community-pagination',
						}}
					>
						{newsArticles.map((article, index) => {
							return (
								<SwiperSlide className={'article-slide'} key={article?._id}>
									<CommunityCard article={article} key={article?._id} index={index} />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</Stack>
				<Stack className={'pagination-box'}>
					<WestIcon className={'swiper-community-prev'} />
					<div className={'swiper-community-pagination'}></div>
					<EastIcon className={'swiper-community-next'} />
				</Stack>
			</Stack>
		);
	}
};

export default CommunityBoards;
