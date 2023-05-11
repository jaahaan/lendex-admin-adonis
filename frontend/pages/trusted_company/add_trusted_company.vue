<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem to="/trusted_company">Trusted Companies</BreadcrumbItem>
        <BreadcrumbItem>Add Trusted Company</BreadcrumbItem>
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
                :headers="crfObj"
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
            <FormItem label="Name">
              <Input
                type="text"
                placeholder="Name"
                v-model="formValue.name"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Icon">
              <Input
                type="text"
                placeholder="Icon"
                v-model="formValue.icon"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Moto">
              <Input
                type="text"
                placeholder="Moto"
                v-model="formValue.moto"
              ></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <Button type="primary" @click="$router.push('/trusted_company')"
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
        image: "",
        name: "",
        icon: "",
        moto: "",
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
      this.loading = true;
      const res = await this.callApi(
        "post",
        "/app/add_trusted_company",
        this.formValue
      );
      if (res.status === 201) {
        this.loading = false;
        this.s("Added successfully!");
        this.$router.push("/trusted_company");
      } else if (this.status == 422) {
        for (let x in response.data) {
          this.e(response.data[x]);
        }
      } else {
        this.loading = false;
        this.swr();
      }
    },
  },

  async created() {},
};
</script>
