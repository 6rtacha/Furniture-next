import { Stack } from '@mui/material';
import { ProductStatus } from '../../enums/product.enum';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useState } from 'react';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { AgentProductsInquiry } from '../../types/product/product.input';
import { Product } from '../../types/product/product';
import { UPDATE_PRODUCT } from '../../../apollo/user/mutation';
import { GET_AGENT_PRODUCTS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { sweetConfirmAlert, sweetErrorHandling } from '../../sweetAlert';
import Moment from 'react-moment';

const MyProducts: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<AgentProductsInquiry>(initialInput);
	const [agentProducts, setAgentProducts] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [updateProduct] = useMutation(UPDATE_PRODUCT);

	const {
		loading: getAgentProductsLoading,
		data: getAgentProductsData,
		error: getAgentProductsError,
		refetch: getAgentProductsRefetch,
	} = useQuery(GET_AGENT_PRODUCTS, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentProducts(data?.getAgentProducts?.list);
			setTotal(data?.getAgentProducts?.metaCounter[0]?.total ?? 0);
		},
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: ProductStatus) => {
		setSearchFilter({ ...searchFilter, search: { productStatus: value } });
	};

	const deleteProductHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to delete this product?')) {
				await updateProduct({
					variables: {
						input: {
							_id: id,
							productStatus: 'DELETE',
						},
					},
				});
				await getAgentProductsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	const updateProductHandler = async (status: string, id: string) => {
		try {
			if (await sweetConfirmAlert(`Are you sure change to ${status} status?`)) {
				await updateProduct({
					variables: {
						input: {
							_id: id,
							productStatus: status,
						},
					},
				});
				await getAgentProductsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	return agentProducts.map((product: Product) => {
		return (
			<Stack className={'pb-card'}>
				<img src={`${process.env.REACT_APP_API_URL}/${product.productImages[0]}`} alt="" />
				<Stack className={'card-info'}>
					<Stack className={'pb-name'}>
						<div className="name">{product.productTitle}</div>
						<div className="name">${product.productPrice}</div>
					</Stack>
					<Stack className={'status'}>
						<span>{product.productStatus}</span>
						<Moment format="DD MMMM, YYYY">{product.createdAt}</Moment>
					</Stack>
				</Stack>
			</Stack>
		);
	});
};

MyProducts.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			productStatus: 'ACTIVE',
		},
	},
};

export default MyProducts;
