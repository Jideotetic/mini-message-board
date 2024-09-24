const { v4: uuidv4 } = require("uuid");
const { format } = require("date-fns");
const asyncHandler = require("express-async-handler");

const randomFacts = [
	{
		id: uuidv4(),
		text: "A cloud weighs around a million tonnes",
		user: "Jideotetic",
		added: format(new Date(), "yyyy-MM-dd"),
	},
	{
		id: uuidv4(),
		text: "Giraffes are 30 times more likely to get hit by lightning than people",
		user: "Jideotetic",
		added: format(new Date(), "yyyy-MM-dd"),
	},
	{
		id: uuidv4(),
		text: "The fear of long words is called Hippopotomonstrosesquippedaliophobia",
		user: "Jideotetic",
		added: format(new Date(), "yyyy-MM-dd"),
	},
];

const getRandomFacts = asyncHandler((req, res) => {
	res.render("index", { title: "Random Cool Facts", randomFacts: randomFacts });
});

const createNewFact = asyncHandler((req, res) => {
	res.render("form", { title: "Random Cool Facts" });
});

const addNewFact = asyncHandler((req, res) => {
	randomFacts.push({
		id: uuidv4(),
		text: req.body.newFact,
		user: req.body.username,
		added: format(new Date(), "yyyy-MM-dd"),
	});
	res.redirect("/");
});

const getFactDetails = asyncHandler((req, res) => {
	const fact = randomFacts.find((fact) => fact.id === req.params.factDetail);
	if (!fact) {
		res.status(404).send("Page not found");
		return;
	}
	res.render("fact-details", { title: "Random Cool Facts", fact: fact });
});

module.exports = { getRandomFacts, addNewFact, createNewFact, getFactDetails };
