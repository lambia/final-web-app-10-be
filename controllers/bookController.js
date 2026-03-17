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

	const sqlQueryBooks = "SELECT * FROM books WHERE id = ?";
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

module.exports = { index, show };