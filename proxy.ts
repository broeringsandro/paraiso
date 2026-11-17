import { NextResponse, type NextRequest } from "next/server";

// Português fica na raiz (/plantas); inglês e espanhol em /en e /es.
// Internamente tudo vive em app/[lang]: a raiz é reescrita para /pt.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /pt e /pt/... redirecionam para a URL sem prefixo
  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/pt/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  if (/^\/(en|es)(\/|$)/.test(pathname)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/pt${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
