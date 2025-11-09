import { GET } from "../route";
import { NextRequest } from "next/server";

jest.mock("../../../../../lib/prisma", () => ({
  __esModule: true,
  default: {
    ingresso: {
      findUnique: jest.fn(),
    },
  },
}));
const prisma = require("../../../../../lib/prisma").default;

describe("GET /api/ingresso/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar ingresso quando encontrado", async () => {
    const mockIngresso = {
      id: 1,
      valor: 25.0,
      sessoesAssentos: [
        {
          id: 1,
          sessao: {
            id: 1,
            filme: { id: 1, titulo: "Filme Teste" },
            sala: { id: 1, nome: "Sala 1" },
          },
          assento: { id: 1, numero: "A1" },
        },
      ],
      pagamento: { id: 1, valor: 25.0 },
    };
    (prisma.ingresso.findUnique as jest.Mock).mockResolvedValue(mockIngresso);
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "1" } });
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual(mockIngresso);
    expect(prisma.ingresso.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        sessoesAssentos: {
          include: {
            sessao: {
              include: {
                filme: true,
                sala: true,
              },
            },
            assento: true,
          },
        },
        pagamento: true,
      },
    });
  });

  it("deve retornar 404 quando ingresso não encontrado", async () => {
    (prisma.ingresso.findUnique as jest.Mock).mockResolvedValue(null);
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "999" } });
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Ingresso não encontrado" });
  });

  it("deve retornar 400 quando ID é inválido", async () => {
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "abc" } });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "ID inválido" });
  });

  it("deve retornar 500 em erro inesperado", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (prisma.ingresso.findUnique as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );
    const req = {} as NextRequest;
    const res = await GET(req, { params: { id: "1" } });
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Erro ao buscar ingresso" });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar ingresso:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});
