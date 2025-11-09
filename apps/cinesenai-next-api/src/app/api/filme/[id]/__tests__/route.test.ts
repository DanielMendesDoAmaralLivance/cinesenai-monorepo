import { GET } from "../route";
import { NextRequest, NextResponse } from "next/server";

jest.mock("../../../../../lib/prisma", () => ({
  __esModule: true,
  default: {
    filme: {
      findUnique: jest.fn(),
    },
  },
}));
const prisma = require("../../../../../lib/prisma").default;

describe("GET /filme/[id]", () => {
  afterEach(() => jest.clearAllMocks());

  it("retorna filme quando encontrado", async () => {
    const filmeMock = {
      id: 1,
      titulo: "Filme Teste",
      generos: [],
      sessoes: [],
    };
    prisma.filme.findUnique.mockResolvedValue(filmeMock);
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "1" } });
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual(filmeMock);
  });

  it("retorna 404 se filme não encontrado", async () => {
    prisma.filme.findUnique.mockResolvedValue(null);
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "999" } });
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Filme não encontrado" });
  });

  it("retorna 400 se id inválido", async () => {
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "abc" } });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "ID inválido" });
  });

  it("retorna 500 em erro inesperado", async () => {
    prisma.filme.findUnique.mockRejectedValue(new Error("DB error"));
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "1" } });
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Erro ao buscar filme" });
  });
});
