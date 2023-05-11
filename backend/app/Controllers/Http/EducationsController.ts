import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Education from "App/Models/Education";

export default class EducationsController {
  public async getEducation({}: HttpContextContract) {
    // const data = Education.all();
    const data = await Education.query().orderBy("start_date", "desc");
    return data;
  }

  public async addEducation({ request, response }: HttpContextContract) {
    console.log("inside store");
    // const req = await request.validate({
    //   schema: schema.create({
    //     title: schema.string(),
    //   }),
    //   messages: {
    //     "title.required": "Title field is required",
    //   },
    // });
    const data = request.body();
    const obj = new Education();
    await obj.merge(data).save();
    return response.status(201);
  }
  public async getEducationDetail({ params }: HttpContextContract) {
    const data = await Education.findOrFail(params.id);
    return data;
  }

  public async updateEducation({ request, response }: HttpContextContract) {
    const req = request.body();
    const data = await Education.findOrFail(req.id);
    await data.merge(req).save();
    return response.status(200);
  }
  public async deleteEducation({ params, response }: HttpContextContract) {
    const data = await (await Education.findOrFail(params.id)).delete();
    return response.status(200);
  }
}
