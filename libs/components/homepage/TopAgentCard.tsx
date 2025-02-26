import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Member } from '../../types/member/member';

interface TopAgentProps {
	agent: Member;
}
const TopAgentCard = () => {
	// const { agent } = props;
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
						<img
							src="https://s3-alpha-sig.figma.com/img/e8bb/addf/8e32966a3167fe0e24adec222457809d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=haZpKbUqMnzqZp-5mkJlisUShaB6yzUKd1POUNXvAq4jYlqtU5quo1Jk2d7njWol80Wqqcg~OEfos44qVvIv199Do9knqCxKAjcUqlJ5MKnxFuhv8duJVxjdDSjtmCByVMCeTqoBkhhueez8LoG99agEn7l~aJDkgFFsjerZCVXTRbbvitTQJnEdK0AHdVrZLq9IR~VpDC2E7CzhkQEBam99GRPGDePgIMOqDn6HwYCcunmj-koo6fj4uaMjDpdLmR4enDJZJhXbcxCIpBztGAZ5GTHnEXtKypaREdIolaPIAeM9RIhBtTwnMs3kn7Vl98tgkMdd4lN0qveCJH08Jw__"
							alt="user"
						/>
						<div className="person-info">
							<span className="person-name">Natasha Mith</span>
							<span className="person-address">Sydney, Australia</span>
						</div>
					</Stack>
					<Stack className={'text'}>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu mi lectus. Suspendisse potenti.
							Aliquam at bibendum magna
						</span>
					</Stack>
				</Stack>
				<Stack className={'comment-card'}>
					<Stack className={'person'}>
						<img
							src="https://s3-alpha-sig.figma.com/img/e8bb/addf/8e32966a3167fe0e24adec222457809d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=haZpKbUqMnzqZp-5mkJlisUShaB6yzUKd1POUNXvAq4jYlqtU5quo1Jk2d7njWol80Wqqcg~OEfos44qVvIv199Do9knqCxKAjcUqlJ5MKnxFuhv8duJVxjdDSjtmCByVMCeTqoBkhhueez8LoG99agEn7l~aJDkgFFsjerZCVXTRbbvitTQJnEdK0AHdVrZLq9IR~VpDC2E7CzhkQEBam99GRPGDePgIMOqDn6HwYCcunmj-koo6fj4uaMjDpdLmR4enDJZJhXbcxCIpBztGAZ5GTHnEXtKypaREdIolaPIAeM9RIhBtTwnMs3kn7Vl98tgkMdd4lN0qveCJH08Jw__"
							alt="user"
						/>
						<div className="person-info">
							<span className="person-name">Natasha Mith</span>
							<span className="person-address">Sydney, Australia</span>
						</div>
					</Stack>
					<Stack className={'text'}>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu mi lectus. Suspendisse potenti.
							Aliquam at bibendum magna
						</span>
					</Stack>
				</Stack>
				<Stack className={'comment-card'}>
					<Stack className={'person'}>
						<img
							src="https://s3-alpha-sig.figma.com/img/e8bb/addf/8e32966a3167fe0e24adec222457809d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=haZpKbUqMnzqZp-5mkJlisUShaB6yzUKd1POUNXvAq4jYlqtU5quo1Jk2d7njWol80Wqqcg~OEfos44qVvIv199Do9knqCxKAjcUqlJ5MKnxFuhv8duJVxjdDSjtmCByVMCeTqoBkhhueez8LoG99agEn7l~aJDkgFFsjerZCVXTRbbvitTQJnEdK0AHdVrZLq9IR~VpDC2E7CzhkQEBam99GRPGDePgIMOqDn6HwYCcunmj-koo6fj4uaMjDpdLmR4enDJZJhXbcxCIpBztGAZ5GTHnEXtKypaREdIolaPIAeM9RIhBtTwnMs3kn7Vl98tgkMdd4lN0qveCJH08Jw__"
							alt="user"
						/>
						<div className="person-info">
							<span className="person-name">Natasha Mith</span>
							<span className="person-address">Sydney, Australia</span>
						</div>
					</Stack>
					<Stack className={'text'}>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu mi lectus. Suspendisse potenti.
							Aliquam at bibendum magna
						</span>
					</Stack>
				</Stack>
				<Stack className={'comment-card'}>
					<Stack className={'person'}>
						<img
							src="https://s3-alpha-sig.figma.com/img/e8bb/addf/8e32966a3167fe0e24adec222457809d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=haZpKbUqMnzqZp-5mkJlisUShaB6yzUKd1POUNXvAq4jYlqtU5quo1Jk2d7njWol80Wqqcg~OEfos44qVvIv199Do9knqCxKAjcUqlJ5MKnxFuhv8duJVxjdDSjtmCByVMCeTqoBkhhueez8LoG99agEn7l~aJDkgFFsjerZCVXTRbbvitTQJnEdK0AHdVrZLq9IR~VpDC2E7CzhkQEBam99GRPGDePgIMOqDn6HwYCcunmj-koo6fj4uaMjDpdLmR4enDJZJhXbcxCIpBztGAZ5GTHnEXtKypaREdIolaPIAeM9RIhBtTwnMs3kn7Vl98tgkMdd4lN0qveCJH08Jw__"
							alt="user"
						/>
						<div className="person-info">
							<span className="person-name">Natasha Mith</span>
							<span className="person-address">Sydney, Australia</span>
						</div>
					</Stack>
					<Stack className={'text'}>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu mi lectus. Suspendisse potenti.
							Aliquam at bibendum magna
						</span>
					</Stack>
				</Stack>
			</>
		);
	}
};

export default TopAgentCard;
