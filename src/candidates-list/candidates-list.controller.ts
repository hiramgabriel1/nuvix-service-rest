import { Controller } from '@nestjs/common';
import { CandidatesListService } from './candidates-list.service';

@Controller('candidates-list')
export class CandidatesListController {
  constructor(private readonly candidatesListService: CandidatesListService) {}
}
