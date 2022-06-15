const ajax = require('ajax')
export default async function Zodiac(req, res) {
	let body = JSON.parse(req.body)



	await fetch('https://scraping-api-17854.herokuapp.com/api/zodiac', {
		method: "POST",
		body: req.body
	}).then(response => {
		return response.json()
	}).then(data => {
		console.log({ data })   //////////
		return res.json(data.result)

	}).catch(err => {

		console.error(err)
	})
}

