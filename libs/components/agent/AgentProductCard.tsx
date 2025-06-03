import { Stack } from '@mui/material';
import { Product } from '../../types/product/product';
import { REACT_APP_API_URL } from '../../config';
import Moment from 'react-moment';
import Link from 'next/link';

interface AgentProductCardProps {
	agentProduct: Product;
}

const AgentProductCard = (props: AgentProductCardProps) => {
	const { agentProduct } = props;
	return (
		<Stack className={'pb-card'}>
			<Link
				href={{
					pathname: '/product/detail',
					query: { id: agentProduct?._id },
				}}
			>
				<img src={`${REACT_APP_API_URL}/${agentProduct?.productImages[0]}`} alt="" />
			</Link>
			<Stack className={'card-info'}>
				<Stack className={'pb-name'}>
					<div className="name">{agentProduct?.productTitle}</div>
					<div className="name">${agentProduct?.productPrice}</div>
				</Stack>
				<Stack className={'status'}>
					{agentProduct?.productStatus == 'ACTIVE' ? <span>ACTIVE</span> : <span></span>}
					<Moment format="DD MMMM, YYYY">{agentProduct?.createdAt}</Moment>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AgentProductCard;
