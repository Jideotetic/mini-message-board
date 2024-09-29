#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

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
		process.argv[3] ||
		process.env.IMAGE_URL + backgroundImages[Math.floor(Math.random() * 7)];
	return imageURL;
};

const SQL = `CREATE TABLE IF NOT EXISTS random_facts (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
fact TEXT,
username VARCHAR ( 255 ),
added DATE,
image_url TEXT
)`;

async function main() {
	console.log("seeding...");
	const client = new Client({
		connectionString: process.argv[2] || process.env.DB_URL,
		// ssl: {
		// 	rejectUnauthorized: false,
		// },
	});

	await client.connect();
	await client.query(SQL);

	const insertPromises = [];

	for (let i = 0; i < 3; i++) {
		const imageURL = getRandomImage();
		const fact = [
			"A cloud weighs around a million tonnes",
			"Giraffes are 30 times more likely to get hit by lightning than people",
			"The fear of long words is called Hippopotomonstrosesquippedaliophobia",
		][i];
		const username = "Jideotetic";
		const added = new Date();

		const query = `
	        INSERT INTO random_facts (fact, username, added, image_url)
	        VALUES ($1, $2, $3, $4)
	    `;

		insertPromises.push(client.query(query, [fact, username, added, imageURL]));
	}

	await Promise.all(insertPromises);
	await client.end();
	console.log("done");
}

main();
