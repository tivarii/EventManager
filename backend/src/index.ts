import ExpressApp from "./src/server/app";
import { miscConfig } from "./src/config";

const app = ExpressApp();
export default app;
app.listen(miscConfig.port, async () => {
  console.log(`server started at ${miscConfig.port}`);
});
