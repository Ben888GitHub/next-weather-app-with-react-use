import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

import { useQuery } from 'react-query';
import { useLocalStorage } from 'react-use';

export default function Home() {
	const router = useRouter();

	//
	router.query.city && console.log(router.query.city);

	const [searchCity, setSearchCity] = useState('');

	const [value, setValue, remove] = useLocalStorage('weatherHistory', []);

	const { data, isLoading, error } = useQuery(
		['city', (router.query.city && router.query.city) || 'Medan'],
		async ({ queryKey }) => {
			console.log(queryKey);
			const { data } = await axios.get(`api/weather/${queryKey[1]}`);
			return data;
		},
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			refetchOnMount: false
		}
	);

	data && console.log(data);

	const handleSubmit = () => {
		// setCity(searchCity);

		router.push(`/?city=${searchCity}`, undefined, {
			shallow: true
		});
	};

	const handleSave = () => {
		const date = new Date();
		console.log(data);

		let weatherData = {
			date: `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`,
			time: date.toLocaleTimeString(),
			city: `${data?.name}, ${data?.sys.country}`,
			temperature: data?.main?.temp,
			description: data?.weather[0]?.description
		};

		setValue([...value, weatherData]);
	};

	isLoading && <p>Loading...</p>;

	error && <p>Error!</p>;

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{data && (
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ minHeight: '100vh' }}
				>
					<div>
						<div>
							<input
								onChange={(e) => setSearchCity(e.target.value)}
								type="text"
								placeholder="City"
								value={searchCity}
							/>
							<button onClick={handleSubmit}>Search</button>
						</div>
						<div>
							<h1 className="fw-bolder" style={{ fontSize: '60px' }}>
								{data?.name}, {data?.sys.country}
							</h1>
							13 January, 2022
						</div>
						<div className="d-flex justify-content-between align-items-center mt-4">
							<div className="pe-5">
								<h2>{Math.round(data?.main?.temp)}</h2>
								<sup>°C</sup>
								<p className="text-info">{data?.weather[0].description}</p>
							</div>
							<div>
								<img
									src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
									alt=""
									width={100}
									draggable="false"
								/>
							</div>
						</div>
						<hr />
						<div className="d-md-flex justify-content-between align-items-center mt-4">
							<button
								onClick={handleSave}
								className="btn btn-success border-0 save-btn px-4 py-3"
							>
								Save
							</button>
							<Link href="/history">
								<button className="btn btn-danger border-0 history-btn px-4 py-3 ms-auto">
									My History
								</button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

// export const getStaticProps = async () => {
// 	const { data } = await axios.get(`http://ip-api.com/json/`);

// 	return {
// 		props: {
// 			ipData: data
// 		}
// 	};
// };
