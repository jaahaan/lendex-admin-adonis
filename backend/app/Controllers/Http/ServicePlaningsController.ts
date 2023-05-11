import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import ServicePlaning from "App/Models/ServicePlaning";

export default class ServicePlaningsController {
  public async getServicePlaning({}: HttpContextContract) {
    const data = ServicePlaning.query().orderBy("id", "desc");
    return data;
  }

  public async addServicePlaning({ request, response }: HttpContextContract) {
    // const req = await request.validate({
    //   schema: schema.create({
    //     title: schema.string(),
    //   }),
    //   messages: {
    //     "title.required": "Title field is required",
    //   },
    // });
    const data = request.body();
    const obj = new ServicePlaning();
    await obj.merge(data).save();
    return response.status(201);
  }
  public async getServicePlaningDetail({ params }: HttpContextContract) {
    const data = await ServicePlaning.findOrFail(params.id);
    return data;
  }

  public async updateServicePlaning({
    request,
    response,
  }: HttpContextContract) {
    const req = request.body();
    const data = await ServicePlaning.findOrFail(req.id);
    await data.merge(req).save();
    return response.status(200);
  }
  public async deleteServicePlaning({ params, response }: HttpContextContract) {
    await (await ServicePlaning.findOrFail(params.id)).delete();
    return response.status(200);
  }
}
