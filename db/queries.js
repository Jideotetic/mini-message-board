const pool = require("./pool");

async function getAllRandomFacts() {
	const { rows } = await pool.query(
		"SELECT *, TO_CHAR(NOW(), 'YYYY-MM-DD') AS formatted_date FROM random_facts"
	);
	return rows;
}

async function insertNewFact(fact, username, added) {
	await pool.query(
		"INSERT INTO random_facts (fact, username, added, image_data, image_name) VALUES ($1, $2, $3, $4, $5)",
		[fact, username, added, ...getRandomImage()]
	);
}

module.exports = {
	getAllRandomFacts,
	insertNewFact,
};
