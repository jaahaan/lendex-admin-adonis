/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  Route.get("/app/getUser", "HomeController.getUser");
  Route.post("/app/updateInfo", "HomeController.updateInfo");

  //Attachment
  Route.post("/upload_attachment", "HomeController.uploadAttachment");
  Route.post("/delete_attachment", "HomeController.deleteAttachment");
  //image
  Route.post("/app/delete_image", "HomeController.deleteImage");
  Route.post("/app/upload", "HomeController.upload");

  //Education
  Route.get("/app/get_education", "EducationsController.getEducation");
  Route.post("/app/add_education", "EducationsController.addEducation");
  Route.put("/app/update_education", "EducationsController.updateEducation");
  Route.delete(
    "/app/delete_education/:id",
    "EducationsController.deleteEducation"
  );
  Route.get(
    "/app/get_education/:id",
    "EducationsController.getEducationDetail"
  );

  //Experience
  Route.get("/app/get_experience", "ExperiencesController.getExperience");
  Route.post("/app/add_experience", "ExperiencesController.addExperience");
  Route.put("/app/update_experience", "ExperiencesController.updateExperience");
  Route.delete(
    "/app/delete_experience/:id",
    "ExperiencesController.deleteExperience"
  );
  Route.get(
    "/app/get_experience/:id",
    "ExperiencesController.getExperienceDetail"
  );

  //Experience
  Route.get(
    "/app/get_satisfied_clients",
    "SatisfiedClientsController.getSatisfiedClient"
  );
  Route.post(
    "/app/add_satisfied_clients",
    "SatisfiedClientsController.addSatisfiedClient"
  );
  Route.put(
    "/app/update_satisfied_clients",
    "SatisfiedClientsController.updateSatisfiedClient"
  );
  Route.delete(
    "/app/delete_satisfied_clients/:id",
    "SatisfiedClientsController.deleteSatisfiedClient"
  );
  Route.get(
    "/app/get_satisfied_clients/:id",
    "SatisfiedClientsController.getSatisfiedClientDetail"
  );

  //Count
  Route.get("/app/get_count", "CountsController.getCount");
  Route.post("/app/add_count", "CountsController.addCount");
  Route.put("/app/update_count", "CountsController.updateCount");
  Route.delete("/app/delete_count/:id", "CountsController.deleteCount");
  Route.get("/app/get_count/:id", "CountsController.getCountDetail");

  //Project
  Route.get("/app/get_project", "ProjectsController.getProject");
  Route.post("/app/add_project", "ProjectsController.addProject");
  Route.put("/app/update_project", "ProjectsController.updateProject");
  Route.delete("/app/delete_project/:id", "ProjectsController.deleteProject");
  Route.get("/app/get_project/:id", "ProjectsController.getProjectDetail");

  //Special Skills
  Route.get("/app/get_skills", "SpecialSkillsController.getSkills");
  Route.post("/app/add_skill", "SpecialSkillsController.addSkill");
  Route.put("/app/update_skill", "SpecialSkillsController.updateSkill");
  Route.delete("/app/delete_skill/:id", "SpecialSkillsController.deleteSkill");
  Route.get("/app/get_skill/:id", "SpecialSkillsController.getSkillDetail");
  Route.put(
    "/app/resetSkillPosition",
    "SpecialSkillsController.resetSkillPosition"
  );

  //Service
  Route.get("/app/get_service", "ServicesController.getService");
  Route.post("/app/add_service", "ServicesController.addService");
  Route.put("/app/update_service", "ServicesController.updateService");
  Route.delete("/app/delete_service/:id", "ServicesController.deleteService");
  Route.get(
    "/app/get_service_details/:id",
    "ServicesController.getServiceDetail"
  );
  Route.get("/app/parentService/:id", "ServicesController.getParentService");
  Route.put(
    "/app/resetServicePosition",
    "ServicesController.resetServicePosition"
  );
  Route.get("/app/getServiceTitle", "ServicesController.getServiceD");

  //ServicePlaning
  Route.get(
    "/app/get_service_planning",
    "ServicePlaningsController.getServicePlaning"
  );
  Route.post(
    "/app/add_service_planning",
    "ServicePlaningsController.addServicePlaning"
  );
  Route.put(
    "/app/update_service_planning",
    "ServicePlaningsController.updateServicePlaning"
  );
  Route.delete(
    "/app/delete_service_planning/:id",
    "ServicePlaningsController.deleteServicePlaning"
  );
  Route.get(
    "/app/get_service_planning/:id",
    "ServicePlaningsController.getServicePlaningDetail"
  );

  //Blog
  Route.get("/app/get_blog", "BlogsController.getBlog");
  Route.post("/app/add_blog", "BlogsController.addBlog");
  Route.put("/app/update_blog", "BlogsController.updateBlog");
  Route.delete("/app/delete_blog/:id", "BlogsController.deleteBlog");
  Route.get("/app/get_blog/:id", "BlogsController.getBlogDetail");

  //TrustedCompany
  Route.get(
    "/app/get_trusted_company",
    "TrustedCompaniesController.getTrustedCompany"
  );
  Route.post(
    "/app/add_trusted_company",
    "TrustedCompaniesController.addTrustedCompany"
  );
  Route.put(
    "/app/update_trusted_company",
    "TrustedCompaniesController.updateTrustedCompany"
  );
  Route.delete(
    "/app/delete_trusted_company/:id",
    "TrustedCompaniesController.deleteTrustedCompany"
  );
  Route.get(
    "/app/get_trusted_company/:id",
    "TrustedCompaniesController.getTrustedCompanyDetail"
  );

  //ContactMe
  Route.get("/app/get_contact_me", "ContactMesController.getContactMe");
  Route.post("/app/add_contact_me", "ContactMesController.addContactMe");
  Route.delete(
    "/app/delete_contact_me/:id",
    "ContactMesController.deleteContactMe"
  );
});

Route.post("/register", "AuthController.register");
Route.post("/login", "AuthController.login");
Route.get("/auth_user", "AuthController.authUser").middleware("auth");
// Route.on("/").render("/index").middleware("auth");

//   //authenticate() example
//   Route.get('/dashboard', async ({ auth }:HttpContextContract) => {
//     await auth.use("jwt").authenticate();
//     const userModel = auth.use("jwt").user!;
//     const userPayloadFromJwt = auth.use("jwt").payload!;
// });

// //refresh token usage example:
// Route.post('/refresh', async ({ auth, request }:HttpContextContract) => {
//     const refreshToken = request.input("refresh_token");
//     const jwt = await auth.use("jwt").loginViaRefreshToken(refreshToken);
// });

// Route.post('/logout', async ({ auth, response }:HttpContextContract) => {
//   await auth.use('jwt').revoke()
//   return {
//     revoked: true
//   }
// })
