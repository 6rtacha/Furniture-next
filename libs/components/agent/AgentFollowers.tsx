import { Stack } from '@mui/material';
import { Product } from '../../types/product/product';
import { REACT_APP_API_URL } from '../../config';
import Moment from 'react-moment';
import { useEffect, useState } from 'react';
import AgentProductCard from './AgentProductCard';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../../apollo/user/query';
import { ProductsInquiry } from '../../types/product/product.input';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { T } from '../../types/common';

const AgentFollowers = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [agentProducts, setAgentProducts] = useState<Product[]>([]);
	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(initialInput);
	const [productTotal, setProductTotal] = useState<number>(0);
	const [agentId, setAgentId] = useState<string>('');

	/** APOLLO REQUESTS **/
	const {
		loading: getProductsLoading,
		data: getProductsData,
		error: getProductsError,
		refetch: getProductsRefetch,
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: searchFilter },
		// skip: !searchFilter.search.memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentProducts(data?.getProducts?.list);
			setProductTotal(data?.getProducts?.metaCounter[0].total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.agentId) setAgentId(router.query.agentId as string);
		setSearchFilter({ ...searchFilter, search: { memberId: agentId } });
		console.log('agentId:', agentId);
	}, [router]);

	useEffect(() => {
		getProductsRefetch({ input: searchFilter });
	}, [router.query.tab]);

	return (
		<>
			{agentProducts.map((agentProduct: Product) => {
				return <AgentProductCard agentProduct={agentProduct} />;
			})}
		</>
	);
};

AgentFollowers.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		sort: 'createdAt',
		direction: 'ASC',
		search: {
			memberId: '',
		},
	},
};

export default AgentFollowers;
