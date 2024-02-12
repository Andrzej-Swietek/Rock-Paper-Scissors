import App from '@/app';
import validateEnv from '@utils/validateEnv';

// Routes
import IndexRoute from "@routes/index.route";
import AuthRoute from "@routes/auth.route";
import UserRoute from "@routes/user.route";


validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new UserRoute()]);
app.setUpWebsocketServer();

app.listen();
