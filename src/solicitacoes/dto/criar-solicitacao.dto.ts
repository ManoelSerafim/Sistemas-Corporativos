import { IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CriarSolicitacaoDto {
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  titulo!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  centroCusto!: string;

  @IsIn([0, 1000000])
  valorEstimado!: number;

  @IsOptional()
  @IsIn(['normal', 'urgente'])
  prioridade?: 'normal' | 'urgente';
}