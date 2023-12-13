import App from '@/app';
import validateEnv from '@utils/validateEnv';
import IndexRoute from "@routes/index.route";
import AuthRoute from "@routes/auth.route";


validateEnv();

const app = new App([new IndexRoute(), new AuthRoute()]);
app.setUpWebsocketServer();

app.listen();
