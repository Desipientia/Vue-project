<template>
    <form class="login" @submit.prevent="$modal.hide">
        <div v-if="stage === 1">
            <span class="m-header-text">
                Sign In
            </span>
            <div class="m-text-modal -m">
                Please enter you phone number
            </div>
                <input class="e-input -s m-referal-link"
                    type="tel"
                    placeholder="Your phone number"
                    title="phoneLogin"
                    ref="phoneLogin"
                    v-model="phoneNumber"
                />
                <div v-if="error" class="_error-block">
                    {{error}}
                </div>
                <div class="e-button -grey" @click="generateNewCode">
                NEXT
            </div>
        </div>
        <div v-if="stage === 2">
            <div class="m-back-button" @click="back">
                <svg width="24px" height="18px" viewBox="0 0 24 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="ITO-[Desktop]" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Landing---short-/-Connect-with-phone---Step-2-(modal)" transform="translate(-80.000000, -81.000000)">
                            <g id="popup" transform="translate(60.000000, 60.000000)">
                                <g id="back" transform="translate(20.000000, 18.000000)">
                                    <g id="Icons-/-Simple-/-Gray-/-Arrow-Back">
                                        <g id="Group" transform="translate(0.000000, 4.000000)">
                                            <rect id="Rectangle-2" fill="#BCBCBC" x="0" y="7" width="24" height="2" rx="1"></rect>
                                           // eslint-disable-next-line
                                            <polyline id="Path-6" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" points="9 16 1 8 9 0"></polyline>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <span class="m-header-text">
                {{phoneNumber}}
            </span>
            <div class="m-text-modal -m">
                We’ve sent you an SMS with the code
            </div>
            <input class="e-input -s m-referal-link"
                type="number"
                title="otpIntput"
                ref="otpIntput"
                v-model="otp"
            />
            <div v-if="error" class="_error-block">
                {{error}}
            </div>
            <div class="e-button -grey" @click="validateCode">
                Confirm
            </div>
            <div class="m-sign-button">
                <div  class="m-sign-button" @click="generateNewCode">
                    Resend code
                </div>
            </div>
        </div>


    </form>
</template>

<script>
  export default {
    name: 'LoginModal',
    data() {
      return {
        phoneNumber: '+79146682876',
        stage: 2,
        otp: null,
        error: null,
      };
    },
    computed: {

    },
    methods: {
      generateNewCode() {
        this.$modal.params().generateCode(this.phoneNumber).then(() => {
          this.stage = 2;
          this.error = null;
        }).catch((r) => {
          this.error = r.body.detail;
        });
      },
      back() {
        this.stage = 1;
        this.error = null;
      },
      validateCode() {
        this.$modal.params().validateCode(this.otp).then(() => {
          this.$modal.accept();
          this.$modal.hide();
        }).catch((r) => {
          this.error = r.body.reason;
        });
      },
    },
  };
</script>
