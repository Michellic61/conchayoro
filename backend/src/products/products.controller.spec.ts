import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service'; // Correção da sintaxe de importação
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// --- DEFINIÇÃO DO OBJETO MOCK DE PRODUTO (CORRIGIDO PARA 'any') ---
const product: any = { // Tipado como 'any' para evitar erros de tipagem com métodos de instância do Sequelize
  id: 'mock-product-id-1', // ID é crucial para operações de busca/atualização/exclusão
  name: 'Product1',
  price: 10,
  category: 'C1',
  rating: 1,
  // Adicione timestamps se sua entidade Product os tiver (o que é comum no Sequelize)
  createdAt: new Date(),
  updatedAt: new Date(),
  // Adicione outras propriedades que sua entidade Product possa ter (ex: deletedAt)
};

// --- DTOs (Data Transfer Objects) para criação e atualização ---
// Use DTOs que correspondam à estrutura real dos seus CreateProductDto e UpdateProductDto
const createProductDto: CreateProductDto = {
  name: product.name,
  price: product.price,
  category: product.category,
  rating: product.rating,
};

const updateProductDto: UpdateProductDto = {
  name: 'Updated Product Name',
  price: 20,
  category: 'Updated Category', // <--- Adicionado, se for obrigatório
  rating: 5,    
};

describe('ProductsController', () => {
  let productsService: ProductsService;
  let productsController: ProductsController;
  let productModel: typeof Product; // Para o mock do modelo Sequelize

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product),
          useValue: {
            // Mocks para os métodos do modelo Sequelize
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    productsController = moduleRef.get<ProductsController>(ProductsController);
    productModel = moduleRef.get<typeof Product>(getModelToken(Product));
  });

  // --- Teste de Inclusão de Produto (Create) ---
  it('should create a product', async () => {
    const mockedResponseData = product;
    jest
      .spyOn(productsService, 'create')
      .mockImplementation(() => Promise.resolve(mockedResponseData)); // 'product' já é 'any', então 'as any' é opcional aqui

    expect(await productsController.create(createProductDto)).toBe(
      mockedResponseData,
    );
  });

  // --- Teste de Alteração de Produto (Update) ---
  it('should update a product', async () => {
    // Cria um mock com o produto atualizado (também como 'any')
    const updatedProduct: any = { ...product, name: updateProductDto.name, price: updateProductDto.price };
    const id = product.id; // Use o ID do mock product

    jest
      .spyOn(productsService, 'update')
      // Corrigido: Moldado o retorno para 'as any' para compatibilidade com o TypeScript
      // O mock simula o retorno padrão do Sequelize update: [affectedCount, affectedRows]
      .mockImplementation(() => Promise.resolve([1, updatedProduct] as any));

    // O expect deve corresponder ao que o seu CONTROLLER retorna.
    // Se o controller retorna o array [1, updatedProduct] diretamente:
    expect(await productsController.update(id, updateProductDto)).toEqual(
      [1, updatedProduct],
    );
    // OU, se o controller "desempacota" e retorna apenas o updatedProduct (mais comum):
    // expect(await productsController.update(id, updateProductDto)).toEqual(
    //   updatedProduct,
    // );
    // **Você deve descomentar e usar a linha que reflete o comportamento real do seu controller.**
    // **Para a maioria dos cenários de controller, ele retorna o objeto atualizado, não o array do Sequelize.**
    // **Vou manter o mock que simula o Sequelize, mas o expect geralmente seria para o 'updatedProduct' em si.**
    // Para simplificar, vou deixar o expect para o array do Sequelize, pois o mock está assim.
  });

  // --- Teste de Exclusão de Produto (Remove) ---
  it('should delete a product', async () => {
    // Retorna undefined para sucesso de exclusão (o método remove geralmente retorna Promise<void>)
    const mockedResponseData = undefined;
    const id = product.id; // Use o ID do mock product

    jest
      .spyOn(productsService, 'remove')
      .mockImplementation(() => Promise.resolve(mockedResponseData));

    expect(await productsController.remove(id)).toBe(mockedResponseData);
  });

  // --- Teste de Pesquisa de Produtos (findAll) ---
  it('should return an array of products', async () => {
    // Corrigido: mockedResponseData como 'any[]' para arrays de mocks
    const mockedResponseData: any[] = [product];
    jest
      .spyOn(productsService, 'findAll')
      .mockImplementation(() => Promise.resolve(mockedResponseData));

    expect(await productsController.findAll()).toBe(mockedResponseData);
  });

  // --- Teste de Pesquisa de um Produto (findOne) ---
  it('should return a specific product', async () => {
    const mockedResponseData = product; // 'product' já é 'any'
    const id = product.id; // Use o ID do mock product

    jest
      .spyOn(productsService, 'findOne')
      .mockImplementation(() => Promise.resolve(mockedResponseData)); // Não precisa de 'as any' aqui se mockedResponseData já é 'any'

    expect(await productsController.findOne(id)).toBe(mockedResponseData);
  });

  it('should delete a product', async () => {
    const mockedResponseData = undefined; // Remove geralmente retorna void/undefined
    const id = product.id;
    jest
      .spyOn(productsService, 'remove')
      .mockImplementation(() => Promise.resolve(mockedResponseData));
    expect(await productsController.remove(id)).toBe(mockedResponseData);
  });

}); // Fim do describe('ProductsController', ...)