import { Stack } from '@mui/material';
import { Product } from '../../types/product/product';
import { REACT_APP_API_URL } from '../../config';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';

import { useEffect, useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import AgentBlogCard from '../agent/AgentBlogCard';
import { userVar } from '../../../apollo/store';
import { Search } from '@mui/icons-material';

const MyArticles = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [articleFilter, setArticleFilter] = useState({ ...initialInput, search: { memberId: user._id } });
	const [agentBlogs, setAgentBlogs] = useState<BoardArticle[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);

	/** APOLLO REQUESTS **/
	const {
		loading: getBoardArticlesLoading,
		data: getBoardArticlesData,
		error: getBoardArticlesError,
		refetch: getBoardArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		skip: !user._id,
		variables: {
			input: articleFilter,
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentBlogs(data?.getBoardArticles?.list);
			setTotalCount(data?.getBoardArticles?.metaCounter[0]?.total);
		},
	});

	return (
		<>
			{agentBlogs.map((agentBlog: BoardArticle) => {
				return <AgentBlogCard agentBlog={agentBlog} />;
			})}
		</>
	);
};

MyArticles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 20,
		sort: 'createdAt',
		search: {},
	},
};

export default MyArticles;
