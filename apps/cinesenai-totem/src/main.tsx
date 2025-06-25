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
import { HomePage } from "@/pages/home-page";
import { FilmesPage } from "@/pages/filmes-page";
import { FilmeDetalhesPage } from "@/pages/filme-detalhes-page";
import { SessaoDetalhesPage } from "@/pages/sessao-detalhes-page";
import { CheckoutPage } from "@/pages/checkout-page";

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

const filmeDetalhesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/filmes/$filmeId",
  component: FilmeDetalhesPage,
});

const sessaoDetalhesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/filmes/$filmeId/sessoes/$sessaoId",
  component: SessaoDetalhesPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/filmes/$filmeId/sessoes/$sessaoId/checkout",
  component: CheckoutPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  filmesRoute,
  filmeDetalhesRoute,
  sessaoDetalhesRoute,
  checkoutRoute,
]);

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
