<template>
    <el-popover placement="top-start"
        title="更新内容"
        :width="500"
        trigger="click">
        <template #reference>
            <div class="honormodle">
                <img v-if="hasUpdate"
                    src="./img/honormodle.png"
                    alt="" />
            </div>
        </template>
        <div>
            <span v-html="updateContent"></span>
        </div>
    </el-popover>
</template>

<script lang="ts">
import 'element-plus/es/components/popover/style/css';
import { ElPopover } from 'element-plus';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    hasUpdate: Boolean,
    updateContent: String,
  },
  components: { ElPopover },
  setup() {
    const goToHonormodle = () => {
      location.href = 'http://w3.xxx.com/honormodle/purchase/html5/pages/index_01.html';
    };
    return {
      goToHonormodle,
    };
  },
});
</script>

<style lang="scss" scoped>
.honormodle {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
