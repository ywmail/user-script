<template>
  <div class="honormodle">
    <div class="detail" v-if="showDetail">
      <div v-for="(obj, index) in contentObjectList" :key="index">
        <span v-html="obj.innerHtml"></span>
        <input :id="'read' + index" type="checkbox" :checked="obj.checked" @input="(value) => value && obj.muteNewEvent()" />
        <label :for="'read' + index">已读</label>
      </div>
    </div>
    <div>
      <img @click="changeDetailStatus()" v-if="hasNewContent" src="./img/ihealth.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
  hasNewContent: boolean;
  contentObjectList: any[];
}>();

props.contentObjectList.forEach(async (o) => {
  o.checked = !(await o.hasNewContent());
  o.innerHtml = await o.getContent();
});

const goToHonormodle = () => {
  location.href = "https://tj.dsjkyy.com/enterprise/home";
};

const showDetail = ref(false);
const changeDetailStatus = () => {
  showDetail.value = !showDetail.value;
};
</script>

<style lang="scss" scoped>
.honormodle {
  position: fixed;
  bottom: 40px;
  right: 0;
  .detail {
    width: 1000px;
    background-color: yellow;
  }
  .icon {
    float: right;
  }
}
</style>
