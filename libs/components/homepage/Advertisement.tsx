import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Button, Stack } from '@mui/material';

const Advertisement = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return (
			<Stack className={'video-frame'}>
				{/* <video
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				>
					<source src="/video/ads.mov" type="video/mp4" />
				</video> */}
			</Stack>
		);
	} else {
		return (
			<Stack className={'advertisement-frame'}>
				<Stack className={'ads-info'}>
					<div className="head-line">
						<span>We Create The Art Of Stylish Living Stylishly</span>
					</div>
					<div className="desc">
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eleifend tellus justo, a maximus elit
							ornare at. In tempor nisi eget ex bibendum, vel tincidunt neque volutpat.Nulla condimentum condimentum
							nulla, eget aliquet odio vulputate eleifend
						</span>
					</div>
					<Button className={'btn'}>
						Follow Our Designers
						<img src="/img/icons/VectorRight.png" />
					</Button>
				</Stack>
				<Stack className={'image'}>
					<img src="/img/ads/AdsImage.png" alt="" />
				</Stack>
			</Stack>
		);
	}
};

export default Advertisement;
