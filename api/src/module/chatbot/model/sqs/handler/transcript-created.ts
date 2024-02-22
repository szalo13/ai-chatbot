import { Injectable } from '@nestjs/common';
import { IModelSQSEvent, ModelSQSHandler } from './base';
import { DataSourceService } from '../../dataSource/dataSource.service';
import { ModelGateway } from '../../../model.gateway';
import { ModelService } from '../../model.service';

interface IEventBody {
  path: string;
  dataSourceId: string;
}

@Injectable()
export class ModelDatasourceTranscriptCreatedSQSHandler extends ModelSQSHandler {
  constructor(
    private readonly datasourceService: DataSourceService,
    private readonly modelService: ModelService,
    private readonly modelGateway: ModelGateway,
  ) {
    super();
  }

  public async handle(data: IModelSQSEvent<IEventBody>): Promise<void> {
    if (data.success) {
      const datasource = await this.datasourceService.updateByPublicId(
        data.body.dataSourceId,
        {
          transcriptCreated: true,
        },
      );
      const model = await this.modelService.findById(datasource.modelId);
      this.modelGateway.notifyDataSourceUpdated(model.publicId, datasource);
    }
  }
}
