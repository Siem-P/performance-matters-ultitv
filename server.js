import express from "express";
import bodyParser from "body-parser"

const server = express();
// Api url
const apiUrl = "https://ultitv-api.netlify.app/api/v2"

server.set("view engine", "ejs")
server.set("views", "./views")
server.set("port", process.env.PORT || 8000)

server.use(express.static("public"))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

server.listen(server.get("port"), () => {
    console.log(`Application started on http://localhost:${server.get("port")}`)
})

server.get("/", async (req, res) => {
    // TODO - Variable game id
    const gameData = await dataFetch(`${apiUrl}/games?id=111`)
    const playerData = await dataFetch(`${apiUrl}/players?orderBy=jerseyNumber&direction=ASC`)
    const gameStats = await dataFetch(`${apiUrl}/stats?id=111`)

    res.render("index", { gameData, playerData, gameStats })
})

server.post("/playerform", async (req, res) => {
    console.log(req.body)

    res.redirect("/")
})

// Api call function
async function dataFetch(url) {
    const data = await fetch(url)
        .then((response) => response.json())
        .catch((error) => error)
    return data
}