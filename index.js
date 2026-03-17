const express = require("express");
const app = express();
const port = 3000;

const errorsHandlerMiddleware = require("./middlewares/errorsHandler");
const notFoundMiddleware = require("./middlewares/notFound");

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
	// variabile.metodo();
	// throw new Error("errore catastrofico");
	res.send("Benvenuto sul nostro server");
});

app.use(notFoundMiddleware);
app.use(errorsHandlerMiddleware);

app.listen(port, () => {
	console.log(`Express avviato correttamente su http://localhost:${port}/`);
});