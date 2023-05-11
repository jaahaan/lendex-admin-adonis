import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SatisfiedClient from 'App/Models/SatisfiedClient';

export default class SatisfiedClientsController {
    public async getSatisfiedClient({}: HttpContextContract) {
      const data = SatisfiedClient.all();
      return data;
    }
  
    public async addSatisfiedClient({ request, response }: HttpContextContract) {
      // const req = await request.validate({
      //   schema: schema.create({
      //     title: schema.string(),
      //   }),
      //   messages: {
      //     "title.required": "Title field is required",
      //   },
      // });
      const data = request.body();
      const obj = new SatisfiedClient();
      await obj.merge(data).save();
      return response.status(201);
    }
    public async getSatisfiedClientDetail({ params }: HttpContextContract) {
      const data = await SatisfiedClient.findOrFail(params.id);
      return data;
    }
  
    public async updateSatisfiedClient({ request, response }: HttpContextContract) {
      const req = request.body();
      const data = await SatisfiedClient.findOrFail(req.id);
      await data.merge(req).save();
      return response.status(200);
    }
    public async deleteSatisfiedClient({ params, response }: HttpContextContract) {
      await (await SatisfiedClient.findOrFail(params.id)).delete();
      return response.status(200);
    }
  }
  