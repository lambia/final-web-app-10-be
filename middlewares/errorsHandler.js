function errorsHandler(err, req, res, next) {

	console.error(err);

	res.status(500).json({
		error: `Ops... ${err.name}`,
		message: err.message
	});
}

module.exports = errorsHandler;