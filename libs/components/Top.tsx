import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Stack, Box, Drawer } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { CaretDown } from 'phosphor-react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';
import { cartDataVar, socketVar, userVar } from '../../apollo/store';
import { Logout } from '@mui/icons-material';
import { REACT_APP_API_URL } from '../config';
import Notifications from './Notification';
import { sweetConfirmAlert } from '../sweetAlert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cartAnimationVar } from '../../apollo/store';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(2); }
`;

const Top = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const socket = useReactiveVar(socketVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);
	const cartData = useReactiveVar(cartDataVar);
	const hasCartData = cartData.length > 0;
	const isCartAnimating = useReactiveVar(cartAnimationVar);
	const cartBounce = useReactiveVar(cartAnimationVar);
	const popClass = cartBounce ? 'cart-pop' : '';

	/** LIFECYCLES **/

	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/product/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	useEffect(() => {
		const changeNavbarColor = () => {
			if (window.scrollY >= 50) {
				setColorChange(true);
			} else {
				setColorChange(false);
			}
		};

		window.addEventListener('scroll', changeNavbarColor);
		return () => window.removeEventListener('scroll', changeNavbarColor);
	}, []);

	/** HANDLERS **/
	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: any) => {
			setLang(e.target.id);
			localStorage.setItem('locale', e.target.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.target.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const logoutHandler = async () => {
		try {
			if (await sweetConfirmAlert('Do you want to logout?')) {
				logOut();
				window.location.href = '/';
			}
		} catch (err: any) {
			console.log('ERROR, logoutHandler:', err.message);
		}
	};

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

	if (device == 'mobile') {
		return (
			<Stack className={'navbar'}>
				<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
					<Stack
						className={'container'}
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						sx={{ height: '64px', px: 2 }}
					>
						{/* Hamburger Menu (Three Lines) */}
						<Button onClick={() => setDrawerOpen(true)} sx={{ minWidth: '40px', padding: 0 }}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									width: '24px',
									height: '18px',
								}}
							>
								<Box sx={{ height: '3px', backgroundColor: '#000', borderRadius: '2px' }} />
								<Box sx={{ height: '3px', backgroundColor: '#000', borderRadius: '2px' }} />
								<Box sx={{ height: '3px', backgroundColor: '#000', borderRadius: '2px' }} />
							</Box>
						</Button>

						{/* Logo in Center */}
						<Box className="logo-box" sx={{ textAlign: 'center' }}>
							<Link href="/">
								<div className="logo">
									<img src="/img/logo/Logo.png" alt="logo" />
									Interno
								</div>
							</Link>
						</Box>

						{/* user-box on right */}
						<Box
							className="user-box"
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-end',
								gap: 1.2,
								minWidth: 'fit-content',
							}}
						>
							{/* Profile or Login Icon */}
							{user?._id ? (
								<>
									<Box
										className="login-user"
										onClick={(event: any) => setLogoutAnchor(event.currentTarget)}
										sx={{
											width: 32,
											height: 32,
											borderRadius: '50%',
											overflow: 'hidden',
											cursor: 'pointer',
										}}
									>
										<img
											src={
												user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
											}
											alt="user"
											style={{ width: '100%', height: '100%', objectFit: 'cover' }}
										/>
									</Box>
									<Menu id="basic-menu" anchorEl={logoutAnchor} open={logoutOpen} onClose={() => setLogoutAnchor(null)}>
										<MenuItem onClick={logoutHandler}>
											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
											Logout
										</MenuItem>
									</Menu>
								</>
							) : (
								<Link href="/account/join">
									<Box
										className="join-box"
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											width: 32,
											height: 32,
											borderRadius: '50%',
											backgroundColor: '#f0f0f0',
											cursor: 'pointer',
										}}
									>
										<AccountCircleOutlinedIcon fontSize="small" />
									</Box>
								</Link>
							)}

							<Notifications />

							<Button
								disableRipple
								className="btn-lang"
								onClick={langClick}
								endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
								sx={{
									minWidth: 0,
									padding: 0,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Box
									className="flag"
									sx={{
										width: 24,
										height: 18,
										overflow: 'hidden',
										borderRadius: '2px',
										display: 'flex',
									}}
								>
									<img src={`/img/flag/lang${lang || 'en'}.png`} alt="lang" style={{ width: '100%', height: 'auto' }} />
								</Box>
							</Button>

							{/* Lang dropdown menu */}
							<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose}>
								<MenuItem disableRipple onClick={langChoice} id="en">
									<img className="img-flag" src="/img/flag/langen.png" alt="en" /> {t('English')}
								</MenuItem>
								<MenuItem disableRipple onClick={langChoice} id="kr">
									<img className="img-flag" src="/img/flag/langkr.png" alt="kr" /> {t('Korean')}
								</MenuItem>
							</StyledMenu>
						</Box>
					</Stack>
				</Stack>

				{/* Mobile Drawer only for router links */}
				<Drawer
					anchor="left"
					open={drawerOpen}
					onClose={() => setDrawerOpen(false)}
					PaperProps={{ sx: { width: 260, padding: 2 } }}
				>
					<Box className="router-box" display="flex" flexDirection="column" gap={2}>
						<Link href="/">
							<div>{t('Home')}</div>
						</Link>
						<Link href="/product">
							<div>{t('Products')}</div>
						</Link>
						<Link href="/basket">
							<div className={hasCartData ? 'highlight-shop' : ''}>{t('Shop')}</div>
						</Link>
						<Link href="/store">
							<div>{t('Stores')}</div>
						</Link>
						<Link href="/community?articleCategory=NEWS">
							<div>{t('Community')}</div>
						</Link>
						{user?._id && (
							<Link href="/mypage">
								<div>{t('My Page')}</div>
							</Link>
						)}
						<Link href="/cs">
							<div>{t('CS')}</div>
						</Link>
					</Box>
				</Drawer>
			</Stack>
		);
	} else {
		return (
			<Stack className={'navbar'}>
				<Stack className={`navbar-main ${colorChange ? 'scrolled' : ''}`}>
					<Stack className={'container'}>
						<Box component={'div'} className={'logo-box'}>
							<Link href={'/'}>
								<div className="logo">
									<img src="/img/logo/Logo.png" alt="" />
									Interno
								</div>
							</Link>
						</Box>
						<Box component={'div'} className={'router-box'}>
							<Link href={'/'}>
								<div>{t('Home')}</div>
							</Link>
							<Link href={'/product'}>
								<div>{t('Products')}</div>
							</Link>

							<Link href={'/store'}>
								<div> {t('Stores')} </div>
							</Link>
							<Link href={'/community?articleCategory=NEWS'}>
								<div> {t('Community')} </div>
							</Link>
							{user?._id && (
								<Link href={'/mypage'}>
									<div> {t('My Page')} </div>
								</Link>
							)}
							<Link href={'/cs'}>
								<div> {t('CS')} </div>
							</Link>
						</Box>
						<Box component={'div'} className={'user-box'}>
							{user?._id ? (
								<>
									<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
										<img
											src={
												user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
											}
											alt=""
										/>
									</div>

									<Menu
										id="basic-menu"
										anchorEl={logoutAnchor}
										open={logoutOpen}
										onClose={() => {
											setLogoutAnchor(null);
										}}
										sx={{ mt: '5px' }}
									>
										<MenuItem onClick={logoutHandler}>
											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
											Logout
										</MenuItem>
									</Menu>
								</>
							) : (
								<Link href={'/account/join'}>
									<div className={'join-box'}>
										<AccountCircleOutlinedIcon />
										<span>
											{t('Login')} / {t('Register')}
										</span>
									</div>
								</Link>
							)}

							<div className={'lan-box'}>
								<Link href="/basket">
									<div className={`cart-badge ${popClass}`} style={{ position: 'relative' }}>
										<ShoppingCartIcon sx={{ color: '#cda274', fontSize: 28 }} />
										{cartData.length > 0 && (
											<span className="cart-count">{cartData.reduce((acc, item) => acc + item.quantity, 0)}</span>
										)}
									</div>
								</Link>

								{/* {user?._id && <NotificationsOutlinedIcon className={'notification-icon'} />} */}
								<Notifications />

								<Button
									disableRipple
									className="btn-lang"
									onClick={langClick}
									endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
								>
									<Box component={'div'} className={'flag'}>
										{lang !== null ? (
											<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
										) : (
											<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
										)}
									</Box>
								</Button>

								<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
									<MenuItem disableRipple onClick={langChoice} id="en">
										<img
											className="img-flag"
											src={'/img/flag/langen.png'}
											onClick={langChoice}
											id="en"
											alt={'usaFlag'}
										/>
										{t('English')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="kr">
										<img
											className="img-flag"
											src={'/img/flag/langkr.png'}
											onClick={langChoice}
											id="kr"
											alt={'koreanFlag'}
										/>
										{t('Korean')}
									</MenuItem>
									{/* <MenuItem disableRipple onClick={langChoice} id="ru">
										<img
											className="img-flag"
											src={'/img/flag/langru.png'}
											onClick={langChoice}
											id="ru"
											alt={'russiaFlag'}
										/>
										{t('Russian')}
									</MenuItem> */}
								</StyledMenu>
							</div>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withRouter(Top);
