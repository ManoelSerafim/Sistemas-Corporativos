import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CentrosCustoService } from './centros-custo.service';

@Controller('centros-custo')
export class CentrosCustoController {
  constructor(private readonly centrosCustoService: CentrosCustoService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':codigo')
  buscarPorId(@Param('codigo') codigo: string) {
    return this.centrosCustoService.buscarPorCodigo(codigo);
  }

}