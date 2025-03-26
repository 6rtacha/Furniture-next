import React from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box } from '@mui/material';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';
import { useRouter } from 'next/router';

interface CommunityCardProps {
	article: BoardArticle;
	index: number;
}

const CommunityCard = (props: CommunityCardProps) => {
	const { article, index } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const articleImage = article?.articleImage
		? `${process.env.REACT_APP_API_URL}/${article?.articleImage}`
		: '/img/event.svg';

	const pushDetailHandler = async (articleId: string) => {
		console.log('articleId:', articleId);
		await router.push({ pathname: '/community/detail', query: { id: articleId } });
	};

	if (device === 'mobile') {
		return <div>COMMUNITY CARD (MOBILE)</div>;
	} else {
		return (
			<Box className={'card'} onClick={() => pushDetailHandler(article._id)}>
				<img src={articleImage} />
				<div className="title">
					<div className="article-title">
						<span>{article?.articleTitle}</span>
						<span id="author">by {article?.memberData?.memberNick}</span>
					</div>
					<div className="title-date">
						<Moment format="DD MMMM, YYYY" className="date">
							{article?.createdAt}
						</Moment>
						<img src="/img/icons/goArticleDetail.png" alt="" />
					</div>
				</div>
			</Box>
		);
	}
};

export default CommunityCard;
