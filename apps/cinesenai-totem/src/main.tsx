import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Outlet,
  Router,
  RouterProvider,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { FilmesPage } from "@/components/filmes-page";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const filmesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/filmes",
  component: FilmesPage,
});

const routeTree = rootRoute.addChildren([homeRoute, filmesRoute]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
