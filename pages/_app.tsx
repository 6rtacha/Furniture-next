import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { light } from '../scss/MaterialTheme';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { appWithTranslation } from 'next-i18next';
import '../scss/app.scss';
import '../scss/pc/main.scss';
import '../scss/mobile/main.scss';
import { BasketProvider } from '../libs/context/BasketContext';
import { cartDataVar } from '../apollo/store';

const App = ({ Component, pageProps }: AppProps) => {
	// @ts-ignore
	const [theme, setTheme] = useState(createTheme(light));
	const client = useApollo(pageProps.initialApolloState);

	useEffect(() => {
		const cartJson = localStorage.getItem('cartData');
		cartDataVar(cartJson ? JSON.parse(cartJson) : []);
	}, []);

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<BasketProvider>
					<CssBaseline />
					<Component {...pageProps} />
				</BasketProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
};

export default appWithTranslation(App);
