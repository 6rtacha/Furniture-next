import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/Logo.png" />

				{/* SEO */}
				<meta name="keyword" content={'interno, interno.uz, devex mern, mern nestjs fullstack'} />
				<meta
					name={'description'}
					content={
						'Buy and sell furnitures anywhere anytime in South Korea. Best funrnitures at Best prices on interno | ' +
						'Покупайте и продавайте мебель где угодно и когда угодно в Южной Корее. Лучшая мебель по лучшим ценам на interno | ' +
						'한국 어디에서나 언제든 가구를 사고팔 수 있습니다. 최고의 가구를 인터노에서 최저가로 만나보세요.'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
