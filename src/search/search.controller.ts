import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/data')
  findDataSearch(@Query('data') data: string) {
    if (!data) throw new BadRequestException('Proporciona un query');
    return this.searchService.searchData(data);
  }
}
