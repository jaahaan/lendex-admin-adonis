<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem>Routers</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="common-page-card">
      <Row>
        <Col span="24">
          <Form ref="formInline" inline>
            <FormItem>
              <Input
                type="text"
                v-model="search"
                placeholder="Search Route..."
                @on-keyup="getSearchCustomer"
                ><Icon type="ios-search" slot="prepend"></Icon
              ></Input>
            </FormItem>
            <!-- <FormItem>
                            <Select v-model="type" style="width:200px" @on-change="onSortChange">
                                <Option v-for="(item,index) in sortableList" :value="item" :key="index">{{ item.toUpperCase() }}</Option>
                            </Select>
                        </FormItem> -->

            <FormItem>
              <Button type="primary" @click="$router.push('/add_router')"
                >Add Router</Button
              >
            </FormItem>
            <!-- <FormItem>
                            <Button type="primary" v-if="type=='submenu'" @click="resetRoutePosition" >Reset Router</Button>
                        </FormItem> -->
          </Form>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24" class="body">
          <Button
            type="warning"
            v-if="childRouteId > 0"
            size="small"
            @click="returnBack"
            ghost
          >
            << back</Button
          >
          <ul>
            <li class="li tr">
              <p>No.</p>
              <p>Type</p>
              <p>Title</p>
              <p>Details</p>
              <p>Action</p>
            </li>
            <draggable
              v-if="type == 'submenu'"
              :list="data1"
              @change="log"
              :disabled="!enabled"
              class="list-group"
              ghost-class="ghost"
              @start="dragging = true"
              @end="dragging = false"
            >
              <li class="li active" v-for="(data, index) in data1">
                <p>{{ index + 1 }}</p>
                <p>{{ data.type }}</p>
                <p>{{ data.title }}</p>
                <p>
                  <Button
                    type="warning"
                    size="small"
                    ghost
                    @click="showDetails(index)"
                    >Details</Button
                  >
                  <Button
                    type="warning"
                    v-if="data.type == 'submenu'"
                    size="small"
                    ghost
                    @click="showRoute(index)"
                    >Routes</Button
                  >
                </p>
                <!-- <p></p> -->
                <p>
                  <Button
                    type="warning"
                    size="small"
                    ghost
                    @click="showEdit(index)"
                    >Edit</Button
                  >
                  <Button
                    type="error"
                    size="small"
                    ghost
                    @click="showRemove(index)"
                    >Remove</Button
                  >
                </p>
              </li>
            </draggable>
            <!-- <li v-if="type!='submenu'" class="li" v-for="(data,index) in data1">
                            <p>{{index + 1}}</p> <p>{{data.type}}</p>  <p>{{data.title}}</p>
                             <p>
                                <Button  type="warning"  size="small" ghost @click="showDetails(index)">Details</Button>
                             </p>
                            <p>
                                <Button  type="warning"  size="small" ghost @click="showEdit(index)">Edit</Button>
                                <Button type="error" size="small" ghost @click="showRemove(index)">Remove</Button>
                            </p>
                        </li> -->
            <li class="li" v-if="data1.length == 0"><h2>Loading...</h2></li>
          </ul>

          <!-- <Table border :loading="loading" :columns="columns1"  :data="data1" :no-data-text="'no data found'">
                        <template  slot-scope="{ index }" slot="details">
                            <Button  type="warning"  size="small" ghost @click="showDetails(index)">Show Details</Button>
                        </template>
                        <template  slot-scope="{ index }" slot="action">
                            <Button  type="warning"  size="small" ghost @click="showEdit(index)">Edit</Button>
                            <Button  type="error"  size="small" ghost @click="showRemove(index)">Remove</Button>
                        </template>
                        <template slot="loading">
                                <h4  class="table-loading"><i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i><span style="margin-left: 10px;">Loading Data...</span></h4>
                        </template>
                    </Table>
                    <Page  :current="parseInt(pagination.current_page)"  :total="pagination.total"  @on-change="getpaginate"  :page-size="parseInt(pagination.per_page)"  show-sizer  :page-size-opts="pageOption"  @on-page-size-change="getSizeChange" /> -->
        </Col>
      </Row>
    </div>
    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="color: #f60; text-align: center">
        <Icon type="close"></Icon>
        <span> Delete {{ UpdateValue.name }}</span>
      </p>
      <div>
        <div style="margin-bottom: 20px">
          Are you sure you want delete {{ UpdateValue.name }}
        </div>
        <div>
          <Form label-position="top">
            <FormItem
              label="Please Enter Your Password"
              :error="UpdateValue.passwordError"
            >
              <Input
                type="password"
                v-model="UpdateValue.password"
                placeholder="Password"
              ></Input>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer">
        <Button
          type="error"
          size="large"
          long
          :loading="sending"
          @click="remove"
        >
          <span v-if="!loading">Delete</span>
          <span v-else>Deleting...</span>
        </Button>
      </div>
    </Modal>
    <Modal
      v-model="detailsModal"
      :title="detailsItem.title"
      :footer-hide="true"
      :styles="{ top: '20px' }"
    >
      <div class="_item_details">
        <Table
          border
          :columns="detailsColum"
          :data="detailsItem.data"
          :show-header="false"
        >
          <template slot-scope="{ row }" slot="value">
            <a
              v-if="row.name == 'Customer Facebook'"
              :href="row.value"
              target="_blank"
              rel="noopener noreferrer"
              ><span style="font-size: 18px; margin-right: 10px"
                ><i class="fab fa-facebook-square"></i
              ></span>
              <span>{{ row.value }}</span></a
            >
            <a
              v-else-if="row.name == 'Customer Instagram'"
              :href="row.value"
              target="_blank"
              rel="noopener noreferrer"
              ><span style="font-size: 18px; margin-right: 10px"
                ><i class="fab fa-instagram"></i></span
              ><span>{{ row.value }}</span></a
            >
            <span v-else>{{ row.value }}</span>
          </template>
        </Table>
      </div>
    </Modal>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    name: "simple",
    display: "Simple",
    order: 0,
    draggable,
  },
  data() {
    return {
      enabled: true,
      search: "",
      page: 1,
      pageOption: [5, 10, 20, 50, 100],
      pageSize: 20,
      addModal: false,
      deleteModal: false,
      loading: false,
      sending: false,
      isCollapsed: false,
      pagination: {
        current_page: 1,
        data: [],
        first_page_url: "http://127.0.0.1:8000/app/allCustomer?page=1",
        from: 0,
        last_page: 0,
        last_page_url: "http://127.0.0.1:8000/app/allCustomer?page=165",
        next_page_url: "http://127.0.0.1:8000/app/allCustomer?page=2",
        path: "http://127.0.0.1:8000/app/allCustomer",
        per_page: 100,
        prev_page_url: null,
        to: 10,
        total: 0,
      },
      UpdateValue: {
        indexNumber: null,
        id: null,
        name: "",
        type: "",
        password: "",
        passwordError: "",
      },
      columns1: [
        {
          title: "ID",
          key: "id",
          width: 100,
        },
        {
          title: "Type",
          key: "type",
          minWidth: 250,
        },
        {
          title: "Title",
          key: "title",
          width: 150,
        },
        {
          title: "Name",
          key: "name",
          minWidth: 300,
        },
        {
          title: "Details",
          slot: "details",
          width: 130,
        },
        {
          title: "Action",
          slot: "action",
          width: 180,
        },
      ],
      data1: [],
      newData: [],
      childRouteId: 0,
      detailsColum: [
        {
          title: "-----",
          key: "name",
        },
        {
          title: "-----",
          slot: "value",
        },
      ],
      detailsItem: {
        title: "",
        data: [],
      },
      detailsModal: false,
      type: "submenu",
      // sortableList:['submenu','child-submenu','menu'],
      new_list: [],
    };
  },
  computed: {},
  methods: {
    newList() {
      this.new_list = [];
      return this.data1.forEach((data, i) => {
        this.new_list.push(data.order_no);
      });
    },
    onSortChange() {
      // this.type = this.sortData.value
      this.page = 1;
      this.getRouters();
    },
    log: function (e) {
      this.newData = [];
      this.data1.forEach((data, i) => {
        let obj = {
          id: data.id,
          order_no: this.new_list[i],
        };
        this.newData.push(obj);
        // this.newList[i].order=data.id
      });
      this.resetRoutePosition();
    },
    showRoute(index) {
      this.childRouteId = this.data1[index].id;
      this.getRouters();
    },
    async resetRoutePosition() {
      // return;
      this.data1 = [];
      const response = await this.callApi(
        "put",
        "/app/resetRoutesPosition",
        this.newData
      );
      if (response.status == 200) {
        this.s("Routers Updated Successfully");
        this.getRouters();
        this.getRoutersAfterUpdate();
      } else this.swr();
    },
    async returnBack() {
      this.data1 = [];
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/parentRoute/${this.childRouteId}`
      );
      if (response.status == 200) {
        this.data1 = response.data.data;
        response.data.parent_id
          ? (this.childRouteId = response.data.parent_id)
          : (this.childRouteId = 0);
        this.newList();
      } else this.swr();
      this.loading = false;
    },
    async getRoutersAfterUpdate() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/router/autorized/sidebar`
      );
      if (response.status == 200) {
        // this.data1=response.data;
        this.$store.commit("setSideBar", response.data);
        // this.newList();
      } else this.e("Oops!", "Something went wrong, please try again!");
      this.loading = false;
    },
    showDetails(index) {
      this.detailsItem.data = [];
      this.detailsItem.title = this.data1[index].type;
      let ob = {
        name: "id",
        value: this.data1[index].id,
      };
      this.detailsItem.data.push(ob);
      ob = {
        name: "Type",
        value: this.data1[index].type,
      };
      this.detailsItem.data.push(ob);

      ob = {
        name: "Name",
        value: this.data1[index].name,
      };
      this.detailsItem.data.push(ob);
      ob = {
        name: "Title",
        value: this.data1[index].title,
      };
      this.detailsItem.data.push(ob);

      ob = {
        name: "Parent ID",
        value: this.data1[index].parent_id,
      };
      this.detailsItem.data.push(ob);
      ob = {
        name: "path",
        value: this.data1[index].path,
      };
      this.detailsItem.data.push(ob);
      ob = {
        name: "icon",
        value: this.data1[index].icon,
      };
      this.detailsItem.data.push(ob);
      ob = {
        name: "Active",
        value: this.data1[index].is_show == 1 ? "YES" : "NO",
      };
      this.detailsItem.data.push(ob);

      this.detailsModal = true;
    },
    clearFilters() {
      this.filter = {
        name: "",
        contact: "",
        city: "",
        zone: "",
      };
    },

    async getpaginate(e) {
      this.page = e;
      this.getRouters();
    },
    getSizeChange(e) {
      this.pageSize = e;
      this.page = 1;
      this.getRouters();
    },
    getSearchCustomer() {
      this.page = 1;
      this.getRouters();
    },
    showEdit(index) {
      this.$router.push(`/edit_router/${this.data1[index].id}`);
    },
    showRemove(index) {
      this.UpdateValue.name = this.data1[index].title;
      // this.UpdateValue.type=this.data1[index].type
      this.UpdateValue.id = this.data1[index].id;
      this.UpdateValue.indexNumber = index;
      this.deleteModal = true;
    },

    async remove() {
      this.UpdateValue.passwordError = "";
      if (
        this.UpdateValue.password == "" ||
        this.UpdateValue.password.trim() == ""
      ) {
        this.UpdateValue.passwordError = "Password is required";
        return;
      }
      this.sending = true;
      let ob = {
        id: this.UpdateValue.id,
        customerName: this.UpdateValue.customerName,
        password: this.UpdateValue.password,
      };
      const response = await this.callApi(
        "delete",
        `/app/delete_router/${this.UpdateValue.id}`,
        ob
      );
      if (response.status == 200) {
        this.s("Great!", "Router removed successfully!");
        this.sending = false;
        this.deleteModal = false;
        this.UpdateValue.password = "";
        this.getRouters();
        this.getRoutersAfterUpdate();
        // location.reload();
      } else if (response.status == 422) {
        this.sending = false;
        this.UpdateValue.passwordError = response.data.message;
      } else {
        this.sending = false;
        this.deleteModal = false;
        this.e("Oops!", "Something went wrong, please try again!");
      }
    },
    async getRouters() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/get_router?id=${this.childRouteId}&search=${this.search}&page=${this.page}&pageSize=${this.pageSize}`
      );
      if (response.status == 200) {
        this.data1 = response.data;
        // this.prevData = response.data
        this.newList();
        // this.data1=response.data.data;
        // this.pagination=response.data;
      } else this.e("Oops!", "Something went wrong, please try again!");
      this.loading = false;
    },
  },
  async created() {
    await this.getRouters();
  },
};
</script>

<style scoped>
.tr {
  background-color: rgb(48, 46, 46);
  color: rgb(223, 219, 219);
}
.li {
  list-style-type: none;
  /* width: 100%; */
  display: flex;
  border: 1px solid rgb(85, 82, 82);
  justify-content: space-around;
  align-items: center;
  /* flex:1; */
  gap: 15px;
  text-align: center;
  padding: 5px;
  margin: 8px auto;
}
.li:hover {
  cursor: move;
}
.li p {
  font-size: 16px;
  flex-basis: 180px;
  width: 150px;
  word-break: break-all;
  /* min-width: 150px; */
}
/* .li div{
        margin-right: 0;
        justify-self: flex-end;
    } */
.li p Button {
  margin: 0 3px 2px 0;
}
.li p Button:hover {
  cursor: pointer;
}
.active:active {
  background-color: #021e27 !important;
  color: #fff;
  width: 100%;
  cursor: move;
  border: 1px solid black;
}
</style>
