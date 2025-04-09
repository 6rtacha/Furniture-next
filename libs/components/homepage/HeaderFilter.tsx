import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Modal, Divider, Button, OutlinedInput } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { propertySquare, propertyYears } from '../../config';
import { ProductLocation, ProductType } from '../../enums/product.enum';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { ProductsInquiry } from '../../types/product/product.input';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'auto',
	bgcolor: 'background.paper',
	borderRadius: '12px',
	outline: 'none',
	boxShadow: 24,
};

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

const thisYear = new Date().getFullYear();

interface HeaderFilterProps {
	initialInput: ProductsInquiry;
}

const HeaderFilter = (props: HeaderFilterProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(initialInput);
	const locationRef: any = useRef();
	const typeRef: any = useRef();
	const roomsRef: any = useRef();
	const router = useRouter();
	const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
	const [openLocation, setOpenLocation] = useState(false);
	const [openType, setOpenType] = useState(false);
	const [openRooms, setOpenRooms] = useState(false);
	const [productLocation, setProductLocation] = useState<ProductLocation[]>(Object.values(ProductLocation));
	const [productType, setProductType] = useState<ProductType[]>(Object.values(ProductType));
	const [yearCheck, setYearCheck] = useState({ start: 1970, end: thisYear });
	const [optionCheck, setOptionCheck] = useState('all');
	const [searchText, setSearchText] = useState<string>('');

	/** LIFECYCLES **/
	console.log('searchFilter', searchFilter);

	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			if (!locationRef?.current?.contains(event.target)) {
				setOpenLocation(false);
			}

			if (!typeRef?.current?.contains(event.target)) {
				setOpenType(false);
			}

			if (!roomsRef?.current?.contains(event.target)) {
				setOpenRooms(false);
			}
		};

		document.addEventListener('mousedown', clickHandler);

		return () => {
			document.removeEventListener('mousedown', clickHandler);
		};
	}, []);

	/** HANDLERS **/

	const pushSearchHandler = async () => {
		try {
			const updatedFilter = {
				...searchFilter,
				search: { ...searchFilter.search, text: searchText },
			};

			console.log('ssssssss', searchFilter);

			await router.push(
				`/product?input=${JSON.stringify(updatedFilter)}`,
				`/product?input=${JSON.stringify(searchFilter)}`,
			);
		} catch (err: any) {
			console.log('ERROR, pushSearchHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>HEADER FILTER MOBILE</div>;
	} else {
		return (
			<>
				<Stack className={'motto-box'}>
					<Box className={'motto'}>
						<div>Make Your Interior More Minimalistic & Modern</div>
					</Box>
					<Box className={'moto-desc'}>
						<div>Turn your romm with panto into a lot more minimalistic and modern with ease and speed</div>
					</Box>
				</Stack>
				<Stack className={'input-box'}>
					<OutlinedInput
						value={searchText}
						type={'text'}
						className={'search-input'}
						placeholder={'What are you looking for?'}
						onChange={(e: any) => setSearchText(e.target.value)}
						sx={{
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: 'none',
							},
							'&:hover > .MuiOutlinedInput-notchedOutline': {
								borderColor: 'none',
							},
						}}
						onKeyDown={(event: any) => {
							if (event.key == 'Enter') {
								pushSearchHandler();
							}
						}}
						endAdornment={
							<>
								<CancelRoundedIcon
									onClick={() => {
										setSearchText('');
										setSearchFilter({
											...searchFilter,
											search: { ...searchFilter.search, text: '' },
										});
									}}
								/>
							</>
						}
					/>
					<img src={'/img/icons/search_icon.png'} alt={''} />
				</Stack>
			</>
		);
	}
};

HeaderFilter.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {
			pricesRange: {
				start: 0,
				end: 2000000,
			},
		},
	},
};

export default HeaderFilter;
