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
					bgImage =
						'https://s3-alpha-sig.figma.com/img/bf4a/5e25/1e645d3842e11a41778fdbf2ac618eb7?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J4VaCTuA~3TRbMoNM87Ds9Fi~ahSfsJwdgkz8MOMx4nzQabJ-3uaB9gsZtPe5Jyoicn9NU0I2VtywVyek6I7Rtdwv7fQdeKPRNVx3ww6AKZyDzQy4fF~To9DH328hLkhQNkJg-8hX5cc-jLrvbV7Z1xe5NTG7qLwtBZuBf2o~-bflNGIeN9id19oBL0YlO6dxst-RBYWtXw08SDfxTr1ZxhIT0Ud2JiP1QD3HY-2kRkQgYJEHYwWcraY0H5XondmVlKywxS~442wwfdZBPjCJkL02vspukaUUMQPNQ~LQ5~-wTlGkwO58m2ku13x-Stt0ahM7WML8jN37Jivjclk6g__';
					break;
				case '/agent':
					title = 'Designers';
					desc = 'Home / Agents';
					bgImage =
						'https://s3-alpha-sig.figma.com/img/9133/29df/166bccba71d1efe08b16c0bd47f9a98f?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qRdKGq~UrEIk6xbiGDXH8CwytI5Y6P1Z2q8F~fu7R7~4BVFQi1QT1x-jAUkFDuW9H10CJkAikO~jgEyoZXjXvHl~jzS9SKuaJwB0YxBGK0dGdmRASk6nbj1UeI~X58Q-rrQBTM2-9S1c~DTcUVQr5-NNPS9sLDxltfLYnCLTH0Tzcv8BdizZfxaSaZSHhmRSrLSv1xc1ESX~iEkAf9ordxyr0EGBN37A4MjteYBXEwhJWYn-MIgbraEbE7v0SaM6o2kazIVBgi6pMcmWkWvv1Gbfld-l6vTkDOxmAiHIQyIOtHO9wZHSssMKEax85iSgUsgbBsGcvj5ZPYeDbVwFHw__';
					break;
				case '/agent/detail':
					title = 'Agent Page';
					desc = 'Home / For Blog';
					bgImage =
						'https://s3-alpha-sig.figma.com/img/8d84/c0a6/90afce983e419dc7455c9a0c9aba64f4?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BQUsjOJr6GhY-XqseIW9PS8UKfL9GKwNwoMBhCzar4nwNJrNRdfL60UFxlsCVbBrh0IwKtZ0iKqRe6BMXXTRwYxsx5B9j2dC8AafUDNH0tshhWxaP3lxHj8Ob~YU5UgG5Gfa7ehUV5wymvbY~McPup-ml-X5fBCNlQDF3HxUEDHPUBkpUraBTCyvqV5rMI4p8iIWnX3DtlOJukRuiyyj5MdTQ3922Y-tiXUh~lHqs38toeEWLs9hr32ycyyhCgg6tzcG8X98aV18-faYwl0pj~HBQDn-ltwdDehqGovss7u2K3uk9ubjwU75kASfUdjTe3EuvsYRR2TlA3AQbSfMag__';
					break;
				case '/mypage':
					title = 'my page';
					desc = 'Home / For Rent';
					bgImage = '/img/banner/header1.svg';
					break;
				case '/community':
					title = 'Community';
					desc = 'Home / Blog';
					bgImage =
						'https://s3-alpha-sig.figma.com/img/8d84/c0a6/90afce983e419dc7455c9a0c9aba64f4?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BQUsjOJr6GhY-XqseIW9PS8UKfL9GKwNwoMBhCzar4nwNJrNRdfL60UFxlsCVbBrh0IwKtZ0iKqRe6BMXXTRwYxsx5B9j2dC8AafUDNH0tshhWxaP3lxHj8Ob~YU5UgG5Gfa7ehUV5wymvbY~McPup-ml-X5fBCNlQDF3HxUEDHPUBkpUraBTCyvqV5rMI4p8iIWnX3DtlOJukRuiyyj5MdTQ3922Y-tiXUh~lHqs38toeEWLs9hr32ycyyhCgg6tzcG8X98aV18-faYwl0pj~HBQDn-ltwdDehqGovss7u2K3uk9ubjwU75kASfUdjTe3EuvsYRR2TlA3AQbSfMag__';
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
