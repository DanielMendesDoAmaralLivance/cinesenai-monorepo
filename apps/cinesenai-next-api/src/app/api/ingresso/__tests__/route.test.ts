import { POST } from "../route";
import { NextRequest } from "next/server";

jest.mock("../../../../lib/prisma", () => ({
  __esModule: true,
  default: {
    ingresso: {
      create: jest.fn(),
    },
  },
}));
const prisma = require("../../../../lib/prisma").default;

describe("POST /api/ingresso", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar ingresso e retornar ID", async () => {
    const mockIngressoData = {
      data: {
        sessaoId: 1,
        tipoEntradaId: 1,
        formaPagamentoId: 1,
        valor: 25.0,
        sessoesAssentos: {
          create: [{ sessaoAssentoId: 1 }],
        },
      },
    };
    const mockIngresso = { id: 1, ...mockIngressoData.data };
    (prisma.ingresso.create as jest.Mock).mockResolvedValue(mockIngresso);

    const req = {
      json: async () => mockIngressoData,
    } as NextRequest;
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(201);
    expect(json).toBe(1);
    expect(prisma.ingresso.create).toHaveBeenCalledWith(mockIngressoData);
  });

  it("deve retornar 400 quando corpo é inválido", async () => {
    const req = {
      json: async () => null,
    } as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Corpo da requisição inválido" });
  });

  it("deve retornar 400 quando corpo não é objeto", async () => {
    const req = {
      json: async () => "string invalida",
    } as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Corpo da requisição inválido" });
  });

  it("deve retornar 500 em erro inesperado", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const mockIngressoData = {
      data: {
        sessaoId: 1,
        tipoEntradaId: 1,
        formaPagamentoId: 1,
        valor: 25.0,
      },
    };
    (prisma.ingresso.create as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );
    const req = {
      json: async () => mockIngressoData,
    } as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Erro ao criar ingresso" });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao criar ingresso:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});
