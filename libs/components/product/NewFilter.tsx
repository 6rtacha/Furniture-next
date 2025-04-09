import { Button, Checkbox, IconButton, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { ProductsInquiry } from '../../types/product/product.input';
import { useCallback, useEffect, useState } from 'react';
import { ProductLocation, ProductMaterial, ProductType } from '../../enums/product.enum';
import { Product } from '../../types/product/product';
import { Color } from 'three';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name: string, personName: string[], theme: Theme) {
	return {
		fontWeight: personName.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
	};
}

interface FilterType {
	searchFilter: ProductsInquiry;
	setSearchFilter: any;
	initialInput: ProductsInquiry;
}

const NewFilter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [searchText, setSearchText] = useState<string>('');
	const [productLocation, setProductLocation] = useState<ProductLocation[]>(Object.values(ProductLocation));
	const [selectedLocations, setSelectedLocations] = useState<string[]>(searchFilter?.search?.locationList || []);
	const [selectedMaterials, setSelectedMaterials] = useState<string[]>(searchFilter?.search?.materialList || []);
	const [productMaterial, setProductMaterial] = useState<ProductMaterial[]>(Object.values(ProductMaterial));
	const [btnColor, setBtnColor] = useState('#fff');

	console.log('searchFilter', searchFilter);

	/** HANDLERS **/
	const handleLocationChange = useCallback(
		async (event: any) => {
			const value = event.target.value; // This returns an array for multiple selections
			setSelectedLocations(value);

			await router.push(
				`/product?input=${JSON.stringify({
					...searchFilter,
					search: { ...searchFilter.search, locationList: value },
				})}`,
				undefined,
				{ scroll: false },
			);
		},
		[searchFilter, router],
	);

	const handleMaterialChange = useCallback(
		async (event: any) => {
			const value = event.target.value; // This returns an array for multiple selections
			setSelectedMaterials(value);

			await router.push(
				`/product?input=${JSON.stringify({
					...searchFilter,
					search: { ...searchFilter.search, materialList: value },
				})}`,
				undefined,
				{ scroll: false },
			);
		},
		[searchFilter, router],
	);

	const productPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const productTypeSelectHandler = useCallback(
		async (productType: ProductType) => {
			try {
				if (productType) {
					if (searchFilter?.search?.typeList?.includes(productType)) {
						await router.push(
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									typeList: searchFilter?.search?.typeList?.filter((item: ProductType) => item !== productType),
								},
							})}`,
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									typeList: searchFilter?.search?.typeList?.filter((item: ProductType) => item !== productType),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), productType] },
							})}`,
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), productType] },
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.typeList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					);
				}
				// btnColor === '#fff' ? setBtnColor('#cda274') : setBtnColor('#fff');
				console.log('productTypeSelectHandler:', productType);
			} catch (err: any) {
				console.log('ERROR, productTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/product?input=${JSON.stringify(initialInput)}`,
				`/product?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	return (
		<Stack className={'main-filter'}>
			<Stack className={'search-product'}>
				<div>
					<FormControl sx={{ width: 300, mt: '3px' }}>
						<InputLabel id="product-location-label">Location</InputLabel>
						<Select
							sx={{ borderRadius: '10px' }}
							labelId="product-location-label"
							id="product-location"
							multiple
							value={selectedLocations}
							onChange={handleLocationChange}
							input={<OutlinedInput label="Location" />}
							renderValue={(selected) => selected.join(', ')}
						>
							{productLocation.map((location: string) => (
								<MenuItem key={location} value={location}>
									<Checkbox checked={selectedLocations.includes(location)} />
									<ListItemText primary={location} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div>
					<FormControl sx={{ width: 300, mt: '3px' }}>
						<InputLabel id="product-material-label">Material</InputLabel>
						<Select
							sx={{ borderRadius: '10px' }}
							labelId="product-material-label"
							id="product-material"
							multiple
							value={selectedMaterials}
							onChange={handleMaterialChange}
							input={<OutlinedInput label="Material" />}
							renderValue={(selected) => selected.join(', ')}
						>
							{productMaterial.map((material: string) => (
								<MenuItem key={material} value={material}>
									<Checkbox checked={selectedMaterials.includes(material)} />
									<ListItemText primary={material} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<Stack className={'price-range'}>
					{/* <Typography className={'title'}>Price Range</Typography> */}
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ from"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productPriceHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ to"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productPriceHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
				<OutlinedInput
					value={searchText}
					type={'text'}
					className={'input-search'}
					placeholder={'What are you looking for?'}
					onChange={(e: any) => setSearchText(e.target.value)}
					onKeyDown={(event: any) => {
						if (event.key == 'Enter') {
							setSearchFilter({
								...searchFilter,
								search: { ...searchFilter.search, text: searchText },
							});
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
				<Tooltip title="Reset">
					<IconButton onClick={refreshHandler}>
						<RefreshIcon />
					</IconButton>
				</Tooltip>
			</Stack>

			<Stack className={'product-type'}>
				<Button
					className={'btn'}
					sx={{
						backgroundColor: searchFilter?.search?.typeList?.includes(ProductType.SOFA) ? '#cda274' : 'none',
						color: searchFilter?.search?.typeList?.includes(ProductType.SOFA) ? '#fff !important' : '#292f36',
					}}
					onClick={() => productTypeSelectHandler(ProductType.SOFA)}
				>
					Sofa
				</Button>
				<Button
					className={'btn'}
					sx={{
						backgroundColor: searchFilter?.search?.typeList?.includes(ProductType.BED) ? '#cda274' : 'none',
						color: searchFilter?.search?.typeList?.includes(ProductType.BED) ? '#fff !important' : '#292f36',
					}}
					onClick={() => productTypeSelectHandler(ProductType.BED)}
				>
					<span>Bed</span>
				</Button>
				<Button
					className={'btn'}
					sx={{
						backgroundColor: searchFilter?.search?.typeList?.includes(ProductType.TABLE) ? '#cda274' : 'none',
						color: searchFilter?.search?.typeList?.includes(ProductType.TABLE) ? '#fff !important' : '#292f36',
					}}
					onClick={() => productTypeSelectHandler(ProductType.TABLE)}
				>
					<span>Table</span>
				</Button>
				<Button
					className={'btn'}
					sx={{
						backgroundColor: searchFilter?.search?.typeList?.includes(ProductType.CHAIR) ? '#cda274' : 'none',
						color: searchFilter?.search?.typeList?.includes(ProductType.CHAIR) ? '#fff !important' : '#292f36',
					}}
					onClick={() => productTypeSelectHandler(ProductType.CHAIR)}
				>
					<span>Chair</span>
				</Button>
				<Button
					className={'btn'}
					sx={{
						backgroundColor: searchFilter?.search?.typeList?.includes(ProductType.CABINET) ? '#cda274' : 'none',
						color: searchFilter?.search?.typeList?.includes(ProductType.CABINET) ? '#fff !important' : '#292f36',
					}}
					onClick={() => productTypeSelectHandler(ProductType.CABINET)}
				>
					<span>Cabinet</span>
				</Button>
				<Button
					className={'btn'}
					sx={{
						backgroundColor: searchFilter?.search?.typeList?.includes(ProductType.OUTDOOR) ? '#cda274' : 'none',
						color: searchFilter?.search?.typeList?.includes(ProductType.OUTDOOR) ? '#fff !important' : '#292f36',
					}}
					onClick={() => productTypeSelectHandler(ProductType.OUTDOOR)}
				>
					<span>Outdoor</span>
				</Button>
				<Button
					className={'btn'}
					sx={{
						backgroundColor: searchFilter?.search?.typeList?.includes(ProductType.LAMP) ? '#cda274' : 'none',
						color: searchFilter?.search?.typeList?.includes(ProductType.LAMP) ? '#fff !important' : '#292f36',
					}}
					onClick={() => productTypeSelectHandler(ProductType.LAMP)}
				>
					<span>Lamp</span>
				</Button>
			</Stack>
		</Stack>
	);
};

export default NewFilter;
