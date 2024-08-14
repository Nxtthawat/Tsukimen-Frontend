<script setup>
import axios from 'axios'
import { RouterLink, useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import footerComponent from '../components/footer.vue'

const username = defineModel('username');
const password = defineModel('password');

const router = useRouter();

// Define a function to submit the form
const submitForm = () => {
   if(username.value === '' || password.value === ''){
      Swal.fire({
         icon: 'error',
         title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
         text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
   };
   
   // Make a POST request to the login endpoint of the API
   axios.post('https://tsukimen-server.onrender.com/api/user/login', {
      // Send the username and password as the request body
      username: username.value,
      password: password.value
   })
   .then((response) => {
      localStorage.setItem('token', response.data.token);

      Swal.fire({
         icon: 'success',
         title: 'Success',
         text: 'You have successfully logged in',
      }).then(() => {
         router.push({path: '/'});
      });
      username.value = '';
      password.value = '';
   })
   .catch((error) => {
      console.log(error);
      if(error.response.data.status == 400){
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${error.response.data.message}`,
         });
      };
   });
}
</script>

<template>
      <div class="flex justify-center flex-col h-screen">
        <div class="mx-auto border-2 rounded-2xl shadow-xl w-80 p-5 sm:w-96 sm:p-10">
            <h1 class="text-5xl font-bold text-center">Log in</h1>
            <form action="" class="block" id="LoginForm">
               <label class="block mt-3 mb-0" for="username">ชื่อผู้ใช้</label>
               <input class="input input-bordered my-2 max-w-xs input-sm p-5 w-full" placeholder="Username" type="text" v-model="username" id="username" name="username" required autocomplete="off">
               <label class="block" for="password">รหัสผ่าน</label>
               <input class="input input-bordered my-2 max-w-xs input-sm p-5 w-full" placeholder="Password" type="password" v-model="password" id="password" name="password" required autocomplete="off">
               <input class="mt-2 btn btn-success text-white w-full text-xl" type="submit" @click.prevent="submitForm()" value="เข้าสู่ระบบ">
            </form>
            <p class="mt-2 flex">ยังไม่มีบัญชี? <RouterLink to="/register" class="ms-2 font-bold">สมัครเลย!</RouterLink></p>
        </div>
      </div>
      <footerComponent />
</template>
<style scoped>
</style>
