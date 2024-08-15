import { Express } from "express-serve-static-core";
import publicRoutes from "./public";
import bookRoutes from "./api/book-route";

export default class Routes {
  public static configure(app: Express): void {
    app.use("/", publicRoutes);
    app.use("/books", bookRoutes);
  }
}
