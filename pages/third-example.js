import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function ThirdExample({ weatherData }) {
	const [city, setCity] = useState('');
	const [searchCity, setSearchCity] = useState('');
	const router = useRouter();

	useEffect(() => {
		city &&
			router.push(`/third-example/?city=${city}`, undefined, {
				shallow: true
			}) &&
			router.replace(`/third-example/?city=${city}`);
		console.log(router.query);
	}, [city]);

	const handleSubmit = () => {
		setCity(searchCity);
		console.log(searchCity);
	};

	return (
		<div>
			{weatherData.cod === 200 ? (
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
								{weatherData?.name}, {weatherData?.sys.country}
							</h1>
							13 January, 2022
						</div>
						<div className="d-flex justify-content-between align-items-center mt-4">
							<div className="pe-5">
								<h2 className="d-inline">
									{Math.round(weatherData?.main.temp)}
								</h2>
								<sup>°C</sup>
								<p className="text-info">
									{weatherData?.weather[0].description}
								</p>
							</div>
							<div>
								<img
									src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
									alt=""
									width={100}
									draggable="false"
								/>
							</div>
						</div>
						<hr />
						{/* <div className="d-md-flex justify-content-between align-items-center mt-4">
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
						</div> */}
					</div>
				</div>
			) : (
				<h2>City Not Found</h2>
			)}
		</div>
	);
}

export default ThirdExample;

export const getServerSideProps = async (context) => {
	console.log(context);

	const api_key = process.env.WEATHER_API_KEY;
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${
		context.query.city ? context.query.city : 'Medan'
	},&appid=${api_key}&units=metric`;
	const weatherRequest = await fetch(url);
	const weatherData = await weatherRequest.json();

	return {
		props: { weatherData }
	};
};
