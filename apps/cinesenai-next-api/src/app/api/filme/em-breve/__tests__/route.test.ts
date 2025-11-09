import { NextRequest } from "next/server";
import { GET } from "../route";
import prisma from "../../../../../lib/prisma";

// Mock do Prisma Client
jest.mock("../../../../../lib/prisma", () => ({
  __esModule: true,
  default: {
    filme: {
      findMany: jest.fn(),
    },
  },
}));

describe("GET /api/filme/em-breve", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar filmes que estreiam no futuro", async () => {
    const dataFutura = new Date("2025-12-01");
    const mockFilmes = [
      {
        id: 1,
        titulo: "Filme A",
        sinopse: "Sinopse do Filme A",
        duracao: 120,
        dataInicioCartaz: dataFutura,
        dataFimCartaz: new Date("2025-12-31"),
        classificacaoIndicativaId: 1,
        urlImagem: "https://example.com/filme-a.jpg",
        generos: [
          {
            filmeId: 1,
            generoId: 1,
            genero: {
              id: 1,
              nome: "Ação",
            },
          },
        ],
      },
      {
        id: 2,
        titulo: "Filme B",
        sinopse: "Sinopse do Filme B",
        duracao: 90,
        dataInicioCartaz: new Date("2025-11-15"),
        dataFimCartaz: new Date("2025-12-15"),
        classificacaoIndicativaId: 2,
        urlImagem: "https://example.com/filme-b.jpg",
        generos: [
          {
            filmeId: 2,
            generoId: 2,
            genero: {
              id: 2,
              nome: "Comédia",
            },
          },
        ],
      },
    ];

    (prisma.filme.findMany as jest.Mock).mockResolvedValue(mockFilmes);

    const request = new NextRequest("http://localhost:3001/api/filme/em-breve");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[0].titulo).toBe("Filme A");
    expect(data[1].titulo).toBe("Filme B");
    expect(prisma.filme.findMany).toHaveBeenCalledWith({
      where: {
        dataInicioCartaz: {
          gt: expect.any(Date),
        },
      },
      orderBy: {
        titulo: "asc",
      },
      include: {
        generos: {
          include: {
            genero: true,
          },
        },
      },
    });
  });

  it("deve retornar array vazio quando não há filmes em breve", async () => {
    (prisma.filme.findMany as jest.Mock).mockResolvedValue([]);

    const request = new NextRequest("http://localhost:3001/api/filme/em-breve");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
    expect(data).toHaveLength(0);
  });

  it("deve retornar status 500 quando ocorre erro no banco de dados", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    (prisma.filme.findMany as jest.Mock).mockRejectedValue(
      new Error("Database connection error")
    );

    const request = new NextRequest("http://localhost:3001/api/filme/em-breve");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar filmes em breve:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it("deve ordenar filmes por título em ordem alfabética", async () => {
    const mockFilmes = [
      {
        id: 2,
        titulo: "B Filme",
        sinopse: "Sinopse",
        duracao: 100,
        dataInicioCartaz: new Date("2025-11-15"),
        dataFimCartaz: new Date("2025-12-15"),
        classificacaoIndicativaId: 1,
        urlImagem: "https://example.com/b.jpg",
        generos: [],
      },
      {
        id: 1,
        titulo: "A Filme",
        sinopse: "Sinopse",
        duracao: 100,
        dataInicioCartaz: new Date("2025-12-01"),
        dataFimCartaz: new Date("2025-12-31"),
        classificacaoIndicativaId: 1,
        urlImagem: "https://example.com/a.jpg",
        generos: [],
      },
    ];

    (prisma.filme.findMany as jest.Mock).mockResolvedValue(mockFilmes);

    const request = new NextRequest("http://localhost:3001/api/filme/em-breve");
    await GET(request);

    expect(prisma.filme.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: {
          titulo: "asc",
        },
      })
    );
  });

  it("deve incluir generos com seus detalhes", async () => {
    const mockFilme = {
      id: 1,
      titulo: "Filme com Gêneros",
      sinopse: "Sinopse",
      duracao: 120,
      dataInicioCartaz: new Date("2025-12-01"),
      dataFimCartaz: new Date("2025-12-31"),
      classificacaoIndicativaId: 1,
      urlImagem: "https://example.com/filme.jpg",
      generos: [
        {
          filmeId: 1,
          generoId: 1,
          genero: {
            id: 1,
            nome: "Ação",
          },
        },
        {
          filmeId: 1,
          generoId: 2,
          genero: {
            id: 2,
            nome: "Aventura",
          },
        },
      ],
    };

    (prisma.filme.findMany as jest.Mock).mockResolvedValue([mockFilme]);

    const request = new NextRequest("http://localhost:3001/api/filme/em-breve");
    const response = await GET(request);
    const data = await response.json();

    expect(data[0].generos).toHaveLength(2);
    expect(data[0].generos[0]).toHaveProperty("genero");
    expect(data[0].generos[0].genero).toHaveProperty("nome");
  });
});
