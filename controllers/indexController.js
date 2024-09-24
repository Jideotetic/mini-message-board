const randomFacts = [
	{
		text: "A cloud weighs around a million tonnes",
		user: "Jideotetic",
		added: new Date(),
	},
	{
		text: "Giraffes are 30 times more likely to get hit by lightning than people",
		user: "Jideotetic",
		added: new Date(),
	},
	{
		text: "The fear of long words is called Hippopotomonstrosesquippedaliophobia",
		user: "Jideotetic",
		added: new Date(),
	},
];

const getRandomFacts = (req, res) => {
	res.render("index", { title: "Random Cool Facts", randomFacts: randomFacts });
};

module.exports = { getRandomFacts };
