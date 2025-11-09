import { NextRequest } from "next/server";
import { GET } from "../route";
import prisma from "../../../../../lib/prisma";

jest.mock("../../../../../lib/prisma", () => ({
  __esModule: true,
  default: {
    filme: {
      findMany: jest.fn(),
    },
  },
}));

describe("GET /api/filme/em-cartaz", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar filmes em cartaz", async () => {
    const hoje = new Date();
    const mockFilmes = [
      {
        id: 1,
        titulo: "Filme Cartaz",
        dataInicioCartaz: new Date(hoje.getTime() - 86400000),
        dataFimCartaz: new Date(hoje.getTime() + 86400000),
        generos: [
          {
            filmeId: 1,
            generoId: 1,
            genero: { id: 1, nome: "Ação" },
          },
        ],
      },
    ];
    (prisma.filme.findMany as jest.Mock).mockResolvedValue(mockFilmes);
    const req = {} as NextRequest;
    const res = await GET(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].titulo).toBe("Filme Cartaz");
  });

  it("deve retornar array vazio quando não há filmes em cartaz", async () => {
    (prisma.filme.findMany as jest.Mock).mockResolvedValue([]);
    const req = {} as NextRequest;
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([]);
  });

  it("deve retornar 500 em erro inesperado", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (prisma.filme.findMany as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );
    const req = {} as NextRequest;
    const res = await GET(req);
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar filmes em cartaz:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});
