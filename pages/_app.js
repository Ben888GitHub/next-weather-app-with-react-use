import '../styles/globals.css';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { useRef, useState } from 'react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
