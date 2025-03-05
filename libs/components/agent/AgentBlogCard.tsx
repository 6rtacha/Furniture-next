import { Stack } from '@mui/material';

const AgentBlogCard = () => {
	return (
		<Stack className={'pb-card'}>
			<img src="https://s3-alpha-sig.figma.com/img/8b53/a5f9/212f31f550844ba39262a277c128ad8a?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Z0SkGTLc8Y-mZ9BYgZgA8mmwAARNfpWV4Scas3rj8wFLYxTb3PHAFrpIhXhK0yabi8TPA5Aas182D2HhXNqdZqfuV18i-5iXllV2gSEe-r5DWsll-vXjslec5naP7lZ6e-tIlFyd4Eun5kEAzgCIQP9nYCbaAmaq7lErp8Mysia5kxYgEwdl0IYKd4NQnH4YBw3S765Ipju-Zz2hkZDR3Vdel-LJl8JxmGK30AgfY7At6HPnb2E4gjSW~zQHnjNix61mw7-Ls7RxS0QwDM5W1HPX53oMZM9ETCY78utv~J~T6ynFAHL1T~UKkAJ2DNNnqWXlyPbCp8ivtJwsFx9Gsw__" />
			<Stack className={'card-info'}>
				<Stack className={'pb-name'}>
					<div className="name">Kitchen Project</div>
					<div className="name">$123</div>
				</Stack>
				<Stack className={'status'}>
					<span>ACTIVE</span>
					<span>22 December, 2024</span>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AgentBlogCard;
