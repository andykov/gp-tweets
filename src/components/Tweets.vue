<template>
  <div class="tweets">
    <div class="tweets__form">
      <form
        class="form"
        @submit.prevent="createTweet"
      >
        <textarea class="form__field" name="message" placeholder="Что нового?" ref="textarea" v-model="message" :style="textareaHeight"></textarea>
        <button type="submit" class="form__btn" :disabled='isDisabled'>Поделиться</button>
      </form>
    </div>
    <div class="tweets__list">
      <Tweet
        :tweet="tweet"
        v-for="(tweet, index) in tweetList"
        :key="index"/>
    </div>
  </div>
</template>

<script>
import Tweet from './Tweet'

export default {
  name: 'Tweets',
  components: {
    Tweet
  },
  data () {
    return {
      message: null,
      timer: null,
      inputHeight: '0'
    }
  },
  mounted () {
    this.$store.dispatch('fetchTweetsFromLocal')
  },
  computed: {
    messageEdit () {
      return this.$helpers.findUrlImgString(this.message)
    },
    tweetList () {
      return this.$store.getters.getTweets
    },
    isDisabled () {
      if (/\S/.test(this.message) === false) return true
      return !this.message
    },
    textareaHeight () {
      return {
        'min-height': this.inputHeight
      }
    }
  },
  methods: {
    createTweet () {
      if (this.message !== null) {
        const tweetId = this.$helpers.randomNumber()
        const userId = this.$helpers.randomNumber()

        const tweet = {
          text: this.message,
          quantComments: 0,
          created: Date.now(),
          userId: userId,
          user: this.randomUserGenerate(tweetId),
          id: tweetId
        }

        this.$store.dispatch('addTweet', tweet)
        this.message = null
        this.createComment(this.$helpers.randomNumber(10), tweetId)
        this.createUser(userId, tweetId)
      }
    },
    createComment (quantity, tweetId) {
      const self = this
      let timerId
      let count = 0

      function checkAddedQuantityComment () {
        if (count === quantity) return false

        self.timer = self.$helpers.randomMS(5, 30)
        self.$store.dispatch('addComment', self.randomCommentGenerate(tweetId))

        count++
        if (timerId) {
          clearTimeout(timerId)
        }

        timerId = setTimeout(checkAddedQuantityComment, self.timer)
      }
      const check = checkAddedQuantityComment.bind(self)
      setTimeout(check, this.$helpers.randomMS(5, 30))
    },
    randomCommentGenerate (tweetId) {
      const text = [
        'Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quod nostrum officiis voluptates eligendi delectus incidunt.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'Lorem, ipsum dolor.',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam eligendi veritatis incidunt quod.'
      ]

      return {
        text: text[Math.floor(Math.random() * text.length)],
        user: this.randomUserGenerate(tweetId),
        tweetId: tweetId,
        userId: this.$helpers.randomNumber(300),
        id: this.$helpers.randomNumber(300)
      }
    },
    randomUserGenerate (tweetId) {
      const usernames = ['Kate', 'Jasper', 'Alexander', 'Jacob', 'Ashley', 'Brian', 'Carl', 'Derek', 'Jason']

      return {
        name: usernames[Math.floor(Math.random() * usernames.length)],
        avatar: 'https://i.pravatar.cc/64',
        tweetId: tweetId,
        commentId: this.$helpers.randomNumber(300),
        id: this.$helpers.randomNumber(300)
      }
    },
    createUser (userId, tweetId) {
      this.$store.dispatch('addUser', this.randomUserGenerate(tweetId))
    },
    autoHeightTextArea () {
      this.inputHeight = this.message ? `${this.$refs.textarea.scrollHeight}px` : 'auto'
    }
  },
  watch: {
    message () {
      this.autoHeightTextArea()
    }
  }
}
</script>

<style scoped lang="scss">
.tweets {
  flex: 1;
  padding-right: 40px;
  max-width: 840px;
}

.form {
  background-color: #fff;
  padding: 20px 30px 20px 20px;
  border-radius: 20px;
  display: flex;
  margin-bottom: 40px;
  box-shadow: 0 30px 15px -15px rgba(0, 0, 0, 0.03);
  transition: background-color 0.235s ease-out, color 0.235s ease-out;

  &__field {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background-color: transparent;
    resize: none;
    width: 100%;
    height: 40px;
    margin-right: 20px;
    padding: 10px;
    font-size: 18px;
    outline: none;
    border: none;
    color: #2c3e50;
    transition: color 0.235s ease-out;
  }

  &__btn {
    align-self: flex-end;
    background-color: #347CF8;
    color: #fff;
    border: 0;
    border-radius: 10px;
    font-size: 22px;
    padding: 8px 16px;
    outline: none;

    &:not([disabled]):hover {
      background-color: #076aea;
      cursor: pointer;
    }

    &:disabled {
      opacity: 0.2;
    }
  }
}
</style>
