<template>
  <header>
    <h1>{{ header || 'Welcome' }}</h1>
    <h2>{{nbItemsToBuy}} {{ nbItemsToBuy > 1 ? 'articles' : 'article' }} à acheter</h2>
    <h2>{{nbItemsPurchased}} {{ nbItemsPurchased > 1 ? 'articles achetés' : 'article acheté' }}</h2>
  </header>
  <main>
    <Form/>
    <p v-if="nbItemsToBuy === 0">Panier vide.</p> 
    <ShoppingList/>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { shoppingItems } from '../store';
import ShoppingList from '../components/ShoppingList.vue';
import Form from '../components/Form.vue';

const header = '🥦🍎🥬🍊 Liste d\'épicerie 🥦🍎🥬🍊'

const nbItemsPurchased = computed(()=>shoppingItems.items.filter(item => item.purchased).length);
const nbItemsToBuy = computed(()=>shoppingItems.items.length-nbItemsPurchased.value);
</script>

<style scoped>
body {
  background: #eff8ff;
  height: 100vh;
  width: 100vw;
  font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}
</style>



