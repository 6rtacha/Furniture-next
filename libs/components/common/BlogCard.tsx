import { Box, Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';
import { BoardArticle } from '../../types/board-article/board-article';
import Moment from 'react-moment';

interface BlogCardProps {
	boardArticle: BoardArticle;
	size?: string;
	likeArticleHandler: any;
}

const BlogCard = (props: BlogCardProps) => {
	const { boardArticle, size = 'normal', likeArticleHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const imagePath: string = boardArticle?.articleImage
		? `${REACT_APP_API_URL}/${boardArticle?.articleImage}`
		: '/img/community/communityImg.png';

	/** HANDLERS **/
	const chooseArticleHandler = (e: React.SyntheticEvent, boardArticle: BoardArticle) => {
		router.push(
			{
				pathname: '/community/detail',
				query: { articleCategory: boardArticle?.articleCategory, id: boardArticle?._id },
			},
			undefined,
			{ shallow: true },
		);
	};

	const goMemberPage = (id: string) => {
		if (id === user?._id) router.push('/mypage');
		else router.push(`/member?memberId=${id}`);
	};

	return (
		<Box className={'card'} onClick={(e: any) => chooseArticleHandler(e, boardArticle)}>
			<img src={imagePath} alt="" className="card-img" />
			<div className="title">
				<div className="article-title">
					<span>{boardArticle?.articleTitle}</span>
				</div>
				<Moment className="date" format={'MMMM'}>
					{boardArticle?.createdAt}
				</Moment>
			</div>
		</Box>
	);
};

export default BlogCard;
