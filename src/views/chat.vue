<script setup>
import navbar from '../components/navbar.vue';
import { io } from 'socket.io-client';
import { ref, provide,computed } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

const anonName = localStorage.getItem('anonName');
const router = useRouter();
const messages = ref([]);
const characters = ref([]);

const chatMessage = defineModel('chatMessage');
const chatContainer = ref(null); // Ref for the chat container
const socket = io('https://tsukimen-server.onrender.com/', { query: { anonName: anonName } });
const roomIdList = ref('');

const volume = ref(0.5);
const bgMusic = ref(null);

const sendMessage = () => {
    if (chatMessage.value) {
        socket.emit('sendMessage', chatMessage.value);

        messages.value.push({
            username: anonName,
            message: chatMessage.value,
            isClient: true,
            type: 'client-message',
        });

        chatMessage.value = '';
    };
};

socket.on('chatMessage', (message) => {
    messages.value.push({
        username: message.username,
        message: message.message,
        isClient: false,
        type: 'other-message',
    });
});

socket.on('updateUserList', (users) => {
    characters.value = users;
});

socket.on('userConnected', (username) => {
    characters.value.push({
        username: username,
        characters: '../../public/assets/MCMale.png',
        roomId: roomIdList.value,
    });

    messages.value.push({
        username: '',
        message: `${username} ได้เข้าร่วมแชท`,
        isClient: false,
        type: 'join',
    });
});

socket.on('userDisconnected', (username) => {
    messages.value.push({
        username: '',
        message: `${username} ได้ออกจากแชท`,
        isClient: false,
        type: 'leave',
    });
});

socket.on('roomId', (roomId) => {
    roomIdList.value = roomId;
});

const checkMessageType = (message) =>{
    switch (message.type) {
        case 'client-message':
            return 'text-right';
        case 'other-message':
            return 'text-left';
        case 'join':
            return 'text-center font-bold text-sm';
        case 'leave':
            return 'text-center text-red-500 font-bold text-sm';
    }
}

onBeforeRouteLeave((to, from, next) => {
    if(to.path !== '/chat'){
        socket.disconnect();
        localStorage.removeItem('anonName');
    }else{
        socket.disconnect();
        localStorage.removeItem('anonName');
    }
    next();
});

const calculateLeftPosition = (index) =>{

    const characterWidth = 80;
    const gap = 42;
    return index * (characterWidth + gap);
}

const filteredCharacters = computed(() => {
  return characters.value.filter(character => character.roomId === roomIdList.value);
});

provide('bgMusic', bgMusic);
provide('volume', volume);
</script>

<template>
    <navbar />

    <div class="flex justify-center py-14 px-0">
        <div class="mt-10">
            <div class="max-w-7xl w-full">
                <div class="flex max-w-7xl flex-col lg:flex-row w-full mt-12 lg:mt-0 items-center gap-12">
                    <div class="w-full flex flex-col items-center justify-center">
                        <div class="w-[560px] mx-auto">
                            <div class="w-[560] min-h-24 relative">
                                <div v-for="(value, index) in filteredCharacters" class="absolute bottom-24" :style="{left: calculateLeftPosition(index) + 'px'}" :key="index">
                                    {{ console.log(characters) }}
                                    <img :src="value.characters" class="w-[80px]" alt="">
                                </div>
                                <img src="../../public/assets/counter2.PNG" class="" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex flex-col items-center justify-center">
                        <div class="mx-auto">
                            <div class="flex justify-center ">
                                <div class="relative">
                                    <p class="ms-3 text-lg">เลขห้อง: {{ roomIdList }}</p>
                                    <img src="../../public/assets/chat.png" class="w-[300px]" alt="">
                                    <div class="absolute top-16 p-1 left-5 w-[260px] h-[230px] overflow-auto">
                                        <div v-for="(message, index) in messages" :key="`message-${index}`" :class="checkMessageType(message)">
                                            <p class="font-bold underline underline-offset-1">{{ message.username }}</p>
                                            <p>{{ message.message }}</p>
                                        </div>
                                    </div>
                                    <div class="absolute bottom-10 left-12 d-flex">
                                        <form @submit.prevent="sendMessage()">
                                            <input type="text" ref="chatContainer" v-model="chatMessage" class="text-xl me-3 focus:outline-none focus:ring-0 border-none " placeholder="พิมพ์ข้อความ">
                                            <button type="submit" class="ms-3 mb-1">ส่ง</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <audio ref="bgMusic" autoplay>
        <source src="../assets/music.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
</template>

<style scoped>
img{
    -webkit-user-drag: none;
}
</style>