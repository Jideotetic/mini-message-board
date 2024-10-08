const { v4: uuidv4 } = require("uuid");
const { format } = require("date-fns");
const asyncHandler = require("express-async-handler");
const { getAllRandomFacts, insertNewFact } = require("../db/queries");

const backgroundImages = [
	"../images/background-1.jpg",
	"../images/background-2.jpg",
	"../images/background-3.jpg",
	"../images/background-4.jpg",
	"../images/background-5.jpg",
	"../images/background-6.jpg",
	"../images/background-7.jpg",
	"../images/background-8.jpg",
];

// const randomFacts = [
// 	{
// 		id: uuidv4(),
// 		text: "A cloud weighs around a million tonnes",
// 		user: "Jideotetic",
// 		added: format(new Date(), "yyyy-MM-dd"),
// 		image: backgroundImages[Math.floor(Math.random() * 7)],
// 	},
// 	{
// 		id: uuidv4(),
// 		text: "Giraffes are 30 times more likely to get hit by lightning than people",
// 		user: "Jideotetic",
// 		added: format(new Date(), "yyyy-MM-dd"),
// 		image: backgroundImages[Math.floor(Math.random() * 8)],
// 	},
// 	{
// 		id: uuidv4(),
// 		text: "The fear of long words is called Hippopotomonstrosesquippedaliophobia",
// 		user: "Jideotetic",
// 		added: format(new Date(), "yyyy-MM-dd"),
// 		image: backgroundImages[Math.floor(Math.random() * 8)],
// 	},
// ];

const getRandomFacts = asyncHandler(async (req, res) => {
	const randomFacts = await getAllRandomFacts();
	res.render("index", { title: "Random Cool Facts", randomFacts: randomFacts });
});

const createNewFact = asyncHandler((req, res) => {
	res.render("form", { title: "Random Cool Facts" });
});

const addNewFact = asyncHandler(async (req, res) => {
	await insertNewFact(
		req.body.newFact,
		req.body.username,
		format(new Date(), "yyyy-MM-dd")
	);
	res.redirect("/");
});

const getFactDetails = asyncHandler(async (req, res) => {
	const randomFacts = await getAllRandomFacts();
	const fact = randomFacts.find(
		(fact) => String(fact.id) === req.params.factDetail
	);
	if (!fact) {
		res.render("not-found", { title: "Random Cool Facts" });
		return;
	}
	res.render("fact-details", { title: "Random Cool Facts", fact: fact });
});

module.exports = { getRandomFacts, addNewFact, createNewFact, getFactDetails };
