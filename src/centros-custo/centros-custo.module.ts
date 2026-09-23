import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CentrosCusto } from './centros-custo.entity';
import { CentrosCustoController } from './centros-custo.controller';
import { Auditoria } from 'src/auditoria/auditoria.entity';
import { CentrosCustoService } from './centros-custo.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([CentrosCusto, Auditoria])],
  controllers: [CentrosCustoController],
  providers: [CentrosCustoService],
})
export class CentrosCustoModule {}