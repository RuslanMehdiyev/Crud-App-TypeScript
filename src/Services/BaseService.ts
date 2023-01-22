import { ResponseModel } from "./../Models/core/ResponseModel";
import { northWindInstance } from "./network/northWindInstance";
export class BaseService<T> {
  private endPoint = "";

  constructor(url: string) {
    this.endPoint = url;
  }

  async getAll(url: string = this.endPoint): Promise<ResponseModel> {
    try {
      let apiResponse = await northWindInstance.get(url);
      let response: ResponseModel = {
        data: apiResponse.data,
        status: true,
        statusCode: apiResponse.status,
        errorMessage: "",
      };
      return response;
    } catch (error: any) {
      let response: ResponseModel = {
        data: {},
        status: false,
        statusCode: error.response.status,
        errorMessage: error.message,
      };
      return response;
    }
  }

  async add(data: T, url: string = this.endPoint): Promise<void> {
    await northWindInstance.post(url, data);
  }

  async delete(url: string = this.endPoint): Promise<void> {
    await northWindInstance.delete(url);
  }
  async update(data: T,url: string = this.endPoint): Promise<void> {
    await northWindInstance.put(url,data);
  }
}
