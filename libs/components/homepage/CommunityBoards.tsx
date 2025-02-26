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
					<Box className={'card'}>
						<img src="https://s3-alpha-sig.figma.com/img/f4b2/a97e/4c4f8f5e4759944aaba98a3c6dd3e663?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J3lK7R7OBd3vEEGob8cACKMDUCzH4K7fRZFrlYqJCKO~9Z~zNHD4JEq5FQg-XM3mukLZ8MQTaPT-Zz6cmh9XbuVl6k1UfUa1EtSQebhO~N7GFVUfBXNuJISFO6aPQKrPhMbnfhjOD7z3peUbk4hSmNdws44FngRitZ9t~7ADY1yOOfsGHGJw3uHX1Dcczho6LBvXXu5o25kqXTIv~AwJiJjVGiM49SBGSZ9C-8vQoouoavtOpH~46KO4zgFVN36WAzljs3dJ1VMSrFBdbmJjoVQYOY4dYaURp6vT9SvMftxZPbJbTh5eUbNBh9hHtKp5YRX7ZFf-rU~SiYhl2YjDeA__" />
						<div className="title">
							<div className="article-title">
								<span>Let's Get Solution For Building Construction Work</span>
							</div>
							<div className="date">16 December, 2022</div>
						</div>
					</Box>
					<Box className={'card'}>
						<img src="https://s3-alpha-sig.figma.com/img/f4b2/a97e/4c4f8f5e4759944aaba98a3c6dd3e663?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J3lK7R7OBd3vEEGob8cACKMDUCzH4K7fRZFrlYqJCKO~9Z~zNHD4JEq5FQg-XM3mukLZ8MQTaPT-Zz6cmh9XbuVl6k1UfUa1EtSQebhO~N7GFVUfBXNuJISFO6aPQKrPhMbnfhjOD7z3peUbk4hSmNdws44FngRitZ9t~7ADY1yOOfsGHGJw3uHX1Dcczho6LBvXXu5o25kqXTIv~AwJiJjVGiM49SBGSZ9C-8vQoouoavtOpH~46KO4zgFVN36WAzljs3dJ1VMSrFBdbmJjoVQYOY4dYaURp6vT9SvMftxZPbJbTh5eUbNBh9hHtKp5YRX7ZFf-rU~SiYhl2YjDeA__" />
						<div className="title">
							<div className="article-title">
								<span>Let's Get Solution For Building Construction Work</span>
							</div>
							<div className="date">16 December, 2022</div>
						</div>
					</Box>
					<Box className={'card'}>
						<img src="https://s3-alpha-sig.figma.com/img/f4b2/a97e/4c4f8f5e4759944aaba98a3c6dd3e663?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J3lK7R7OBd3vEEGob8cACKMDUCzH4K7fRZFrlYqJCKO~9Z~zNHD4JEq5FQg-XM3mukLZ8MQTaPT-Zz6cmh9XbuVl6k1UfUa1EtSQebhO~N7GFVUfBXNuJISFO6aPQKrPhMbnfhjOD7z3peUbk4hSmNdws44FngRitZ9t~7ADY1yOOfsGHGJw3uHX1Dcczho6LBvXXu5o25kqXTIv~AwJiJjVGiM49SBGSZ9C-8vQoouoavtOpH~46KO4zgFVN36WAzljs3dJ1VMSrFBdbmJjoVQYOY4dYaURp6vT9SvMftxZPbJbTh5eUbNBh9hHtKp5YRX7ZFf-rU~SiYhl2YjDeA__" />
						<div className="title">
							<div className="article-title">
								<span>Let's Get Solution For Building Construction Work</span>
							</div>
							<div className="date">16 December, 2022</div>
						</div>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default CommunityBoards;
