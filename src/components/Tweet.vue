<template>
  <div class="tweet" :data-id="tweet.id" :data-quantComments="tweet.quantComments" :data-userId="tweet.userId">
    <div class="tweet__content">
      <div class="tweet__author">
        <User :user="tweet.user"/>
      </div>
      <div class="tweet__body">
        <div class="tweet__date">{{ new Date(tweet.created).toLocaleDateString() }}</div>
        <div class="tweet__text">
          {{ messageEdit.text }}
        </div>
        <div class="tweet__img" v-if="messageEdit.images">
          <!-- <img :src="link" alt="" v-for="(link, index) in messageEdit.images" :key="index"> -->
          <img :src="messageEdit.images[0]" alt="">
        </div>
      </div>
    </div>
    <div class="tweet__comments" v-if="commentList.length">
      <Comment v-bind:comment="comment" v-for="(comment, index) in commentList" :key="index">
        <!-- <User :user="tweet.user"/> -->
      </Comment>
    </div>
  </div>
</template>

<script>
import Comment from './Comment'
import User from './User'
// import { mapActions } from 'vuex'

export default {
  name: 'Tweet',
  props: {
    tweet: Object,
    timer: Number
  },
  data () {
    return {}
  },
  components: {
    Comment,
    User
  },
  computed: {
    messageEdit () {
      return this.$helpers.findUrlImgString(this.tweet.text)
    },
    commentList () {
      const comments = this.$store.getters.getComments

      const tweetComments = comments.filter(comment => {
        if (comment.tweetId === this.tweet.id) {
          return comment
        }
      })
      return tweetComments.slice(0, 3)
    }
  },
  mounted () {
    this.$store.dispatch('fetchCommentsFromLocal')
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.tweet {
  position: relative;
  margin-bottom: 20px;
  padding: 20px 30px 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 30px 15px -15px rgba(0, 0, 0, 0.03);
  transition: background-color 0.235s ease-out, color 0.235s ease-out;

  // &::before {
  //   content: "tweet-id="attr(data-id)" | comments="attr(data-quantComments)" | user-id="attr(data-userId);
  //   position: absolute;
  //   right: 30px;
  //   top: 0;
  //   padding: 3px 8px;
  //   font-style: italic;
  //   font-weight: bold;
  //   font-size: 10px;
  //   color: #48515f;
  //   background-color: #e1f9a6;
  //   border-radius: 5px;
  //   box-shadow: -1px 6px 5px -5px rgba(214, 230, 172, 33%);
  //   transform: translateY(-70%);
  //   transition: background-color 0.235s ease-out, color 0.235s ease-out;
  // }

  &__content {
    display: flex;
    align-items: flex-start;
  }

  &__body {
    flex: 1;
    margin-left: 20px;
  }

  &__date {
    font-size: 14px;
    color: #AFB9C6;
    text-align: right;
    margin-bottom: 10px;
  }

  &__author {
    flex-shrink: 0;
    padding-top: 30px;
  }

  &__text {
    font-size: 20px;
  }

  &__comments {
    padding-top: 40px;
    margin-top: 20px;
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 10px;
      background-color: #F7F7F7;
      border-radius: 10px;
      transition: background-color 0.235s ease-out;
    }
  }

  &__img {
    display: flex;
    padding-top: 20px;

    img {
      max-width: 100%;
      vertical-align: middle;
      border-radius: 20px;
    }
  }
}
</style>
