<script setup>
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { ref, watch, inject } from 'vue';

const volume = inject('volume');
const bgMusic = inject('bgMusic');

const logout = () => {
    Swal.fire({
        title: 'ยืนยันการออกจากระบบ',
        text: 'คุณต้องการออกจากระบบใช่หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    });
};

const route = useRouter();

const disconnect = () => {
    Swal.fire({
        title: 'ยืนยันการออกจากร้าน',
        text: 'คุณต้องการออกจากร้านใช่หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if(result.isConfirmed){
            localStorage.removeItem('anonName');
            route.push({path: '/'});
        }
    });
};

watch(volume, (newVolume) => {
  if (bgMusic.value) {
    bgMusic.value.volume = newVolume;
  }
});
</script>

<template>
       <header class="mt-4">
        <nav class="flex justify-between">
            <ul>
                <li class="btn btn-outline my-5 md:my-2 md:w-18 md:h-3 ms-5" @click="disconnect()">ออกจากร้าน</li>
            </ul>
            <ul class="mx-auto">
                <li><img class="md:h-16 md:my-0 my-5 h-12" src="../assets/logo-removebg-preview.png" alt=""></li>
            </ul>
            <ul class="flex w-24 justify-between items-center gap-2 me-5">
                <li class="btn btn-ghost btn-circle">
                    <img :src="ref('../assets/ตั้งค่า.PNG')" alt="">
                </li>
                <li>
                    <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full ">
                        <img
                            alt="Ramen Logo"
                            :src="ref('../assets/โปรไฟล์.PNG')" />
                        </div>
                    </div>
                    <ul
                        tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a onclick="settingsModal.showModal()">Settings</a></li>
                        <li><a @click="logout()">Logout</a></li>
                    </ul>
                    </div>
                </li>
            </ul>
        </nav>
    </header>

    <dialog id="settingsModal" class="modal">
        <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div class="volume-control">
                <label for="volume">Volume:</label>
                <input class="range range-xs" type="range" id="volume" min="0" max="1" step="0.01" v-model="volume">
            </div>
        </div>
    </dialog>
</template>
<script>
export default {
    name: 'navbar'
}
</script>