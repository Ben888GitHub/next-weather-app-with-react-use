import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'react-use';

function History() {
	const [value, setValue, remove] = useLocalStorage('weatherHistory', []);
	const [weatherHistory, setWeatherHistory] = useState([]);
	const router = useRouter();

	console.log(value);

	useEffect(() => {
		setWeatherHistory(value);
	}, []);

	const handleDeleteHistory = (idx) => {
		const deleteHistory = value.filter((_, i) => i !== idx);
		setValue(deleteHistory);
		setWeatherHistory(deleteHistory);
	};

	return (
		<div
			className="d-flex justify-content-center align-items-center p-3"
			style={{ minHeight: '100vh' }}
		>
			<div>
				<button onClick={() => router.back()}>Back</button>
				<hr />
				<h2> My Weather History</h2>
				<div className="mt-5">
					{weatherHistory ? (
						weatherHistory?.map((weather, idx) => (
							<div key={idx} className="card mb-3" style={{ width: '450px' }}>
								<div className="card-body text-dark">
									<h5 className="card-title ">
										{weather.city} - {weather.date}
									</h5>
									<small>{weather.time}</small>
									<hr />
									<p className="card-text">
										<span className="font-weight-bold">Temperature: </span>
										{weather.temperature}
										<sup>°C</sup>
									</p>
									<p className="card-text">
										<span className="font-weight-bold">Condition: </span>
										{weather.description}
									</p>
									<button onClick={() => handleDeleteHistory(idx)}>
										Delete
									</button>
								</div>
								<br />
								<br />
							</div>
						))
					) : (
						<h3>Nothing to see here - yet</h3>
					)}
				</div>
			</div>
		</div>
	);
}

export default History;
