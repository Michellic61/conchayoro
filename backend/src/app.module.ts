import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      omitNull: true,
      autoLoadModels: true,
      synchronize: true,
      storage: 'database.sqlite',
    }),
    ProductsModule,
  ],
})
export class AppModule {}  // <-- Nome correto da classe principal do módulo da aplicação


