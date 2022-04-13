<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">小郁餐馆</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :router="true"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.children.length > 0">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu :index="item.path + ''">
            <template #title>
              <!-- <i v-if="item.icon" :class="item.icon"></i> -->
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.path + ''">
                <!-- 你也可以选择自己加事件，来写菜单的点击事件 -->
                <!-- @click="handleMenuItemClick(subitem)" -->
                <!-- <i v-if="subitem.icon" :class="subitem.icon"></i> -->
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.children.length === 0">
          <el-menu-item :index="item.id + ''">
            <!-- <i v-if="item.icon" :class="item.icon"></i> -->
            <span>{{ item.name }}</span>
          </el-menu-item>
          <div></div>
        </template>
      </template>
      <!-- <el-sub-menu index="1">
        <template #title>

          <span>Navigator One</span>
        </template>

        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item one</el-menu-item>
      </el-sub-menu> -->
    </el-menu>
  </div>
</template>

<script lang="ts">
// import { useRouter } from 'vue-router'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'NavMenu',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //这里存放数据
  setup() {
    const store = useStore()
    // const router = useRouter()
    const userMenus = computed(() => store.state.login.userMenus)

    const route = useRoute()
    const defaultValue = ref(route.path)
    // const handleMenuItemClick = (subItem: any) => {
    //   console.log('--------')
    //   console.log(subItem.path)
    //   router.push({
    //     path: subItem.path ?? '/not-found'
    //   })
    // }
    return {
      userMenus,
      defaultValue
      // handleMenuItemClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
