<template>
  <main id="app">
    <div class="switch-theme">
      <input type="checkbox" class="switch-theme__input" id="switch-theme" v-model="themeMode">
      <label class="switch-theme__label" for="switch-theme">
        <span class="switch-theme__indicator"></span>
      </label>
    </div>
    <button class="storage-clear" @click="localStorageClear">Очистить localStorage</button>
    <div class="container">
      <label class="theme-toggle">
        <input type="checkbox" v-model="themeMode" hidden>
        <span></span>
      </label>
      <div class="tweets-wrap">
        <Tweets/>
        <TweetsTop/>
      </div>
    </div>
  </main>
</template>

<script>
import Tweets from './components/Tweets'
import TweetsTop from './components/TweetsTop'

export default {
  name: 'App',
  components: {
    Tweets,
    TweetsTop
  },
  data () {
    return {
      themeMode: JSON.parse(localStorage.getItem('themeMode')) || false
    }
  },
  mounted () {
    if (this.themeMode) {
      document.body.classList.toggle('theme-dark')
    }
  },
  methods: {
    localStorageClear () {
      localStorage.clear()
    }
  },
  watch: {
    themeMode: function () {
      localStorage.setItem('themeMode', JSON.stringify(this.themeMode))
      console.log('Night Mode: ' + JSON.stringify(this.themeMode))
      document.body.classList.toggle('theme-dark')
    }
  }
}
</script>

<style lang="scss">
*, ::after, ::before {
  box-sizing: border-box;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  padding-top: 60px;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F7F7F7;
  margin: 0;
  position: relative;
  color: #3a4453;
  transition: background-color 0.235s ease-out, color 0.235s ease-out;

  &.theme-dark {
    background-color: #1b212c;
    // background-color: #2d3948;
  }
}

[data-tooltip] {
  position: relative;
  z-index: 20;
}

[data-tooltip]:before,
[data-tooltip]:after {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  left: 50%;
  bottom: calc(100% + 3px);
  pointer-events: none;
  transition: 0.175s;
  will-change: transform;
}

[data-tooltip]:before {
  content: attr(data-tooltip);
  padding: 7px 15px;
  min-width: 50px;
  max-width: 300px;
  width: max-content;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  background-color: #f3fcff;
  box-shadow: 0px 20px 15px -12px rgba(0, 0, 0, 0.2);
  color: #2c3e50;
  text-align: center;
  white-space: pre-wrap;
  transform: translate(-50%, -5px) scale(0.5);
}

[data-tooltip]:after {
  content: '';
  border-style: solid;
  border-width: 5px 5px 0px 5px;
  border-color: #f3fcff transparent transparent transparent;
  transition-duration: 0s;
  transform-origin: top;
  transform: translateX(-50%) scaleY(0);
}

[data-tooltip]:hover:before,
[data-tooltip]:hover:after {
  visibility: visible;
  opacity: 1;
}

[data-tooltip]:hover:before {
  transition-delay: 0.235s;
  transform: translate(-50%, -5px) scale(1);
}

[data-tooltip]:hover:after {
  transition-delay: 0.375s;
  transition-duration: 0.2s;
  transform: translateX(-50%) scaleY(1);
}

.theme-dark {
  color: #e9eaec;

  .form {
    background-color: #2d3948;

    &__field {
      color: #e9eaec;
    }
  }

  .tweet,
  .tweets-top__title,
  .tweets-top__list {
    color: #e9eaec;
  }

  .tweet {
    background-color: #4b5567;

    &__comments {
      &::before {
        background-color: #3c4555;
      }
    }

    &::before {
      background-color: #dcdfe4;
      box-shadow: -1px 6px 5px -5px #dcdfe3;
    }
  }

  .tweets-top__list {
    background-color: #3b4555;
  }

  .comment__text {
    background-color: #565f71;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.tweets-wrap {
  display: flex;
  align-items: flex-start;
  margin-bottom: 120px;
}

.storage-clear {
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: #4c5565;
  color: #fff;
  border: 0;
  outline: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.235s ease-out;

  &:hover {
    background-color: #3c4555;
  }
}

.switch-theme {
  display: inline-block;
  position: absolute;
  top: 20px;
  left: 20px;

  &__input {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;

    &:checked + .switch-theme__label {
      background-color: #313131;
      border-color: #5B5B5B;

      .switch-theme__indicator {
        background-color: #7B7B7B;
        box-shadow: -10px 0px 0 0 rgba(#000000, 0.2) inset;
        transform: translate(-50%, -50%) translateX(55%);
      }
    }
  }

  &__label {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 32px;
    background-color: #a2c1f7;
    border: 2px solid #6da3ff;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.235s cubic-bezier(.46,.03,.52,.96);
  }

  &__indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translateX(-55%);
    display: block;
    width: 24px;
    height: 24px;
    background-color: #fbfb30;
    border-radius: 9999px;
    box-shadow: none;

    & {
      transition: all 0.235s cubic-bezier(.46,.03,.52,.96);
    }
  }
}

@keyframes twinkle {
  50% { opacity: 0.2; }
}

</style>
