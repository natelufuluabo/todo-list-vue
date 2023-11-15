<template>
    <ul>
      <li v-for="item in shoppingItems.items" :key="item.id_" class="static-class"
        >
        <span class="static-class" :class="{ strikeout: item.purchased, priority: item.highPriority }" @click="shoppingItems.togglePurchased(item.id)">{{ item.label }}</span>
        <button @click="$event => shoppingItems.deleteItem(item.id)"><i class="fa-solid fa-trash"></i></button>
      </li>
    </ul>
</template>
<script setup>
import { shoppingItems } from '../store'
</script>
<style>
.strikeout {
  text-decoration: line-through;
  color: #b8c2cc;
}

.strikeout:hover {
  color: #8795a1;
}

.priority {
  color: #de751f;
}

input[type="checkbox"]{
  display: inline !important;
  box-shadow: none;
  width: auto;
}

ul {
  list-style: none;
  padding: 0;
}


li,
p {
  display: flex;
  align-items: center;
  line-height: 1.75;
  letter-spacing: 0.5px;
  color: #3d4852;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.1s ease-in;
}

li {
  display: grid;
  grid-template-columns: 1fr .5fr;
}

li:hover {
  color: #22292f;
}

li input {
  margin: 0 0.5rem 0;
}

button {
  display: flex;
  border: none;
  background-color: inherit;
  cursor: pointer;
}

button:hover {
  color: red;
}
</style>