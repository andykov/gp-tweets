<template>
  <div class="tweets-top" v-if="tweetList.length">
    <div class="tweets-top__title">🔥 Самое горячее!</div>
    <transition-group name="flip-list" tag="ul" class="tweets-top__list">
      <li v-for="(tweet) in tweetList" :key="tweet.id" class="tweets-top__item">
        <span>{{ tweet.quantComments }}</span>
        {{ tweet.text.substr(0, 60) }}...
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {},
  data () {
    return {}
  },
  computed: {
    tweetList () {
      const tweets = this.$store.getters.getTweets
      const tweetsClone = JSON.parse(JSON.stringify(tweets))

      return tweetsClone.sort((a, b) => {
        const resA = this.$helpers.diffDaysTime(new Date(a.created), new Date()) + a.quantComments
        const resB = this.$helpers.diffDaysTime(new Date(b.created), new Date()) + b.quantComments

        return (resB - resA).toFixed(4)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.tweets-top {
  width: 320px;
  flex-shrink: 0;

  &__title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  &__list {
    background-color: #fff;
    padding: 30px 20px 10px;
    border-radius: 20px;
    box-shadow: 0 30px 15px -15px rgba(0, 0, 0, 0.03);
    transition: background-color 0.235s ease-out, color 0.235s ease-out;
  }

  &__item {
    margin-bottom: 20px;
    position: relative;
    display: flex;

    span {
      flex-shrink: 0;
      display: inline-block;
      background-color: #4c5566;
      color: #fff;
      border-radius: 100%;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      margin-right: 10px;
      transition: background-color 0.235s ease-out, color 0.235s ease-out;
    }
  }
}
.flip-list-move {
  transition: transform 0.3s;
}
</style>
