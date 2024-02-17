import { IChatbotModel } from "./model/model.model";

export interface IChatbot {
  publicId: string;
  name: string;
  modelId: string;
  createdAt: string;
  updatedAt: string;
  model: IChatbotModel;
}
