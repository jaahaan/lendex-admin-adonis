<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem to="/projects">Projects</BreadcrumbItem>
        <BreadcrumbItem>Edit Project</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="common-page-card">
      <Form>
        <Row :gutter="24">
          <Col span="24">
            <div class="demo-upload-list" v-if="formValue.image">
              <img :src="`${http + formValue.image}`" />
              <div class="demo-upload-list-cover">
                <Icon
                  type="ios-trash-outline"
                  @click.native="handleRemove"
                ></Icon>
              </div>
            </div>

            <div class="mt-3 mb-3" v-else-if="!formValue.image">
              <Upload
                ref="formValueUploads"
                type="drag"
                :on-success="handleSuccess"
                :format="['jpg', 'jpeg', 'png']"
                :max-size="20048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                action="http://127.0.0.1:3333/app/upload"
              >
                <div class="camera-icon">
                  <Icon type="ios-camera" size="20"></Icon>
                  Upload Image
                </div>
              </Upload>
            </div>
          </Col>
          <Col span="12">
            <FormItem
              label="Title"
              :error="errorMessages.title"
              :required="true"
            >
              <Input
                type="text"
                placeholder="Title"
                v-model="formValue.title"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
              label="Subtitle"
              :error="errorMessages.subtitle"
              :required="true"
            >
              <Input
                type="text"
                placeholder="Subtitle"
                v-model="formValue.subtitle"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
              label="Project Name"
              :error="errorMessages.project_name"
              :required="true"
            >
              <Input
                type="text"
                placeholder="Project Name"
                v-model="formValue.project_name"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Clients">
              <Input
                type="text"
                placeholder="clients"
                v-model="formValue.clients"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="How To Complete">
              <Input
                v-model="formValue.how_to_complete"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Write How To Complete..."
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Idea Generate">
              <Input
                v-model="formValue.idea_generate"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Write Idea Generate..."
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Reasearch Sketching">
              <Input
                v-model="formValue.reasearch_sketching"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Write Reasearch Sketching..."
              ></Input>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem label="Launced Project">
              <Input
                v-model="formValue.launced_project"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Write Launced Project..."
              ></Input>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem label="Result Summery">
              <Input
                v-model="formValue.result_summery"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Write Result Summery..."
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Description">
              <Input
                v-model="formValue.description"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Write Description..."
              ></Input>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem label="Budget">
              <Input
                type="text"
                placeholder="Budget"
                v-model="formValue.budget"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Duration">
              <Input
                type="text"
                placeholder="Duration"
                v-model="formValue.duration"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Date">
              <DatePicker
                type="date"
                v-model="formValue.date"
                placeholder="Date"
                class="d-block"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="24">
            <Button type="primary" @click="$router.push('/projects')"
              >Cancel</Button
            ><Button type="primary" @click="save">Save</Button>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      sending: false,
      formValue: {
        id: 0,
        image: "",
        title: "",
        subtitle: "",
        how_to_complete: "",
        idea_generate: "",
        reasearch_sketching: "",
        launced_project: "",
        result_summery: "",
        description: "",
        project_name: "",
        clients: "",
        budget: "",
        duration: "",
        date: "",
      },
      errorMessages: {
        title: "",
        subtitle: "",
        project_name: "",
      },
      http: "http://127.0.0.1:3333/uploads/",
    };
  },
  methods: {
    handleSuccess(res, file) {
      res = `${res}`;
      this.formValue.image = res;
    },
    handleError(res, file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc: `${
          file.errors.file.length
            ? file.errors.file[0]
            : "Something went wrong!"
        }`,
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png.",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M.",
      });
    },
    async handleRemove() {
      let name;
      name = this.formValue.image;
      this.formValue.image = "";

      const res = await this.callApi("post", "/app/delete_image", {
        imageName: name,
      });
    },
    async save() {
      let validation = true;

      this.clearErrorMessages();

      if (this.formValue.title.trim() == "") {
        this.errorMessages.title = "Title is required!";
        validation = false;
      }
      if (this.formValue.subtitle.trim() == "") {
        this.errorMessages.subtitle = "Subtitle is required!";
        validation = false;
      }
      if (this.formValue.project_name.trim() == "") {
        this.errorMessages.project_name = "Project Name is required!";
        validation = false;
      }
      if (validation == false) return this.$Message.error("Validation Fail!");

      this.loading = true;
      const res = await this.callApi(
        "put",
        "/app/update_project",
        this.formValue
      );
      if (res.status === 200 || res.status == 201) {
        this.loading = false;
        this.s("Updated successfully!");
        this.$router.push("/projects");
      } else if (this.status == 422) {
        for (let x in response.data) {
          this.e(response.data[x]);
        }
      } else {
        this.loading = false;
        this.swr();
      }
    },
    clearErrorMessages() {
      this.errorMessages = {
        title: "",
        icon: "",
      };
    },
    async getDetail() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/get_project/${this.$route.params.id}`
      );
      if (response.status == 200) {
        this.formValue = response.data;
      } else this.swr();
      this.loading = false;
    },
  },
  async created() {
    await this.getDetail();
  },
};
</script>
