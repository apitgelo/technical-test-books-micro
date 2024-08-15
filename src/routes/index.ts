import { Express } from "express-serve-static-core";
import publicRoutes from "./public";

export default class Routes {
  public static configure(app: Express): void {
    app.use("/", publicRoutes);
  }
}
