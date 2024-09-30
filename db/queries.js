const pool = require("./pool");
require("dotenv").config();

const backgroundImages = [
	"/background-1.jpg",
	"/background-2.jpg",
	"/background-3.jpg",
	"/background-4.jpg",
	"/background-5.jpg",
	"/background-6.jpg",
	"/background-7.jpg",
	"/background-8.jpg",
];

const getRandomImage = () => {
	const imageURL =
		process.env.IMAGE_URL + backgroundImages[Math.floor(Math.random() * 7)];
	return imageURL;
};

async function getAllRandomFacts() {
	const { rows } = await pool.query(
		"SELECT *, TO_CHAR(NOW(), 'YYYY-MM-DD') AS formatted_date FROM random_facts"
	);
	return rows;
}

async function insertNewFact(fact, username, added) {
	await pool.query(
		"INSERT INTO random_facts (fact, username, added, image_url) VALUES ($1, $2, $3, $4)",
		[fact, username, added, getRandomImage()]
	);
}

module.exports = {
	getAllRandomFacts,
	insertNewFact,
};
