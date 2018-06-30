<template>
    <form class="login" @submit.prevent="$modal.hide">
        <svg class="_arrow" viewBox="0 0 10 20" xmlns="http://www.w3.org/2000/svg">
            <!-- eslint-disable-next-line max-len -->
            <path transform="rotate(90, 5, 10)" d="M6,15.5857864 L8.29289322,13.2928932 C8.68341751,12.9023689 9.31658249,12.9023689 9.70710678,13.2928932 C10.0976311,13.6834175 10.0976311,14.3165825 9.70710678,14.7071068 L5,19.4142136 L0.292893219,14.7071068 C-0.0976310729,14.3165825 -0.0976310729,13.6834175 0.292893219,13.2928932 C0.683417511,12.9023689 1.31658249,12.9023689 1.70710678,13.2928932 L4,15.5857864 L4,1 C4,0.44771525 4.44771525,1.01453063e-16 5,0 C5.55228475,-1.01453063e-16 6,0.44771525 6,1 L6,15.5857864 Z"></path>
          </svg>
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
            error: null
        }
      
    },
    computed: {
    
    },
    methods: {
        generateNewCode() {
            this.$modal.params().generateCode(this.phoneNumber).then(() => {
                this.stage = 2;
                this.error = null;
            }).catch(() => {
                this.error = 'Wrong phone number'
            })
        },
        validateCode(){
            this.$modal.params().validateCode(this.otp).then(() =>{
                this.$modal.accept();
                this.$modal.hide()

            }).catch((r) => {
                this.error = r.body.reason;
            })
        }
    }   
};
</script>
