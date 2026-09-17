import { IsInt, MaxLength, MinLength, IsString, Min } from 'class-validator';

export class RejeitarSolicitacaoDto {
  @IsInt()
  @Min(1)
  versao!: number;

  @IsString()
  @MinLength(10)
  @MaxLength(200)
  justificativa!: string;
}