<template>
    <div class="selectionBar" @click="toggleSelection" ref="selectionBarRef">
        <div style="display: flex;">
            <div class="selectedVariantText">{{ selectedOption }}</div>
            <img :src="isOpen ? '/src/assets/arrowBottom.svg' : '/src/assets/arrowBottom.svg'" :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }">
        </div>

        <div v-if="isOpen" style="width: 100%; margin-top: 10px">
            <div class="variantText" @click="selectOption('Текст')">Текст</div>
            <div class="variantText" @click="selectOption('Файл')">Файл</div>
            <div class="variantText" @click="selectOption('Один из списка')">Один из списка</div>
            <div class="variantText" @click="selectOption('Несколько из списка')">Несколько из списка</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';

const props = defineProps({
    selectedOption: String
});
const emits = defineEmits();

const isOpen = ref(false);
const selectedOption = ref(props.selectedOption || 'Текст');
const selectionBarRef = ref<HTMLElement | null>(null); // Указываем тип HTMLElement

const selectOption = (option: string) => {
    selectedOption.value = option;
    isOpen.value = false;
    emits('update:selectedOption', option);
};

const toggleSelection = () => {
    isOpen.value = !isOpen.value;
};

// Закрытие меню при клике вне selectionBar
const handleClickOutside = (event: MouseEvent) => {
    if (selectionBarRef.value && !(selectionBarRef.value.contains(event.target as Node))) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.selectionBar {
    flex-direction: column;
    position: absolute;
    top: 22px;
    right: 100px;
    background: #E9ECEE;
    align-self: stretch;
    padding: 10px 15px;
    border-radius: 15px;
    border: 2px solid #00B2FF;
    justify-content: space-between;
    align-items: center;
    display: inline-flex;
}

.variantText, .selectedVariantText {
    width: 302.29px;
    color: black;
    font-size: 24px;
    font-family: Montserrat;
    font-weight: 600;
    word-wrap: break-word;
    height: 30px;
}

.variantText {
    border-top: 1px solid #00B2FF; padding: 10px 15px;
}

.selectedVariantText {
    padding-left: 15px;
}
</style>