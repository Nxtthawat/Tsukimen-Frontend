<script setup>
import navbar from '../components/navbar.vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { ref } from 'vue';

const router = useRouter();
const anonName = defineModel('anonName');

const ramenMenu = ref(
    [
    {   
        id: 1,
        name: 'Tonkotsu Ramen',
        description: 'ราเมนสุกกับน้ำซุปหมู ที่มีรสชาติเข้มข้น และเสิร์ฟพร้อมกับเส้นราเมนที่เป็นเส้นเส้นเล็ก ๆ ที่มีความนุ่ม ๆ และเป็นเส้นเส้นที่เป็นที่นิยมของคนไทย',
        selected: false,
    },
    {
        id: 2,
        name: 'Shoyu Ramen',
        description: 'ราเมนซุปโชยุ ',
        selected: false,
    },
    {
        id: 3,
        name: 'Shio Ramen',
        description: 'ราเมนซุปเกลือ',
        selected: false,
    },
    {
        id: 4,
        name: 'Miso Ramen',
        description: 'ราเมนซุปมิโซะ',
        selected: false,
    },
    {
        id: 5,
        name: 'Chilli Oil Ramen',
        description: 'ราเมนซุปน้ำมันพริก',
        selected: false,
    }
]
)

const selectMenu = (id) => {
    this.ramenMenu.forEach(ramen => {
        if (ramen.id === id) {
            ramen.selected = !ramen.selected;
        } else {
            ramen.selected = false;
        }
    });
};

const submitName = () =>{
    if(!anonName.value){
        Swal.fire({
            icon: 'error',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        });
        return;
    }


    if(localStorage.getItem('anonName') != null){
        localStorage.removeItem('anonName');
        localStorage.setItem('anonName', anonName.value);
        router.push({path: '/chat'});
    }else{
        localStorage.setItem('anonName', anonName.value);
        router.push({path: '/chat'});
    }
}

</script>

<template>
    <navbar />

    <div class="flex justify-center py-14 px-0">
        <div class="mt-10">
            <div class="max-w-7xl w-full">
                <div class="flex max-w-7xl flex-col lg:flex-row w-full mt-11 lg:mt-0 items-center gap-12">
                    <div class="w-full flex flex-col items-center justify-center">
                        <div class="max-w-[450px] mx-auto">
                            <div class="flex w-full justify-center">
                                <p class="text-3xl mr-2">สวัสดี...</p>
                                <input type="text" v-model="anonName" class="bg-transparent max-w-[200px] text-2xl focus:outline-none focus:ring-0 border-none " autocomplete="off" maxlength="20"  placeholder="ชื่อของคุณ">
                            </div>
                            <div class="shadow-lg min-w-96 min-h-24 border rounded-lg">
                                <div class="p-2">
                                    <p class="text-center text-xl my-3">วันนี้กินอะไรดี</p>
                                    <ul class="flex flex-row gap-1 justify-center">
                                        <div v-for="ramen in ramenMenu" :key="ramen.id" @click="selectMenu(ramen.id)">
                                            <input type="radio" name="ramenMenu" :value="ramen.id"> {{ ramen.name }}</input>
                                        </div>
                                    </ul>
                                    <p class="text-center text-xl mb-3"> เมนู </p>
                                </div>
                            </div>
                            <div class="min-w-96 min-h-24 relative top-10">
                                <img :src="ref('../assets/MCMale.png')" class="absolute left-5 w-[60px]" alt="">
                                <img :src="ref('../assets/counter.png')" class="absolute bottom-2" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex flex-col items-center justify-center">
                        <div class="mx-auto">
                            <div class="flex justify-center ">
                                <div class="relative">
                                    <img src="../assets/chatMenu.png" class="w-[300px]" alt="">
                                    <img class="absolute w-40 h-40 top-10 left-16 opacity-35" src="../assets/ramen-dealer-removebg-preview.png" alt="">
                                    <div class="absolute bottom-10 left-20">
                                        <button class="btn btn-outline w-[150px]" @click="submitName()">เข้าร่วมการสนทนา</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
img{
    -webkit-user-drag: none;
}
</style>