import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class FiltrarSolicitacoesDto {
  @IsOptional()
  @IsIn(['pendente', 'aprovada'])
  status?: 'pendente' | 'aprovada';

  @IsOptional()
  @IsString()
  @MaxLength(30)
  centroCusto?: string;

  @IsOptional()
  @IsIn(['normal', 'urgente'])
  prioridade?: 'normal' | 'urgente';
}