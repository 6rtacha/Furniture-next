import { Stack } from '@mui/material';
import { Product } from '../../types/product/product';
import { REACT_APP_API_URL } from '../../config';
import Moment from 'react-moment';
import { useEffect, useState } from 'react';
import AgentProductCard from './AgentProductCard';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_PRODUCTS } from '../../../apollo/user/query';
import { ProductsInquiry } from '../../types/product/product.input';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { T } from '../../types/common';
import { userVar } from '../../../apollo/store';
import { Direction } from '../../enums/common.enum';

interface AgentProductProps {
	searchFilter: any;
}

const AgentProduct = (props: AgentProductProps) => {
	const { searchFilter } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [agentProducts, setAgentProducts] = useState<Product[]>([]);

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

	console.log('searchFilter', searchFilter);

	return (
		<>
			{agentProducts.map((agentProduct: Product) => {
				return <AgentProductCard agentProduct={agentProduct} />;
			})}
		</>
	);
};

export default AgentProduct;
