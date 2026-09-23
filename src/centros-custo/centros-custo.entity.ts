import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ name: 'centrosCusto' })
export class CentrosCusto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  codigo!: string;

  @Column({ type: 'varchar', length: 150 })
  nome!: string;

  @Column({ name: 'exemplo_despesas', type: 'varchar', length: 150 })
  exemploDespesas!: string;

  @Column({name: 'saldo', type: 'numeric', default: 0 })
  saldo!: number;

  @VersionColumn({ name: 'versao' })
  versao!: number;

  @CreateDateColumn({ name: 'criada_em', type: 'timestamptz' })
  criadaEm!: Date;

  @UpdateDateColumn({ name: 'atualizada_em', type: 'timestamptz' })
  atualizadaEm!: Date;
}