import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Member } from '../../types/member/member';
import { BoardArticle } from '../../types/board-article/board-article';

interface PeopleOpinionProps {
	article: BoardArticle;
}
const PeopleOpinionCard = (props: PeopleOpinionProps) => {
	const { article } = props;
	const device = useDeviceDetect();
	// const router = useRouter();
	// const agentImage = agent?.memberImage
	// 	? `${process.env.REACT_APP_API_URL}/${agent?.memberImage}`
	// 	: '/img/profile/defaultUser.svg';

	/** HANDLERS **/

	if (device === 'mobile') {
		return <></>;
	} else {
		return (
			<>
				<Stack className={'comment-card'}>
					<Stack className={'person'}>
						<img src={`${process.env.REACT_APP_API_URL}/${article?.memberData?.memberImage}`} alt="user" />
						<div className="person-info">
							<span className="person-name">{article?.memberData?.memberNick}</span>
							<span className="person-address">{article?.memberData?.memberAddress}</span>
						</div>
					</Stack>
					<Stack className={'text'}>
						<span>{article?.articleContent}</span>
					</Stack>
				</Stack>
			</>
		);
	}
};

export default PeopleOpinionCard;
