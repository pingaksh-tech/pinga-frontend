<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:m-0 m-4">
      <img src="../../assets/images/auth_bg.jpg" class="bg_image" />
      <vx-card>
        <div slot="no-body" class="">
          <div class="grid grid-cols-5 no-gutter justify-center main_wrapper">
            <div class="md:col-span-2 left_sidebox hidden lg:block">
              <div class="flex justify-center items-center flex-col h-full p-8">
                <div class="flex justify-center items-center mb-8">
                  <img src="@/assets/images/pingaksh_logo_white.svg" alt="login" class="mx-auto img_wrapper w-[168px] h-[100px]" />
                </div>
                <h2 class="text-white mb-4">Hello! {{ tempName }}</h2>
                <p class="text-white text-center">
                  {{ this.today_note }}
                </p>
                <p class="text-white text-center font-bold">-{{ author }}</p>
                <div class="text-white bottom_text">Powered by <span class="font-bold uppercase">Pingkash</span></div>
              </div>
            </div>

            <div class="md:col-span-3 sm:w-full md:w-full d-theme-dark-bg">
              <div class="p-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h1 class="mb-4">Welcome Back</h1>
                  <p>To access the Pingkash system, please log in with your credentials.</p>
                </div>
                <form action="" v-on:keyup.enter="save_changes">
                  <div class="vx-row pt-5 px-5">
                    <div class="vx-col w-full">
                      <div class="vx-row mb-2">
                        <label for="email">Email</label>
                        <vs-input
                          id="email"
                          class="w-full"
                          type="email"
                          v-validate="'required'"
                          name="email"
                          icon-no-border
                          icon="icon icon-user"
                          icon-pack="feather"
                          v-model="email"
                          placeholder="Enter Email"
                        />
                        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                      </div>

                      <div class="vx-row mb-2">
                        <label for="password">PIN</label>
                        <vs-input
                          id="password"
                          class="w-full"
                          type="password"
                          v-validate="'required'"
                          name="password"
                          icon-no-border
                          icon="icon icon-lock"
                          icon-pack="feather"
                          v-model="password"
                          placeholder="Enter Password"
                        />
                        <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                      </div>
                    </div>
                    <div class="flex justify-between items-center gap-2 w-full" >
                      <vs-button class="mt-3 items-center vs-con-loading__container" id="login-user" @click="save_changes" v-on:keyup.enter="save_changes" :disabled="!validateForm"
                        >Login</vs-button
                      >
                      <router-link to="/forget-password">Forgot Password?</router-link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  // Form Data
  data() {
    return {
      email: null,
      password: null,
      tempName: 'Pingaksh',
      loading: false,
      today_note: null,
      author: null,
      motivationNotes: [
        {
          text: 'Jewelry is like the perfect spice – it always complements what’s already there.',
          author: 'Diane von Furstenberg'
        },
        {
          text: 'Jewelry has the power to be this one little thing that can make you feel unique.',
          author: 'Jennie Kwon'
        },
        {
          text: 'Jewelry is something that has to do with emotion. That aspect of jewelry really interests me.',
          author: 'Ann Demeulemeester'
        },
        {
          text: 'I never worry about diets. The only carrots that interest me are the number you get in a diamond.',
          author: 'Mae West'
        },
        {
          text: 'Jewelry is the most transformative thing you can wear.',
          author: 'Iris Apfel'
        },
        {
          text: 'A woman needs ropes and ropes of pearls.',
          author: 'Coco Chanel'
        },
        {
          text: "Jewelry takes people's minds off your wrinkles.",
          author: 'Sonja Henie'
        },
        {
          text: 'Jewelry is forever.',
          author: 'Unknown'
        },
        {
          text: 'Big girls need big diamonds.',
          author: 'Elizabeth Taylor'
        },
        {
          text: "Jewelry is like ice cream; there's always room for more.",
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the most personal thing a woman can own.',
          author: 'Suzanne Belperron'
        },
        {
          text: 'Elegance is not standing out, but being remembered.',
          author: 'Giorgio Armani'
        },
        {
          text: 'Jewelry is a way of keeping memories alive.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry always fits.',
          author: 'Unknown'
        },
        {
          text: 'Life isn’t perfect, but your jewelry can be.',
          author: 'Unknown'
        },
        {
          text: 'Good jewelry is eternal.',
          author: 'Unknown'
        },
        {
          text: 'The right jewelry can make you look and feel amazing.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the finishing touch that brings your look together.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the most luxurious form of self-expression.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry adds that special touch of sparkle and elegance.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the art of personalizing beauty.',
          author: 'Unknown'
        },
        {
          text: 'A piece of jewelry is often a piece of art. But it only becomes valuable when emotions are added to it.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a timeless way to enhance your beauty.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a silent yet powerful statement of elegance.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is an eternal sparkle in the heart of a woman.',
          author: 'Unknown'
        },
        {
          text: "Jewelry is a treasure, and it should tell a story about the person who's wearing it.",
          author: 'Garance Doré'
        },
        {
          text: 'Jewelry has the power to be the one little thing that makes you feel unique.',
          author: 'Elizabeth Taylor'
        },
        {
          text: 'Jewelry is like a biography. A story that tells the many chapters of our lives.',
          author: 'Unknown'
        },
        {
          text: 'A diamond is forever.',
          author: 'De Beers'
        },
        {
          text: 'Jewelry is like a woman’s best friend; it can lift her up and make her feel confident.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the most transformative thing you can wear.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is an expression of our individuality.',
          author: 'Unknown'
        },
        {
          text: "Jewelry is a girl's best friend.",
          author: 'Marilyn Monroe'
        },
        {
          text: "Jewelry is the perfect spice; it always complements what's already there.",
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the most romantic accessory.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is an investment in happiness.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is an art that is eternal.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is an extension of who you are.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a form of art and expression.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is like the perfect spice; it always complements what’s already there.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the finishing touch to any outfit.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the cherry on top of the cake.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is an expression of love and beauty.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a way to express your personality.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a piece of art that you can wear.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a woman’s way of keeping memories alive.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the ultimate accessory.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the key to every woman’s heart.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the crown of the outfit.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the art of beautifying the body.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is an essential part of every woman’s wardrobe.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a beautiful way to express yourself.',
          author: 'Unknown'
        },
        {
          text: "Jewelry is a girl's best accessory.",
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the perfect way to make a statement.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the icing on the cake.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a timeless way to express your style.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the most intimate accessory.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the most personal form of art.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a way to express your unique style.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a way to celebrate life’s moments.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the ultimate symbol of love and beauty.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the perfect way to show your personality.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a symbol of elegance and grace.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a reflection of your inner beauty.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the perfect gift for any occasion.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the ultimate form of self-expression.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the perfect way to add a touch of glamour.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a way to tell your story.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is the most beautiful form of self-expression.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a timeless way to express your love.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a way to celebrate life’s special moments.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a beautiful way to express your style.',
          author: 'Unknown'
        },
        {
          text: 'Jewelry is a way to celebrate your uniqueness.',
          author: 'Unknown'
        }
      ]
    }
  },
  /* Form Validate */
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  /* API Calling Function */
  methods: {
    ...mapActions('auth', { login: 'login' }),

    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.loading = true
      try {
        const { message, data } = await this.login({
          email: this.email,
          password: this.password
        })
        this.loading = false
        this.$router.push({
          name: 'home'
        })
      } catch (message) {
        this.loading = false
        this.$vs.notify({
          title: 'Error',
          text: message.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary',
          time: 5000
        })
      }
    }
  },
  /* API Calling Loading */
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#login-user',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#login-user > .con-vs-loading')
      }
    }
  },

  mounted() {
    var random = this.motivationNotes.sort(func)
    this.today_note = random[0].text
    this.author = random[0].author
    function func(a, b) {
      return 0.5 - Math.random()
    }
    this.tempName = localStorage.getItem('userName')
  }
}
</script>

<style lang="scss">
.vx-card .vx-card__collapsible-content img {
  height: 100px;
  width: 168px;
}
.bg_image {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.left_sidebox {
  background-color: rgba(var(--vs-primary), 1);
}

.main_wrapper {
  min-height: 500px;
  height: 100%;
  max-width: 1000px;
}

.img_wrapper {
  height: 100%;
  width: 100%;
  min-width: 95px;
}
.login-tabs-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.bottom_text {
  position: absolute;
  bottom: 20px;
}
</style>
