<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem to="/service_planning">Service Planning</BreadcrumbItem>
        <BreadcrumbItem>Edit Service Planning</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="common-page-card">
      <Form label-position="top">
        <Row :gutter="24">
          <Col span="12">
            <FormItem
              label="Service"
              :error="errorMessages.service_id"
              :required="true"
            >
              <Select
                v-model="formValue.service_id"
                placeholder="Select Service"
                filterable
                clearable
                @on-change="changeParentMenu"
              >
                <Option
                  v-for="(item, i) in parentMenu"
                  :value="item.id"
                  :key="i"
                  >{{ item.title }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :error="errorMessages.type" :required="true" label="Type">
              <!-- <Input type="text" placeholder="Type"  v-model="formValue.type"></Input> -->
              <Select v-model="formValue.type" placeholder="Type">
                <Option value="basic">Basic</Option>
                <Option value="standard">Standard</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
              :error="errorMessages.price"
              :required="true"
              label="Price per month"
            >
              <Input v-model="formValue.price"></Input>
            </FormItem>
          </Col>

          <Col span="24">
            <FormItem label="facilities">
              <Input
                v-model="formValue.facilities"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Write facilities..."
              ></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <Button
              type="primary"
              :loading="loading"
              @click="save"
              style="margin-right: 10px"
            >
              <span v-if="!loading">Add</span>
              <span v-else>Please wait...</span>
            </Button>
            <Button @click="$router.push('/service_planning')">Cancel</Button>
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
      parentMenu: [],
      formValue: {
        id: 0,
        type: "",
        service_id: "",
        price: "",
        facilities: "",
      },
      errorMessages: {
        type: "",
        service_id: "",
        price: "",
      },
    };
  },
  methods: {
    async save() {
      let validation = true;

      this.clearErrorMessages();
      if (this.formValue.service_id == "") {
        this.errorMessages.service_id = "Service Title is required!";
        validation = false;
      }

      if (this.formValue.type.trim() == "") {
        this.errorMessages.type = "type is required!";
        validation = false;
      }
      if (this.formValue.price == "") {
        this.errorMessages.price = "Price is required!";
        validation = false;
      }
      if (validation == false) return this.$Message.error("Validation Fail!");

      this.loading = true;
      const res = await this.callApi(
        "put",
        "/app/update_service_planning",
        this.formValue
      );
      if (res.status === 200 || res.status == 201) {
        this.loading = false;
        this.s("Updated successfully!");
        this.$router.push("/service_planning");
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
        type: "",
        service_id: "",
        price: "",
      };
    },
    async getDetail() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/get_service_planning/${this.$route.params.id}`
      );
      if (response.status == 200) {
        this.formValue = response.data;
      } else this.swr();
      this.loading = false;
    },
    async changeParentMenu(query) {
      const response = await this.callApi("get", `/app/getServiceTitle`);
      if (response.status == 200) {
        this.parentMenu = response.data;
      } else this.swr();
    },
  },
  async created() {
    await this.getDetail();
    await this.changeParentMenu();
  },
};
</script>
