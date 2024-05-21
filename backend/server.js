const app = express();

app.use(express.json());
const server = http.createServer(app);
//? Start the server
const PORT = process.env.PORT || 9080;

server.listen(PORT, console.log(`Server is running on port ${PORT}`));
