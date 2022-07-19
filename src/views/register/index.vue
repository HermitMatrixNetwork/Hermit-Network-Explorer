<template>
    <div>
        <div class="main">
            <h2>Register a New Account</h2>
            <h3>账号</h3>
            <input type="text" v-model="username" />{{username}}
            <h3>密码</h3>
            <input type="text" v-model="password"/>{{password}}
            <p><input type="checkbox" value="0" v-model="checkbox" /><label>I agree to the Terms and Conditions</label></p>
            <p><input type="checkbox" value="1" v-model="checkbox" /><label>I agree to receive the BscScan newsletter and understand that I can unsubscribe at any time.</label></p>
            <p><input type="checkbox" value="2" v-model="checkbox" /><label>I agree to receive BscScan promotional emails and understand that I can unsubscribe at any time.</label></p>
            <h1>{{ checkbox }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:'',
            password:'',
            checkbox: [],
        };
    },
};
</script>

<style lang="scss" scoped>
.main {
    margin: 0 60px;
    min-height: 550px;
}
</style>
