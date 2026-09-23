import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CentrosCusto } from './centros-custo.entity';
import { DataSource } from 'typeorm';


@Injectable()
export class CentrosCustoService {
  constructor(
    @InjectRepository(CentrosCusto)
    private readonly repository: Repository<CentrosCusto>,
  ) {}

  async buscarPorCodigo(codigo: string) {
    const centrosCusto = await this.repository.findOneBy({ codigo });
    if (!centrosCusto) {
      throw new NotFoundException('Centro de custo não encontrado');
    }
    return centrosCusto;
  }
}