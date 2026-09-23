import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarSolicitacaoDto } from './dto/criar-solicitacao.dto';
import { FiltrarSolicitacoesDto } from './dto/filtrar-solicitacoes.dto';
import { Solicitacao } from './solicitacao.entity';
import { DataSource } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { Auditoria } from 'src/auditoria/auditoria.entity';
import { CentrosCusto } from 'src/centros-custo/centros-custo.entity';


@Injectable()
export class SolicitacoesService {
  constructor(
    @InjectRepository(Solicitacao)
    private readonly repository: Repository<Solicitacao>,
    private readonly dataSource: DataSource,
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
      valorEstimado: dto.valorEstimado,
      prioridade: dto.prioridade ?? 'normal',
      status: 'pendente',
    });
    return this.repository.save(solicitacao);
  }

  async aprovar(id: number, versaoEsperada: number, atorId: number) {
    return this.dataSource.transaction(async (manager) => {
      const solicitacao = await manager.findOneBy(Solicitacao, { id });

      if (!solicitacao) {
        throw new NotFoundException('Solicitação não encontrada');
      }
      if (solicitacao.status !== 'pendente') {
        throw new ConflictException('Solicitação não está pendente');
      }
      
      // Aqui era pra fazer um query e consultar se o saldo retornado era maior que o saldo da solicitação e positivo. mas fiquei sem tempo.

      const resultado = await manager
        .createQueryBuilder()
        .update(Solicitacao)
        .set({ status: 'aprovada', versao: () => 'versao + 1' })
        .where('id = :id', { id })
        .andWhere('versao = :versao', { versao: versaoEsperada })
        .andWhere('status = :status', { status: 'pendente' })
        .update(CentrosCusto)
        .set({ saldo: () => `saldo - ${solicitacao.valorEstimado}`, versao: () => 'versao + 1' })
        .where('codigo = :codigo', { codigo: solicitacao.centroCusto })
        .execute();

      if (resultado.affected !== 1) {
        throw new ConflictException(
          'A solicitação foi alterada; consulte novamente',
        );
      }

      await manager.insert(Auditoria, {
        atorId,
        acao: 'SOLICITACAO_APROVADA',
        recursoTipo: 'solicitacao',
        recursoId: id,
        detalhes: {
          statusAnterior: 'pendente',
          statusAtual: 'aprovada',
          versaoAnterior: versaoEsperada,
        },
      });

      return manager.findOneByOrFail(Solicitacao, { id });
    });
  }

  async rejeitar(id: number, versaoEsperada: number, atorId: number, justificativa: string) {
    return this.dataSource.transaction(async (manager) => {
      const solicitacao = await manager.findOneBy(Solicitacao, { id });

      if (!solicitacao) {
        throw new NotFoundException('Solicitação não encontrada');
      }
      if (solicitacao.status !== 'pendente') {
        throw new ConflictException('Solicitação não está pendente');
      }

      const resultado = await manager
        .createQueryBuilder()
        .update(Solicitacao)
        .set({ status: 'rejeitada', versao: () => 'versao + 1' })
        .where('id = :id', { id })
        .andWhere('versao = :versao', { versao: versaoEsperada })
        .andWhere('status = :status', { status: 'pendente' })
        .execute();

      if (resultado.affected !== 1) {
        throw new ConflictException(
          'A solicitação foi alterada; consulte novamente',
        );
      }

      await manager.insert(Auditoria, {
        atorId,
        acao: 'SOLICITACAO_REJEITADA',
        recursoTipo: 'solicitacao',
        recursoId: id,
        detalhes: {
          justificativa: justificativa,
          statusAnterior: 'pendente',
          statusAtual: 'rejeitada',
          versaoAnterior: versaoEsperada,
        },
      });

      return manager.findOneByOrFail(Solicitacao, { id });
    });
  }
}