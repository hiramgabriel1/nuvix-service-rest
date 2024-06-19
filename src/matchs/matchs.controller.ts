import { Controller } from '@nestjs/common';
import { MatchsService } from './matchs.service';

@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}
}
