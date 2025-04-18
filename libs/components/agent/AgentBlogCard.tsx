import { Stack } from '@mui/material';
import { BoardArticle } from '../../types/board-article/board-article';
import { REACT_APP_API_URL } from '../../config';
import Moment from 'react-moment';

interface AgentBlogCardProps {
	agentBlog: BoardArticle;
}

const AgentBlogCard = (props: AgentBlogCardProps) => {
	const { agentBlog } = props;
	const imagePath: string = agentBlog?.articleImage
		? `${REACT_APP_API_URL}/${agentBlog?.articleImage}`
		: '/img/community/communityImg.png';
	return (
		<Stack className={'pb-card'}>
			<img src={imagePath} alt="" />
			<Stack className={'card-info'}>
				<Stack className={'pb-name'}>
					<div className="name">{agentBlog?.articleTitle}</div>
					<div className="name">{agentBlog?.articleStatus}</div>
				</Stack>
				<Stack className={'status'}>
					<span>{agentBlog?.articleCategory}</span>
					<Moment format="DD MMMM, YYYY">{agentBlog?.createdAt}</Moment>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AgentBlogCard;
