<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem
          to="/special-skills

"
          >Special Skills</BreadcrumbItem
        >
        <BreadcrumbItem>Add Special Skills</BreadcrumbItem>
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
            @click="save"
            style="margin-right: 10px"
          >
            <span v-if="!loading">Save</span>
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
      formValue: {
        title: "",
        percentage: "",
      },
      errorMessages: {
        communication: "",
        percentage: "",
      },
    };
  },
  methods: {
    async save() {
      let validation = true;

      this.clearErrorMessages();

      if (this.formValue.title.trim() == "") {
        this.errorMessages.title = "Title is required!";
        validation = false;
      }
      if (this.formValue.percentage.trim() == "") {
        this.errorMessages.percentage = "Percentage is required!";
        validation = false;
      }
      if (validation == false) return this.$Message.error("Validation Fail!");

      this.loading = true;
      const res = await this.callApi("post", "/app/add_skill", this.formValue);
      if (res.status === 201) {
        this.loading = false;
        this.s("Added successfully!");
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
        percentage: "",
      };
    },
  },

  async created() {},
};
</script>
