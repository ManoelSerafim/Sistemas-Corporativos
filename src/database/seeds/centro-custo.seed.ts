import 'dotenv/config';
import dataSource from '../data-source';
import { CentrosCusto } from '../../centros-custo/centros-custo.entity';

const dados = [
  {
    codigo: 'CC-0009',
    nome: 'Desenvolvimento de Sistemas',
    exemploDespesas: 'Compra de computadores, monitores e periféricos',
    saldo: 5000.00,
  },
];

async function executar() {
  await dataSource.initialize();
  const repository = dataSource.getRepository(CentrosCusto);

  for (const item of dados) {
    const existente = await repository.findOneBy({ codigo: item.codigo });

    if (!existente) {
      await repository.save(
        repository.create({
          ...item,
        }),
      );
    }
  }

  await dataSource.destroy();
}

executar().catch(async (erro) => {
  console.error(erro);

  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }

  process.exitCode = 1;
});