<template>
    <div>
        <Menu v-if="sidebarLoading==false" accordion :class="menuitemClasses" >
            <!-- <div class="deshboard_logo">
                <template v-if="companyInfo.companyLogo"><img :src="companyInfo.companyLogo" alt=""></template>
                <template v-else><img src="/img/admin_logo.png" alt=""></template>
            </div> -->
            <div v-for="(menu,menuIndex) in sidebar" :key="menuIndex" >
            <!-- <div v-for="(menu,menuIndex) in sidebar" :key="menuIndex" > -->
                <MenuItem v-if="menu.type == 'menu' && menu.is_show && ( menu.website == 'COMMON' || menu.website == site_name)"  :name="menu.name" :to="menu.path"><i v-if="menu.icon" :class="menu.icon"></i>{{menu.title}}</MenuItem>
                <Submenu v-if="menu.type == 'submenu' && menu.is_show && (menu.website == 'COMMON' || menu.website == site_name)" :name="menu.name">
                    <template slot="title"><i v-if="menu.icon" :class="menu.icon"></i>{{menu.title}}</template>
                    <div v-for="(submenu,submenuIndex) in menu.menus" :key="submenuIndex" >
                        <MenuItem v-if="submenu.type == 'menu' && submenu.is_show &&( submenu.website == 'COMMON' || submenu.website == site_name)"  :name="submenu.name" :to="submenu.path"><i v-if="submenu.icon" :class="submenu.icon"></i>{{submenu.title}}</MenuItem>
                        <Submenu v-if="submenu.type == 'submenu' && submenu.is_show && (submenu.website == 'COMMON' || submenu.website == site_name)" :name="submenu.name">
                            <template slot="title"><i v-if="submenu.icon" :class="submenu.icon"></i>{{submenu.title}}</template>
                            <div v-for="(menuItem,menuItemIndex) in submenu.menus"  :key="menuItemIndex">
                                <MenuItem v-if="menuItem.type == 'menu' && menuItem.is_show && (menuItem.website == 'COMMON' || menuItem.website == site_name)"  :name="menuItem.name" :to="menuItem.path"><i v-if="menuItem.icon" :class="menuItem.icon"></i>{{menuItem.title}}</MenuItem>
                            </div>
                        </Submenu>
                    </div>
                </Submenu>
            </div>
        </Menu>
        <div class="siderbar-shimmer" v-else-if="sidebarLoading == true">
        <div class="shimmer_logo">
           <div class="shine circle"></div>
        </div>

        <div class="siderbar-shimmer-menu">
            <div class="shine lines"></div>
            <div class="shine lines"></div>
            <div class="shine lines"></div>
            <div class="shine lines"></div>
            <div class="shine lines"></div>
            <div class="shine lines"></div>
            <div class="shine lines"></div>
        </div>
            <!-- <h1 style="color: white;margin-top: 200px;font-size: 25px;" class="table-loading"><i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i><span style="margin-left: 10px;">Loading Sidebar...</span></h1> -->
        </div>
    </div>

</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    export default {
        props: [
            'isCollapsed'
        ],
        data() {
            return {
                sidebarLoading:true,
                sidebarData:[],
                site_name:window.site_name,
                // site_name:"FINESSE",
            }
        },
        computed: {
			...mapGetters({

				allNotiFalg: 'allNotiFalg',
				oneNotiFalg: 'oneNotiFalg',
            }),
            ...mapState({
                sidebar:'sidebar'
            }),
			rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },

            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
		},
        async created(){
             const response = await this.callApi('get','/app/router/autorized/sidebar');
             if(response.status == 200){
                this.$store.commit('setSideBar',response.data);
                // this.sidebarData = response.data;
             }
             else this.swr();
             this.sidebarLoading = false;
        }

    }
</script>
<style scoped>
    .shine {
        background: rgb(28, 28, 28);
        background-image: linear-gradient(to right, #878787 0%, #828282 20%, #878787 40%, #878787 100%);
        background-repeat: no-repeat;
        background-size: 800px 104px;
        display: inline-block;
        position: relative;

        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeholderShimmer;
        animation-timing-function: linear;
    }

    .siderbar-shimmer {
        display: inline-flex;
        flex-direction: column;
        /* margin-left: 25px; */
        vertical-align: top;
    }
    .shimmer_logo{
        text-align: center;
        padding: 12px 0;
    }
    .siderbar-shimmer-menu{
        /* margin-top: 110px; */
        padding: 0 24px;
    }

    .siderbar-shimmer .lines {
        height: 25px;
        margin: 6px 0 12px 0;
        width: 180px;
    }
    .siderbar-shimmer .circle {
        height: 90px;
        width: 90px;
        border-radius: 100px;
    }

    @keyframes placeholderShimmer {
        0% {
            background-position: -468px 0;
        }
        100% {
            background-position: 468px 0;
            background: #e1e1e1;
        }
    }


</style>
