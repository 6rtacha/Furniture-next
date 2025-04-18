import { Stack } from '@mui/material';
import { Product } from '../../types/product/product';
import { REACT_APP_API_URL } from '../../config';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';
import AgentBlogCard from './AgentBlogCard';
import { useEffect, useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { T } from '../../types/common';

interface AgentBlogsProps {
	searchFilter: any;
}

const AgentBlogs = (props: AgentBlogsProps) => {
	const { searchFilter } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [agentBlogs, setAgentBlogs] = useState<BoardArticle[]>([]);
	const [agentId, setAgentId] = useState<string>('');
	const [totalCount, setTotalCount] = useState<number>(0);

	/** APOLLO REQUESTS **/
	const {
		loading: getBoardArticlesLoading,
		data: getBoardArticlesData,
		error: getBoardArticlesError,
		refetch: getBoardArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		// skip: !searchCommunity.search.memberId,
		variables: {
			input: searchFilter,
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

export default AgentBlogs;
