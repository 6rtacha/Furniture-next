import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Chip, Stack } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_MY_ORDERS } from '../../../apollo/user/query';
import { Order } from '../../types/order/order';
import { T } from '../../types/common';
import { OrderStatus } from '../../enums/product.enum';
import { Product } from '../../types/product/product';

const Orders = () => {
	const [myOrders, setMyOrders] = useState<Order[]>([]);

	const {
		loading: getMyOrdersLoading,
		data: getMyOrdersData,
		error: getMyOrdersError,
		refetch: getMyOrdersRefetch,
	} = useQuery(GET_MY_ORDERS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: {
				page: 1,
				limit: 100,
				search: {},
			},
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMyOrders(data?.getMyOrders?.list || []); // <- FIXED
		},
	});
	console.log('myOrders', myOrders);

	return (
		<Box className={'orders-component'}>
			{myOrders.length === 0 ? (
				<Typography>No orders found.</Typography>
			) : (
				<Stack spacing={3}>
					{myOrders.map((myOrder) => (
						<Card key={myOrder._id} elevation={3}>
							<CardContent>
								<Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
									<Typography variant="h6">Order #{myOrder._id}</Typography>
									<Chip
										label={myOrder.orderStatus}
										color={myOrder.orderStatus === OrderStatus.FINISH ? 'success' : 'warning'}
									/>
								</Stack>

								<List dense>
									{myOrder.orderItems?.map((item, idx) => {
										const product: Product | undefined = myOrder.productData?.find(
											(ele: Product) => item.productId === ele._id,
										);

										return (
											<React.Fragment key={idx}>
												<ListItem>
													<ListItemText
														primary={product?.productTitle || 'Unknown Product'}
														secondary={`Quantity: ${item.itemQuantity} × $${item.itemPrice.toFixed(2)}`}
													/>
													<Typography fontWeight={600}>${(item.itemPrice * item.itemQuantity).toFixed(2)}</Typography>
												</ListItem>
												{idx < myOrder.orderItems.length - 1 && <Divider />}
											</React.Fragment>
										);
									})}
								</List>

								<Box mt={2} display="flex" justifyContent="space-between">
									<Typography variant="body2" color="text.secondary">
										Placed: {new Date(myOrder.createdAt).toLocaleDateString()}
									</Typography>
									<Typography variant="h6">Total: ${myOrder.orderTotal.toFixed(2)}</Typography>
								</Box>
							</CardContent>
						</Card>
					))}
				</Stack>
			)}
		</Box>
	);
};

export default Orders;
