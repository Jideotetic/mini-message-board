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

const createNewFact = (req, res) => {
	res.render("form", { title: "Random Cool Facts" });
};

const addNewFact = (req, res) => {
	randomFacts.push({
		text: req.body.newFact,
		user: req.body.username,
		added: new Date(),
	});
	res.redirect("/");
};

module.exports = { getRandomFacts, addNewFact, createNewFact };
