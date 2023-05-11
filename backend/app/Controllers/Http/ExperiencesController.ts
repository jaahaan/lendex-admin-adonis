import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Experience from "App/Models/Experience";

export default class ExperiencesController {
  public async getExperience({}: HttpContextContract) {
    const data = Experience.all();
    return data;
  }

  public async addExperience({ request, response }: HttpContextContract) {
    // const req = await request.validate({
    //   schema: schema.create({
    //     title: schema.string(),
    //   }),
    //   messages: {
    //     "title.required": "Title field is required",
    //   },
    // });
    const data = request.body();
    const obj = new Experience();
    await obj.merge(data).save();
    return response.status(201);
  }
  public async getExperienceDetail({ params }: HttpContextContract) {
    const data = await Experience.findOrFail(params.id);
    return data;
  }

  public async updateExperience({ request, response }: HttpContextContract) {
    const req = request.body();
    const data = await Experience.findOrFail(req.id);
    await data.merge(req).save();
    return response.status(200);
  }
  public async deleteExperience({ params, response }: HttpContextContract) {
    await (await Experience.findOrFail(params.id)).delete();
    return response.status(200);
  }
}
