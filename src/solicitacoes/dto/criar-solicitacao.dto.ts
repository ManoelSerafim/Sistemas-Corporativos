import { IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CriarSolicitacaoDto {
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  titulo: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  centroCusto: string;

  @IsOptional()
  @IsIn(['normal', 'urgente'])
  prioridade?: 'normal' | 'urgente';
}