import { stackMiddlewares } from "@/middlewares/stackhandler";
import { PublicMiddleware } from "./middlewares/public";
// import { AuthMiddleware } from "./middlewares/authentication";

const middlewares = [
  PublicMiddleware,
  // AuthMiddleware,
];

export default stackMiddlewares(middlewares);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _assets (metadata files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/((?!verify|middleware).*)",
  ],
};
