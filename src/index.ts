import { config } from "./config/config";
config();
import app from "./config/express.config";
app.run();