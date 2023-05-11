import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Blog from "App/Models/Blog";

export default class BlogsController {
  public async getBlog({}: HttpContextContract) {
    const data = Blog.all();
    return data;
  }

  public async addBlog({ request, response }: HttpContextContract) {
    // const req = await request.validate({
    //   schema: schema.create({
    //     title: schema.string(),
    //   }),
    //   messages: {
    //     "title.required": "Title field is required",
    //   },
    // });
    const data = request.body();
    const obj = new Blog();
    await obj.merge(data).save();
    return response.status(201);
  }
  public async getBlogDetail({ params }: HttpContextContract) {
    const data = await Blog.findOrFail(params.id);
    return data;
  }

  public async updateBlog({ request, response }: HttpContextContract) {
    const req = request.body();
    const data = await Blog.findOrFail(req.id);
    await data.merge(req).save();
    return response.status(200);
  }
  public async deleteBlog({ params, response }: HttpContextContract) {
    const data = await (await Blog.findOrFail(params.id)).delete();
    return response.status(200);
  }
}
