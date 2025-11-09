import "dotenv/config";
import { server } from "./server";
import { PORT } from "./config";

server.listen(PORT, () => {
  console.log(`Server was launched on port ${PORT}`);
});
