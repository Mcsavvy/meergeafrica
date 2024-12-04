import { UNPROTECTED_ROUTES } from "@/config";
import { MiddlewareFactory } from "./stackhandler";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const PublicMiddleware: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const path = req.nextUrl.pathname;
    if (UNPROTECTED_ROUTES.some((route) => new RegExp(route).test(path))) {
        return NextResponse.next();
    }
    return next(req, _next);
  };
};
