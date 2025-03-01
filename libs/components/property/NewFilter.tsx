import { Button, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

const names = [
	'Oliver Hansen',
	'Van Henry',
	'April Tucker',
	'Ralph Hubbard',
	'Omar Alexander',
	'Carlos Abbott',
	'Miriam Wagner',
	'Bradley Wilkerson',
	'Virginia Andrews',
	'Kelly Snyder',
];
const NewFilter = () => {
	const theme = useTheme();
	const [personName, setPersonName] = React.useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	return (
		<Stack className={'main-filter'}>
			<Stack className={'search-product'}>
				<div>
					<FormControl sx={{ width: 300 }} className={'location'}>
						<InputLabel id="demo-multiple-name-label">Location</InputLabel>
						<Select
							sx={{ borderRadius: '10px' }}
							labelId="demo-multiple-name-label"
							id="demo-multiple-name"
							multiple
							value={personName}
							onChange={handleChange}
							input={<OutlinedInput label="Name" />}
							MenuProps={MenuProps}
						>
							{names.map((name) => (
								<MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div>
					<FormControl sx={{ width: 300 }} className={'location'}>
						<InputLabel id="demo-multiple-name-label">Material</InputLabel>
						<Select
							sx={{ borderRadius: '10px' }}
							labelId="demo-multiple-name-label"
							id="demo-multiple-name"
							multiple
							value={personName}
							onChange={handleChange}
							input={<OutlinedInput label="Name" />}
							MenuProps={MenuProps}
						>
							{names.map((name) => (
								<MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
									{name}
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
							// value={searchFilter?.search?.pricesRange?.start ?? 0}
							// onChange={(e: any) => {
							// 	if (e.target.value >= 0) {
							// 		propertyPriceHandler(e.target.value, 'start');
							// 	}
							// }}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ to"
							// value={searchFilter?.search?.pricesRange?.end ?? 0}
							// onChange={(e: any) => {
							// 	if (e.target.value >= 0) {
							// 		propertyPriceHandler(e.target.value, 'end');
							// 	}
							// }}
						/>
					</Stack>
				</Stack>
				<OutlinedInput className="input-search" placeholder="Search ..."></OutlinedInput>
			</Stack>

			<Stack className={'product-type'}>
				<Button className={'btn'}>
					<span>Sofa</span>
				</Button>
				<Button className={'btn'}>
					<span>Bed</span>
				</Button>
				<Button className={'btn'}>
					<span>Table</span>
				</Button>
				<Button className={'btn'}>
					<span>Chair</span>
				</Button>
				<Button className={'btn'}>
					<span>Cabinet</span>
				</Button>
				<Button className={'btn'}>
					<span>Outdoor</span>
				</Button>
				<Button className={'btn'}>
					<span>Lamp</span>
				</Button>
			</Stack>
		</Stack>
	);
};

export default NewFilter;
