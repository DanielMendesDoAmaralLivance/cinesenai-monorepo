import { NextRequest } from "next/server";
import { GET } from "../route";
import prisma from "../../../../lib/prisma";

jest.mock("../../../../lib/prisma", () => ({
  __esModule: true,
  default: {
    genero: {
      findMany: jest.fn(),
    },
  },
}));

describe("GET /api/genero", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar gêneros", async () => {
    const mockGeneros = [
      { id: 1, nome: "Ação" },
      { id: 2, nome: "Comédia" },
    ];
    (prisma.genero.findMany as jest.Mock).mockResolvedValue(mockGeneros);
    const req = {} as NextRequest;
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(mockGeneros);
  });

  it("deve retornar array vazio quando não há gêneros", async () => {
    (prisma.genero.findMany as jest.Mock).mockResolvedValue([]);
    const req = {} as NextRequest;
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([]);
  });

  it("deve retornar 500 em erro inesperado", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (prisma.genero.findMany as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );
    const req = {} as NextRequest;
    const res = await GET(req);
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar gêneros:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});
