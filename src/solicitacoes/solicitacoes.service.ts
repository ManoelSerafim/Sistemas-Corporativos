import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarSolicitacaoDto } from './dto/criar-solicitacao.dto';
import { FiltrarSolicitacoesDto } from './dto/filtrar-solicitacoes.dto';
import { Solicitacao } from './solicitacao.entity';

@Injectable()
export class SolicitacoesService {
  constructor(
    @InjectRepository(Solicitacao)
    private readonly repository: Repository<Solicitacao>,
  ) {}

  listar(filtros: FiltrarSolicitacoesDto = {}) {
    return this.repository.find({
      where: {
        ...(filtros.status && { status: filtros.status }),
        ...(filtros.centroCusto && { centroCusto: filtros.centroCusto }),
        ...(filtros.prioridade && { prioridade: filtros.prioridade }),
      },
      order: { id: 'ASC' },
    });
  }

  async buscarPorId(id: number) {
    const solicitacao = await this.repository.findOneBy({ id });
    if (!solicitacao) {
      throw new NotFoundException('Solicitação não encontrada');
    }
    return solicitacao;
  }

  criar(dto: CriarSolicitacaoDto) {
    const solicitacao = this.repository.create({
      titulo: dto.titulo,
      centroCusto: dto.centroCusto,
      prioridade: dto.prioridade ?? 'normal',
      status: 'pendente',
    });
    return this.repository.save(solicitacao);
  }

  async aprovar(id: number) {
    const solicitacao = await this.buscarPorId(id);
    solicitacao.status = 'aprovada';
    return this.repository.save(solicitacao);
  }
}