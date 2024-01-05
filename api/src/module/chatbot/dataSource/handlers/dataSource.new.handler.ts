import { Injectable } from '@nestjs/common';
import { INewDataDTO } from '../dataSource.model';
import { DataSourceService } from '../dataSource.service';
import { ModelService } from '../../model/model.service';

@Injectable()
export class DataSourceCreateHandler {
  constructor(
    private readonly datasourceService: DataSourceService,
    private readonly modelService: ModelService,
  ) {}

  public async handle(publicModelId: string, dto: INewDataDTO) {
    const model = await this.modelService.findByPublicId(publicModelId);
    return this.datasourceService.create({
      ...dto,
      modelId: model.id,
    });
  }
}
