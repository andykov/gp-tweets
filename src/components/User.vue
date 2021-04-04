<template>
  <div class="user">
    <div class="user__avatar" :style="avatarBackground" :data-tooltip="user.name"></div>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: Object
  },
  computed: {
    avatarBackground () {
      if (this.user && this.user.avatar) {
        return {
          backgroundImage: `url('${this.user.avatar}')`
        }
      } else {
        return {
          backgroundImage: 'url(./assets/logo.png)'
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.user {
  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 25%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #f3f3ff;
  }
}
</style>
