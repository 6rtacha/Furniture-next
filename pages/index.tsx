import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import PopularProperties from '../libs/components/homepage/PopularProducts';
import TopAgents from '../libs/components/homepage/PeopleOpinion';
import Events from '../libs/components/homepage/Events';
import TrendProperties from '../libs/components/homepage/TrendProducts';
import TopProperties from '../libs/components/homepage/TopProperties';
import { Stack } from '@mui/material';
import Advertisement from '../libs/components/homepage/Advertisement';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PeopleOpinion from '../libs/components/homepage/PeopleOpinion';
import PopularProducts from '../libs/components/homepage/PopularProducts';
import TrendProducts from '../libs/components/homepage/TrendProducts';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'home-page'}>
				<TrendProducts />
				<PopularProducts />
				<Advertisement />
				<TopProperties />
				<TopAgents />
			</Stack>
		);
	} else {
		return (
			<Stack className={'home-page'}>
				<Advertisement />
				<PopularProducts />
				<TrendProducts />
				{/* <TopProperties /> */}
				<PeopleOpinion />
				<Events />
				<CommunityBoards />
			</Stack>
		);
	}
};

export default withLayoutMain(Home);
