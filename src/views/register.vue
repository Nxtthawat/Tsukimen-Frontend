<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { defineModel, ref } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import footerComponent from '../components/footer.vue';

const username = defineModel('username');
const email = defineModel('email');
const password = defineModel('password');
const passwordConfirm = defineModel('passwordConfirm');

const router = useRouter();

const userData = ref({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
})

const regis = ()=>{
    if(password.value !== passwordConfirm.value){
        Swal.fire({
            icon: 'error',
            title: 'รหัสผ่านไม่ตรงกัน',
            text: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
        })
        return;
    };

    if(username.value === '' || email.value === '' || password.value === '' || passwordConfirm.value === ''){
        Swal.fire({
            icon: 'error',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        })
        return;
    };

    if(password.value.length < 6){
        Swal.fire({
            icon: 'error',
            title: 'รหัสผ่านต้องมีความยาวมากกว่า 6 ตัวอักษร',
            text: 'รหัสผ่านต้องมีความยาวมากกว่า 6 ตัวอักษร',
        })
        return;
    };

    if(email.value.indexOf('@') === -1){
        Swal.fire({
            icon: 'error',
            title: 'รูปแบบอีเมลไม่ถูกต้อง',
            text: 'รูปแบบอีเมลไม่ถูกต้อง',
        })
        return;
    };

    axios.post('http://localhost:3000/api/user/register', {
        username: username.value,
        email: email.value,
        password: password.value,
    }).then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        Swal.fire({
            icon: 'success',
            title: 'สมัครสมาชิกสำเร็จ',
            text: 'สมัครสมาชิกสำเร็จ',
        }).then(() => {
            router.push({path: '/'});
        });
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'สมัครสมาชิกไม่สำเร็จ',
            text: `${error.response.data}`,
        })
    });
}

</script>

<template>
    <div class="flex justify-center flex-col h-screen">
        <div class="mx-auto border-2 w-80 p-5 sm:w-96 sm:p-10 rounded-2xl shadow-xl">
            <h1 class="text-5xl font-bold text-center">สมัครสมาชิก</h1>
            <form class="block">
                <label class="block mt-5" for="username">ชื่อผู้ใช้</label>
                <input class="block input-sm p-5 w-full input input-bordered my-2" placeholder="ชื่อผู้ใช้" type="text" id="username" autocomplete="off" v-model="username" />
                <label class="block" for="username">Email</label>
                <input class="block input-sm p-5 w-full input input-bordered my-2" placeholder="test@gmail.com" type="text" id="email" autocomplete="off" v-model="email" />
                <label class="block" for="password">รหัสผ่าน</label>
                <input class="block input-sm p-5 w-full input input-bordered my-2" placeholder="รหัสผ่าน" type="password" id="password"  autocomplete="off"  v-model="password" />
                <label class="block" for="password">ยืนยันรหัสผ่าน</label>
                <input class="block input-sm p-5 w-full input input-bordered my-2" placeholder="ยืนยันรหัสผ่าน" type="password" id="conpassword"  autocomplete="off"  v-model="passwordConfirm" />
                <button @click.prevent="regis()" class="block btn btn-success text-2xl text-white w-full mt-3" type="submit">สมัคร</button>
            </form>
            <p class="flex mt-2">มีบัญชีอยู่แล้ว? <RouterLink to="/login" class="font-bold ms-2">เข้าสู่ระบบ</RouterLink></p>
        </div>
    </div>

    <footerComponent />
</template>

<style scoped>

</style>