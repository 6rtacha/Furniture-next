import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Member } from '../../types/member/member';
import { BoardArticle } from '../../types/board-article/board-article';
import dynamic from 'next/dynamic';
const ToastViewerComponent = dynamic(() => import('../community/TViewer'), { ssr: false });
import { GlobalStyles } from '@mui/material';

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
						<ToastViewerComponent
							markdown={article?.articleContent}
							sx={{
								'.toastui-editor-contents': {
									margin: 0,
									padding: 0,
									height: '40px',
									lineHeight: 'normal',
								},
								'.toastui-editor-contents > *:first-child': {
									marginTop: '0 !important',
									paddingTop: '0 !important',
								},
								'.toastui-editor-contents p': {
									margin: 0,
									padding: 0,
									fontSize: '20px',
									lineHeight: '30px',
									fontWeight: 400,
									letterSpacing: '1%',
								},
								'.toastui-editor-contents *': {
									marginTop: '0 !important',
									paddingTop: '0 !important',
								},
							}}
						/>
					</Stack>
				</Stack>{' '}
			</>
		);
	}
};

export default PeopleOpinionCard;
