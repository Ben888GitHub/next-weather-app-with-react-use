export default async function handler(req, res) {
	res.setHeader('Cache-Control', 's-maxage=10');

	const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.query.city},&appid=${process.env.WEATHER_API_KEY}&units=metric`;
	const weatherRequest = await fetch(url);
	const weatherData = await weatherRequest.json();
	res.status(200).json(weatherData);
	console.log(req.query);
}
