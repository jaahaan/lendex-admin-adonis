import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Reminder from "App/Models/Reminder";

export default class RemindersController {
  public async index({ response }: HttpContextContract) {
    const data = await Reminder.all();
    return response.json({ data });
  }
  public async create({}: HttpContextContract) {}
  public async store({ request, response }: HttpContextContract) {
    console.log("inside store");
    const req = await request.validate({
      schema: schema.create({
        title: schema.string(),
      }),
      messages: {
        "title.required": "Title field is required",
      },
    });
    const data = request.body();
    const reminder = new Reminder();
    await reminder.merge(data).save();
    return response.status(200);
  }
  public async show({ response, params }: HttpContextContract) {
    const data = await Reminder.findOrFail(params.id);
    return response.json({ data });
  }
  public async edit({}: HttpContextContract) {}
  public async update({ request, response, params }: HttpContextContract) {
    const req = request.body();
    const data = await Reminder.findOrFail(params.id);
    await data.merge(req).save();
    return response.status(200);
  }
  public async destroy({ params, response }: HttpContextContract) {
    const user = await (await Reminder.findOrFail(params.id)).delete();
    return response.status(200);
  }
}
