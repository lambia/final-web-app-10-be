const db = require("../data/db");

function index(req, res) {
	const sqlQuery = "SELECT * FROM books";
	db.query(sqlQuery, (err, results) => {
		if (err) {
			return res.status(500).json({
				error: "Database query error",
				message: err.message
			});
		}

		res.json(results);
	});
}

function show(req, res) {
	const id = req.params.id;

	const sqlQueryBooks = "SELECT books.*, ROUND(AVG(reviews.vote)) AS average_review FROM books LEFT JOIN reviews ON reviews.book_id = books.id WHERE books.id = ?";
	const sqlQueryReviews = "SELECT * FROM reviews WHERE book_id = ?";

	db.query(sqlQueryBooks, [id], (err, books) => {

		if (err) {
			return res.status(500).json({
				error: "Database query error",
				message: err.message
			});
		}

		if (books.length === 0 || books[0].id === null) {
			return res.status(404).json({ error: "Not found", message: "Cannot find that book" });
		}

		const book = books[0];
		book.average_review = Number(book.average_review);
		console.log("book iniziale", book);

		db.query(sqlQueryReviews, [id], (err, reviews) => {

			if (err) {
				return res.status(500).json({
					error: "Database query error",
					message: err.message
				});
			}

			book.reviews = reviews;

			console.log("reviews", reviews);
			console.log("book con reviews", book);

			res.json(book);

		});


	});
}

function storeReview(req, res) {

	// const id = req.params.id;
	const { id } = req.params;

	const { text, name, vote } = req.body;

	// console.log("Inserisci recensione", id, text, name, vote);

	const sqlQuery = "INSERT INTO reviews (text,name,vote,book_id) VALUES (?,?,?,?)";

	db.query(sqlQuery, [text, name, vote, id], (err, results) => {

		if (err) {
			return res.status(500).json({
				error: "Database query error",
				message: err.message
			});
		}

		res.status(201).json({ message: "Review added", success: true, id: results.insertId });

	});
}

module.exports = { index, show, storeReview };