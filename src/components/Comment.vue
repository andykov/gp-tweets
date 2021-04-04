<template>
  <div class="comment">
    <div class="comment__author">
      <User :user="comment.user"/>
    </div>
    <div class="comment__body">
      <div class="comment__text">
        {{ comment.text }}<br>
      </div>
    </div>
  </div>
</template>

<script>
import User from './User'

export default {
  name: 'Comment',
  props: {
    comment: Object
  },
  components: {
    User
  }
}
</script>

<style scoped lang="scss">
.comment {
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;

  &__author {
    flex-shrink: 0;
  }

  &__body {
    margin-left: 20px;
  }

  &__text {
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 10px;
    transition: background-color 0.235s ease-out;
  }
}
</style>
