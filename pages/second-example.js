import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

function SecondExample() {
	const router = useRouter();
	const [city, setCity] = useState('Medan');
	const [searchCity, setSearchCity] = useState('');
	const [weather, setWeather] = useState({});

	const fetchCityWeather = async () => {
		const { data } = await axios.get(
			`api/weather/${router.query.city ? router.query.city : city}`
		);
		console.log(router.query.city);
		console.log(city);
		setWeather(data);
	};

	useEffect(() => {
		fetchCityWeather();
	}, [city, router.isReady, router.query.city]);

	const handleSubmit = () => {
		setCity(searchCity);

		router.push(`/second-example/?city=${searchCity}`, undefined, {
			shallow: true
		});
	};

	return (
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
						{weather?.name}, {weather?.sys?.country}
					</h1>
					13 January, 2022
				</div>
				{weather?.weather && (
					<div className="d-flex justify-content-between align-items-center mt-4">
						<div className="pe-5">
							{weather?.main && <h2>{Math.round(weather?.main?.temp)}</h2>}
							<sup>°C</sup>

							<p className="text-info">{weather?.weather[0]?.description}</p>
						</div>
						<div>
							<img
								src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
								alt=""
								width={100}
								draggable="false"
							/>
						</div>
					</div>
				)}

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
	);
}

export default SecondExample;
