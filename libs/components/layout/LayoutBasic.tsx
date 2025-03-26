import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'next-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const { t, i18n } = useTranslation('common');
		const device = useDeviceDetect();
		const [authHeader, setAuthHeader] = useState<boolean>(false);
		const user = useReactiveVar(userVar);

		const memoizedValues = useMemo(() => {
			let title = '',
				desc = '',
				bgImage = '';

			switch (router.pathname) {
				case '/product':
					title = 'Product Search';
					desc = 'We are glad to see you again!';
					bgImage = '/img/page_product.png';
					break;
				case '/agent':
					title = 'Designers';
					desc = 'Home / Agents';
					bgImage = '/img/page_my.png';
					break;
				case '/agent/detail':
					title = 'Agent Page';
					desc = 'Home / ';
					bgImage =
						'https://s3-alpha-sig.figma.com/img/8d84/c0a6/90afce983e419dc7455c9a0c9aba64f4?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BQUsjOJr6GhY-XqseIW9PS8UKfL9GKwNwoMBhCzar4nwNJrNRdfL60UFxlsCVbBrh0IwKtZ0iKqRe6BMXXTRwYxsx5B9j2dC8AafUDNH0tshhWxaP3lxHj8Ob~YU5UgG5Gfa7ehUV5wymvbY~McPup-ml-X5fBCNlQDF3HxUEDHPUBkpUraBTCyvqV5rMI4p8iIWnX3DtlOJukRuiyyj5MdTQ3922Y-tiXUh~lHqs38toeEWLs9hr32ycyyhCgg6tzcG8X98aV18-faYwl0pj~HBQDn-ltwdDehqGovss7u2K3uk9ubjwU75kASfUdjTe3EuvsYRR2TlA3AQbSfMag__';
					break;
				case '/mypage':
					title = 'my page';
					desc = 'Home / Member';
					bgImage = '/img/page_agent.png';
					break;
				case '/community':
					title = 'Community';
					desc = 'Home / Blog';
					bgImage = '/img/page_community.png';
					break;
				case '/community/detail':
					title = 'Community Detail';
					desc = 'Home / For Rent';
					bgImage = '/img/banner/header2.svg';
					break;
				case '/cs':
					title = 'CS';
					desc = 'We are glad to see you again!';
					bgImage = '/img/banner/header2.svg';
					break;
				case '/account/join':
					title = 'Login/Signup';
					desc = 'Authentication Process';
					bgImage = '/img/banner/header2.svg';
					setAuthHeader(true);
					break;
				case '/member':
					title = 'Member Page';
					desc = 'Home / For Rent';
					bgImage = '/img/banner/header1.svg';
					break;
				default:
					break;
			}

			return { title, desc, bgImage };
		}, [router.pathname]);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>Interno</title>
						<meta name={'title'} content={`Interno`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>Interno</title>
						<meta name={'title'} content={`Interno`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack
							className={`header-basic ${authHeader && 'auth'}`}
							style={{
								backgroundImage: `url(${memoizedValues.bgImage})`,
								backgroundSize: 'cover',
								backgroundPosition: '80% 45%',
							}}
						>
							<Stack className={'container'}>
								<strong>{t(memoizedValues.title)}</strong>
								<span>{t(memoizedValues.desc)}</span>
							</Stack>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Chat />

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutBasic;
