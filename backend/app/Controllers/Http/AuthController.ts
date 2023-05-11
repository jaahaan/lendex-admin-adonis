import Hash from "@ioc:Adonis/Core/Hash";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        name: schema.string(),
        username: schema.string(),
        email: schema.string({}, [rules.email()]),
        password: schema.string([rules.minLength(8), rules.confirmed()]),
      }),
      messages: {
        "name.required": "Name field is required",
        "email.required": "Email field is required",
        "password.required": "Password field is required",
        "password.minLength": "Password must be at least 8 characters",
      },
    });

    const user = new User();
    user.name = req.name;
    user.username = req.username;
    user.email = req.email;
    user.password = req.password;
    await user.save();

    return response.status(200);
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.minLength(8)]),
      }),
      messages: {
        "email.required": "Email field is required",
        "password.required": "Password field is required",
        "password.minLength": "Password must be at least 8 characters",
      },
    });

    // try {
    //   const { email, password } = request.all();
    //   const token = await auth.attempt(email, password);
    //   return token;
    // } catch {
    //   return response.unauthorized("Invalid credentials");
    // }
    // Lookup user manually
    const user = await User.findBy("email", req.email);
    // Verify password
    if (user) {
      if (!(await Hash.verify(user.password, req.password))) {
        return response.unauthorized("Invalid credentials");
      }
      const { email, password } = request.all();
      const token = await auth.attempt(email, password);
      // const jwt = await auth.use("jwt").generate(user);

      return token;
      //   return response.status(200).json({ token: token, user: user });
    }

    // Generate token
  }

  public async authUser({ auth, response }: HttpContextContract) {
    try {
      //const user = await this.auth.user
      const user = await auth.user; // this.auth.user will give you anything you want
      if (user) {
        const a = await User.findBy("email", user.email);
        console.log(user);
        return a;
      }
    } catch (error) {
      response.send("Missing or invalid api token");
    }
  }
}
