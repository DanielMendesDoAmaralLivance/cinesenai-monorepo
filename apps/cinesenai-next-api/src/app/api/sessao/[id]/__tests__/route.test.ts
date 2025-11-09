import { GET } from "../route";
import { NextRequest } from "next/server";

jest.mock("../../../../../lib/prisma", () => ({
  __esModule: true,
  default: {
    sessao: {
      findUnique: jest.fn(),
    },
  },
}));
const prisma = require("../../../../../lib/prisma").default;

describe("GET /api/sessao/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar sessão quando encontrada", async () => {
    const mockSessao = {
      id: 1,
      inicio: new Date("2025-12-01T20:00:00"),
      sala: {
        id: 1,
        nome: "Sala 1",
        assentos: [{ id: 1, numero: "A1" }],
      },
      filme: {
        id: 1,
        titulo: "Filme Teste",
        generos: [],
      },
      sessoesAssentos: [],
    };
    (prisma.sessao.findUnique as jest.Mock).mockResolvedValue(mockSessao);
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "1" } });
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.id).toBe(1);
    expect(json.sala.nome).toBe("Sala 1");
    expect(json.filme.titulo).toBe("Filme Teste");
    expect(prisma.sessao.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        sala: {
          include: {
            assentos: true,
          },
        },
        filme: {
          include: {
            generos: {
              include: {
                genero: true,
              },
            },
          },
        },
        sessoesAssentos: true,
      },
    });
  });

  it("deve retornar 404 quando sessão não encontrada", async () => {
    (prisma.sessao.findUnique as jest.Mock).mockResolvedValue(null);
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "999" } });
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Sessão não encontrada" });
  });

  it("deve retornar 400 quando ID é inválido", async () => {
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "abc" } });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "ID inválido" });
  });

  it("deve retornar 500 em erro inesperado", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (prisma.sessao.findUnique as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "1" } });
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Erro ao buscar sessão" });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar sessão:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});
