<script setup lang="ts">
</script>

<template>
  <div class="registrationPage">
    <div class="registrationBlock">
      <div class="data">
        <div style="color: #0F2232; font-size: 35px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Авторизация</div>
        <input type="email" class="dataField" style="color: rgba(15, 34, 50, 0.60); font-size: 24px; font-family: Montserrat; font-weight: 400;" placeholder="employee@psu.ru">
        <input type="password" class="dataField" style="color: rgba(15, 34, 50, 0.60); font-size: 24px; font-family: Montserrat; font-weight: 600;" placeholder="••••••••••••">
      </div>
      <div style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
        <div class="buttonReg">
          <div style="text-align: center; color: #0F2232; font-size: 24px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Регистрация</div>
        </div>
        <div class="buttonEnter">
          <div style="text-align: center; color: white; font-size: 24px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Войти</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registrationPage {
  width: 100%; 
  height: 100%; 
  display: flex; 
  justify-content: center; 
  align-items: center;
}

.registrationBlock {
  padding: 30px; 
  background: #F4F4F4; 
  border-radius: 15px; 
  border: 3px #0F2232 solid; 
  flex-direction: column; 
  justify-content: center; 
  align-items: flex-start; 
  gap: 60px; 
  display: inline-flex;
}

.data {
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: flex-start; 
  gap: 30px; 
  display: flex;
}

.dataField {
  width: 560px; 
  height: 55px; 
  padding: 13px 22px; 
  background: rgba(233, 236, 238, 0.50); 
  border-radius: 15px; 
  border: 1px #00B2FF solid; 
  display: flex; 
  align-items:center; 
  gap: 10px;
}

.dataField:focus,
.dataField:active {
  outline: none; /* Убираем внешнюю подсветку или обводку при фокусировке или активации */
}

.buttonReg, .buttonEnter {
  width: 200px; 
  height: 55px; 
  padding: 13px 15px; 
  border-radius: 15px; 
  border: 1px #00B2FF solid; 
  justify-content: center; 
  align-items: center; 
  gap: 10px; 
  display: flex;
  cursor: pointer;
}

.buttonEnter {
  background: #00B2FF; 
  color: white;
}
</style>