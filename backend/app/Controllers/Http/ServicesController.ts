import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Service from "App/Models/Service";

export default class ServicesController {
  public async getService({ request }: HttpContextContract) {
    const data = request.all();
    console.log(data);
    if (data.id == 0) {
      return await Service.query().andWhereNull("parent_id");
    } else {
      return await Service.query().where("parent_id", data.id);
    }
  }

  public async addService({ request, response }: HttpContextContract) {
    // const req = await request.validate({
    //   schema: schema.create({
    //     title: schema.string(),
    //   }),
    //   messages: {
    //     "title.required": "Title field is required",
    //   },
    // });
    const data = request.body();
    const obj = new Service();
    await obj.merge(data).save();
    return response.status(201);
  }
  public async getServiceDetail({ params }: HttpContextContract) {
    const data = await Service.findOrFail(params.id);
    return data;
  }

  public async updateService({ request, response }: HttpContextContract) {
    const req = request.body();
    const data = await Service.findOrFail(req.id);
    await data.merge(req).save();
    return response.status(200);
  }
  public async deleteService({ params, response }: HttpContextContract) {
    await (await Service.findOrFail(params.id)).delete();
    return response.status(200);
  }

  public async getParentService({ params, response }) {
    const service = await Service.query().where("id", params.id);
    console.log(service);
    console.log(service["parent_id"]);

    if (service["parent_id"]) {
      const data = Service.query().where("parent_id", service["parent_id"]);
      return response.json({ data: data, parent_id: service["parent_id"] });
    } else {
      const data = Service.query().andWhereNull("parent_id");
      return response.json({ data: data, parent_id: service["parent_id"] });
    }
  }
  public async getServiceD({}) {
    return await Service.query().andWhereNull("parent_id");
  }
  //   public async getParentService({params}: HttpContextContract){
  //     const data = await Service.findOrFail(params.id);
  //     if($Service->parent_id){
  //         $data = Service::where('parent_id',$Service->parent_id)->orderby('order_no','asc')->get();
  //         return response()->json([
  //              'data'=>$data,
  //             'parent_id'=>$Service->parent_id
  //         ]);
  //     }
  //     $data = Service::where('parent_id',null)->orderby('order_no','asc')->get();
  //     return response()->json([
  //        'data'=>$data,
  //        'parent_id'=>$Service->parent_id
  //    ]);
  // }
}
