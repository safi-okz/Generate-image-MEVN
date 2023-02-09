<template>
  <section class="create-page">
    <div class="home-title">
      <h1>Create</h1>
      <p>
        Generate an imaginative image through DALL-E AI and share it with the community.
      </p>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="flex">
        <div class="input-wrapper">
        <div class="label-container">
          <label for="name">Your Name</label>
        </div>
        <input type="text" id="name" name="name" placeholder="Your Name..." v-model="form.name" required>
      </div>
      <div class="input-wrapper">
        <div class="label-container">
          <label for="prompt">Prompt</label>
          <button type="button" @click="generatePrompts">Surprise me</button>
        </div>
        <input type="text" id="prompt" name="prompt" placeholder="Do wonders..." v-model="form.prompt" required>
      </div>
      <div class="img-preview flex justify-center items-center">
        <img :src="form.photo" v-if="form.photo" :alt="form.prompt" class="img" />
        <img :src="preview" v-else alt="Preview" class="preview" />
        <div v-if="generatingImg" class="load flex justify-center items-center">
          <h3>Loading....</h3>
        </div>
      </div>
      <div class="generate-btn flex">
        <button type="button" @click="generateImageFun">
          {{ generatingImg ? "Generating..." : 'Generate' }}
        </button>
      </div>
      <div class="sharing-btn">
        <p>
          ** Once you have crated the image you want, you can share it with others in the community **
        </p>
        <button type="submit" >
            {{ loading ? 'Sharing...' : 'Share with the community' }}
        </button>
      </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import { preview } from '../assets';
import { getRandomPrompts } from '../utils';

const router = useRouter();
const form = reactive({
  name: '',
  prompt: '',
  photo: ''
});
const loading = ref(false);
const generatingImg = ref(false);
const generatePrompts = () => {
  const randomPrompt = getRandomPrompts(form.prompt);
  form.prompt = randomPrompt;
}

const generateImageFun = async () => {
  if(form.prompt){
    try{
      generatingImg.value = true;
      const resposne = await fetch('http://localhost:8000/api/v1/dalle', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          prompt: form.prompt
        })
      });

      const data = await resposne.json();
      form.photo = `data:image/jpeg;base64,${data.photo}`;
    } catch(err){
      console.log('prompt generating error ', err);
    } finally{
      generatingImg.value = false;
    }
  }
}

const handleSubmit = async () => {
  if(form.prompt && form.photo){
    try{
      loading.value = true;
      const resposne = await fetch('http://localhost:8000/api/v1/post', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          prompt: form.prompt,
          name: form.name,
          photo: form.photo
        })
      });

      await resposne.json();
      router.push({name: 'home'});
    } catch(err){
      console.log('prompt generating error ', err);
    } finally{
      loading.value = false;
    }
  }
}
</script>

<style>

</style>
