<template>
    <form class="login" @submit.prevent="$modal.hide">
        <div v-if="stage === 1">
            <span class="m-header-promo-text"> 
                Sign In
            </span>
            <div class="m-text-modal -l">
                Please enter you phone number
            </div>
                <input class="e-input -s m-referal-link"
                    type="tel"
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
            <span class="m-header-promo-text"> 
                {{phoneNumber}}
            </span>
            <div class="m-text-modal -l">
                Please enter you phone number
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
            <span @click="generateNewCode">
                Resend code
            </span>
        </div>


    </form>
</template>

<script>
  export default {
    name: 'LoginModal',
    data() {
        return {
            phoneNumber: null,
            stage: 1,
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
