<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem to="/education">Educations</BreadcrumbItem>
        <BreadcrumbItem>Edit Education</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="common-page-card">
      <Form label-position="top">
        <FormItem
          :error="errorMessages.institute"
          :required="true"
          label="Institute"
        >
          <Input v-model="formValue.institute" placeholder="Institute"></Input>
        </FormItem>
        <FormItem :error="errorMessages.degree" :required="true" label="Degree">
          <Input
            v-model="formValue.degree"
            placeholder="Ex: Bachelor's"
          ></Input>
        </FormItem>
        <FormItem label="Field of study">
          <Input
            v-model="formValue.field_of_study"
            placeholder="Field of study"
          ></Input>
        </FormItem>

        <div class="row">
          <div class="col-6">
            <FormItem
              :error="errorMessages.start_date"
              :required="true"
              label="Start Date"
            >
              <DatePicker
                type="month"
                v-model="formValue.start_date"
                placeholder="Start Date"
                class="d-block"
              ></DatePicker>
            </FormItem>
          </div>

          <div class="col-6">
            <FormItem label="End Date (or expected)">
              <DatePicker
                type="month"
                v-model="formValue.end_date"
                placeholder="End Date (or expected)"
                class="d-block"
              ></DatePicker>
            </FormItem>
          </div>
        </div>
        <!-- <FormItem label="Grade">
                    <Input
                        v-model="formValue.grade"
                        placeholder="Grade"
                    ></Input>
                </FormItem> -->
        <FormItem label="Description">
          <Input
            v-model="formValue.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="Write description..."
          ></Input>
        </FormItem>

        <div>
          <Button
            type="primary"
            :loading="loading"
            @click="update"
            style="margin-right: 10px"
          >
            <span v-if="!loading">Update</span>
            <span v-else>Please wait...</span>
          </Button>
          <Button @click="$router.push('/education')">Cancel</Button>
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
        institute: "",
        degree: "",
        field_of_study: "",
        start_date: "",
        end_date: "",
        description: "",
      },
      errorMessages: {
        institute: "",
        degree: "",
        start_date: "",
      },
    };
  },
  methods: {
    async update() {
      let validation = true;

      this.clearErrorMessages();

      if (this.formValue.institute.trim() == "") {
        this.errorMessages.institute = "Institute is required!";
        validation = false;
      }
      if (this.formValue.degree.trim() == "") {
        this.errorMessages.degree = "Degree is required!";
        validation = false;
      }
      if (this.formValue.start_date == "") {
        this.errorMessages.start_date = "Start Date is required!";
        validation = false;
      }
      if (validation == false) return this.$Message.error("Validation Fail!");

      this.loading = true;
      const res = await this.callApi(
        "put",
        "/app/update_education",
        this.formValue
      );
      if (res.status === 200 || res.status == 201) {
        this.loading = false;
        this.s("Updated successfully!");
        this.$router.push("/education");
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
        institute: "",
        degree: "",
        start_date: "",
      };
    },
    async getEducationDetail() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/get_education/${this.$route.params.id}`
      );
      if (response.status == 200) {
        this.formValue = response.data;
      } else this.swr();
      this.loading = false;
    },
  },
  async created() {
    await this.getEducationDetail();
  },
};
</script>
