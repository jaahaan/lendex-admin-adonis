<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem to="/special-skills">Special Skills</BreadcrumbItem>
        <BreadcrumbItem>Edit Special Skills</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="common-page-card">
      <Form>
        <div class="mb-3">
          <FormItem :error="errorMessages.title" :required="true" label="Title">
            <Input
              type="text"
              placeholder="Title"
              v-model="formValue.title"
            ></Input>
          </FormItem>
        </div>
        <div class="mb-3">
          <FormItem
            :error="errorMessages.percentage"
            :required="true"
            label="Percentage"
          >
            <Input
              type="number"
              placeholder="Percentage"
              v-model="formValue.percentage"
            ></Input>
          </FormItem>
        </div>

        <div class="mb-3">
          <Button
            type="primary"
            :loading="loading"
            @click="update"
            style="margin-right: 10px"
          >
            <span v-if="!loading">Update</span>
            <span v-else>Please wait...</span>
          </Button>
          <Button @click="$router.push('/special-skills')">Cancel</Button>
        </div>
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
      parentMenu: [],
      formValue: {
        id: 0,
        parent_id: null,
        title: "",
        icon: "",
      },
      errorMessages: {
        title: "",
      },
    };
  },
  methods: {
    async update() {
      let validation = true;

      this.clearErrorMessages();

      if (this.formValue.title.trim() == "") {
        this.errorMessages.title = "Title is required!";
        validation = false;
      }

      if (validation == false) return this.$Message.error("Validation Fail!");

      this.loading = true;
      const res = await this.callApi(
        "put",
        "/app/update_skill",
        this.formValue
      );
      if (res.status === 200 || res.status == 201) {
        this.loading = false;
        this.s("Updated successfully!");
        this.$router.push("/special-skills");
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
        `/app/get_skill/${this.$route.params.id}`
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
