// libs/components/basket/Basket.tsx
import React from 'react';
import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	IconButton,
	Avatar,
	Button,
	Divider,
	Snackbar,
	Alert,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { CartItem } from '../../types/order/basket-item';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../../../apollo/user/mutation';
import { REACT_APP_API_URL } from '../../config';
import CreatedOrders from './Orders';
import Orders from './Orders';
import { useRouter } from 'next/router';

interface BasketProps {
	cartItems: CartItem[];
	onAdd: (item: CartItem) => void;
	onRemove: (item: CartItem) => void;
	onDelete: (item: CartItem) => void;
	onDeleteAll: () => void;
}

const Basket: React.FC<BasketProps> = ({ cartItems, onAdd, onRemove, onDelete, onDeleteAll }) => {
	const [createOrder] = useMutation(CREATE_ORDER);
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [errorSnackbar, setErrorSnackbar] = React.useState(false);
	const router = useRouter();

	const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	const handleCheckout = async () => {
		try {
			const orderItems = cartItems.map((item) => ({
				itemQuantity: item.quantity,
				itemPrice: item.price,
				productId: item._id,
			}));

			await createOrder({
				variables: {
					input: orderItems,
				},
			});

			// Clear cart
			onDeleteAll();
			setOpenSnackbar(true);
			await router.push(
				{
					pathname: '/basket',
					query: { tab: 'order' },
				},
				undefined,
				{ scroll: false },
			);
		} catch (err) {
			console.error('Order error:', err);
			setErrorSnackbar(true);
		}
	};

	return (
		<Box className="basket" sx={{ p: 4, maxWidth: '100%', height: 'auto', mx: 'auto' }}>
			<Typography variant="h4" mb={3}>
				Basket
			</Typography>
			<List className={'product-card'}>
				{cartItems.map((item) => (
					<React.Fragment key={item._id}>
						<ListItem
							secondaryAction={
								<Box display="flex" alignItems="center" gap={1} className={'card'}>
									<IconButton onClick={() => onRemove(item)}>
										<Remove />
									</IconButton>
									<Typography>{item.quantity}</Typography>
									<IconButton onClick={() => onAdd(item)}>
										<Add />
									</IconButton>
									<IconButton onClick={() => onDelete(item)}>
										<Delete />
									</IconButton>
								</Box>
							}
						>
							{item.image && (
								<ListItemAvatar>
									<Avatar src={`${REACT_APP_API_URL}/${item.image}`} />
								</ListItemAvatar>
							)}
							<ListItemText
								primary={item.name}
								secondary={`$${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`}
							/>
						</ListItem>
						<Divider />
					</React.Fragment>
				))}
			</List>
			<Box mt={2}>
				<Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
			</Box>
			<Button
				variant="contained"
				className={'checkout-btn'}
				sx={{ bgcolor: '#292f36', color: '#cda274', mt: 2, width: '120px', height: '50px' }}
				onClick={handleCheckout}
			>
				Checkout
			</Button>

			{/* <Orders /> */}

			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenSnackbar(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
					Order placed successfully!
				</Alert>
			</Snackbar>

			<Snackbar
				open={errorSnackbar}
				autoHideDuration={3000}
				onClose={() => setErrorSnackbar(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={() => setErrorSnackbar(false)} severity="error" sx={{ width: '100%' }}>
					Failed to place order.
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default Basket;
