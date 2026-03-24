const express = require("express");
const cors = require("cors");
const app = express();

const bookRouter = require("./routers/bookRouter");
const errorsHandlerMiddleware = require("./middlewares/errorsHandler");
const notFoundMiddleware = require("./middlewares/notFound");

const corsConfig = { origin: process.env.FE_URL };
app.use(cors(corsConfig));

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
	// variabile.metodo();
	// throw new Error("errore catastrofico");
	res.send("Benvenuto sul nostro server");
});

app.use("/api/books", bookRouter);

app.use(notFoundMiddleware);
app.use(errorsHandlerMiddleware);

app.listen(process.env.APP_PORT, () => {
	console.log(`Express avviato correttamente su http://localhost:${process.env.APP_PORT}/`);
});