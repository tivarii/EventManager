import ExpressApp from "./server/app";
import { miscConfig } from "./config";


const app = ExpressApp();
export default app;
// app.listen(miscConfig.port, async () => {
//   console.log(`server started at ${miscConfig.port}`);
// });
