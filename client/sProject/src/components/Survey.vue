<script setup lang="ts">
    import { ref } from 'vue';

    import Question from './Question.vue';

    const status = ref('не опубликован');
    const action = ref('Опубликовать');
    const questions = ref([0]); // Initialize with one Question component

    const addQuestion = () => {
        questions.value.push(questions.value.length);
    };

    const toggleStatus = () => {
        status.value = status.value === 'не опубликован' ? 'опубликован' : 'не опубликован';
        action.value = action.value === 'Опубликовать' ? 'Редактировать' : 'Опубликовать';
    };
</script>

<template>
  <div style="width: 100%; display: inline-flex; align-items: center; justify-content: center; align-self: stretch; flex-direction: column; gap: 30px;">
    <div style="width: 924px; height: 100%; padding-top: 10px; padding-bottom: 10px; justify-content: space-between; align-items: center; display: inline-flex">
      <div style="color: #0F2232; font-size: 32px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">Опрос 1</div>
      <div style="justify-content: flex-start; align-items: center; gap: 20px; display: flex">
        <div style="color: #0F2232; font-size: 32px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">Статус: </div>
        <div style="color: #0F2232; font-size: 32px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">{{ status }}</div>
      </div>
    </div>

    <div style="width: 924px; height: 100%; padding-top: 10px; padding-bottom: 10px; border-bottom: 2px #0F2232 solid; justify-content: space-between; align-items: center; display: inline-flex">
      <input type="text" :readonly="status === 'опубликован'" style="color: #A9A9A9; font-size: 24px; font-family: Montserrat; font-weight: 500; word-wrap: break-word; border: none; outline: none; width: 800px;" placeholder="Описание">
      <img src="/src/assets/bluePen.svg">
    </div>

    <template v-for="index in questions" :key="index">
      <Question :index="index" :status="status"/>
    </template>

    <div v-if="status === 'не опубликован'" class="addQuestion" @click="addQuestion">
      <div style="width: 844px; padding-left: 40px; padding-right: 40px; padding-top: 30px; padding-bottom: 30px; background: #E9ECEE; border-radius: 15px; border: 2px #DDDDDD solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
        <div style="align-self: stretch; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; justify-content: center; align-items: center; display: inline-flex">
          <div style="text-align: center; color: black; font-size: 32px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Добавить вопрос</div>
        </div>
      </div>
    </div>
    <div class="publish">
        <div style="width: 924px; height: 100%; flex-direction: column; justify-content: center; align-items: flex-end; display: inline-flex; padding-bottom: 10px;">
            <div @click="toggleStatus" class="actionButton">
                <div style="text-align: center; color: white; font-size: 24px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">{{ action }}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<style>
</style>