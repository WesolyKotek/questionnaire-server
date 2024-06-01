<script setup lang="ts">
    import TypesOfQuestion from "./TypesOfQuestion.vue"

    import { ref } from 'vue';

    // interface ComponentProps {
    //     status: string;
    // }

    // const props = defineProps<ComponentProps>();
    const props = defineProps({
        status: String
    })
    const selectedOption = ref('Текст'); // Default selected option
    console.log(selectedOption);
</script>

<template>
    <div class="typeOfQuestion">
        <div style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
            <input type="text" :readonly="props.status === 'опубликован'" style="color: black; font-size: 32px; font-family: Montserrat; font-weight: 600; white-space: pre-wrap; word-wrap: break-word; overflow-x: hidden; width: 100%; background: #E9ECEE; outline: none; border: none; " placeholder="Текст вопроса">
            <div style="justify-content: flex-start; align-items: center; gap: 50px; display: flex">
                <div style="width: 358px; justify-content: center; align-items: center; display: flex">
                    <TypesOfQuestion :selectedOption="selectedOption" @update:selectedOption="selectedOption = $event"></TypesOfQuestion>
                </div>
                <img src="/src/assets/bluePen.svg">
            </div>
        </div>
        <div class="text" v-if="selectedOption === 'Текст'">
            <div style="color: #A9A9A9; font-size: 22px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Введите ответ</div>
        </div>
        <div class="file" v-if="selectedOption === 'Файл'">
            <img src="/src/assets/fileIcon.svg">
            <div style="text-align: center; color: #A9A9A9; font-size: 22px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Вставьте файл</div>
        </div>
        <div class="one" v-if="selectedOption === 'Один из списка'">
            <div class="variantInOne">
                <img src="/src/assets/circle.svg">
                <div style="color: black; font-size: 22px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Ответ 1</div>
            </div>
            <div class="variantInOne">
                <img src="/src/assets/circle.svg">
                <div style="color: black; font-size: 22px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Ответ 2</div>
            </div>
            <div class="variantInOne">
                <img src="/src/assets/circle.svg">
                <div style="color: #A9A9A9; font-size: 22px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Добавить ответ или “Другое”</div>
            </div>
        </div>
        <div class="multiply" v-if="selectedOption === 'Несколько из списка'">
            <div class="variantInMultiply">
                <img src="/src/assets/rectangle.svg">
                <div style="color: black; font-size: 22px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Ответ 1</div>
            </div>
            <div class="variantInMultiply">
                <img src="/src/assets/rectangle.svg">
                <div style="color: black; font-size: 22px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Ответ 2</div>
            </div>
            <div class="variantInMultiply">
                <img src="/src/assets/rectangle.svg">
                <div style="color: #A9A9A9; font-size: 22px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Добавить ответ или “Другое”</div>
            </div>
        </div>

    </div>
</template>