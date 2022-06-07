import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const port = 3001;

app.get("/data", (req, res) => {
    res.json({ foo: "baaarrddff" });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
