<template>
  <SubMenu :key="menuInfo.key">
    <template #icon>
      <SettingOutlined />
    </template>
    <template #title>{{ menuInfo.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <MenuItem :key="item.key" @click="menuItemClick(item)">
        {{ item.title }}
        </MenuItem>
      </template>
      <template v-else>
        <sub-menu2 :key="item.key" :menu-info="item" @menuItemClick="menuItemClick(item)"></sub-menu2>
      </template>
    </template>
  </SubMenu>
</template>

<script lang="ts" setup>
import { Button, Menu, SubMenu, MenuItem } from 'ant-design-vue';
import { SettingOutlined } from '@ant-design/icons-vue';

interface MenuInfo {
  key: string;
  title: string;
  path?: string;
  icon?: string;
  children?: MenuInfo[];
}

defineProps<{
  menuInfo: MenuInfo;
}>();

const emit = defineEmits(['menuItemClick']);

const menuItemClick = (item: MenuInfo) => {
  emit('menuItemClick', item);
};
</script>