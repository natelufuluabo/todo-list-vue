<template>
  <header>
    <h1>{{ header || 'Welcome' }}</h1>
    <h2>{{nbItemsToBuy}} {{ nbItemsToBuy > 1 ? 'articles' : 'article' }} à acheter</h2>
    <h2>{{nbItemsPurchased}} {{ nbItemsPurchased > 1 ? 'articles achetés' : 'article acheté' }}</h2>
  </header>
  <main>
    <button v-if="editing" @click="doEdit(false)" class="btn btn-cancel">Annuler</button>
    <button v-else @click="doEdit(true)" class="btn btn-primry">Ajouter un article</button>

    <div v-if="editing" class="add-item-form">
      <input @keyup.enter="saveItem" type="text" v-model="newItem" placeholder="Ajout d'un article">
      <label>
        <input type="checkbox" v-model="newItemHighPriority">
        Haute Priorité
      </label>
      <button @click="saveItem" class="btn btn-primary">
        Enregistrer
      </button>
    </div>
    <p v-if="nbItemsToBuy === 0">Panier vide.</p> 
    <ul>
      <li v-for="item in items" :key="item.id_" class="static-class"
        :class="{ strikeout: item.purchased, priority: item.highPriority }"
        >
        <span @click="togglePurchased(item)">{{ item.label }}</span>
        <button @click="$event => deleteItem(item.id)"><i class="fa-solid fa-trash"></i></button>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const header = '🥦🍎🥬🍊 Liste d\'épicerie 🥦🍎🥬🍊'
const items = reactive([
  { id: 1, label: '🍎 Pommes', purchased: false, highPriority: false },
  { id: 2, label: '🥦 Brocoli', purchased: false, highPriority: false },
  { id: 3, label: '🥬 Laitue', purchased: false, highPriority: false },
  { id: 4, label: '🍊 Oranges', purchased: false, highPriority: false },
]);

const editing = ref(false);
const newItem = ref('');
const newItemHighPriority = ref(false);
const nbItemsPurchased = computed(()=>items.filter(item => item.purchased).length);
const nbItemsToBuy = computed(()=>items.length-nbItemsPurchased.value);


function saveItem() {
  if (!newItem.value) return // Empêche l'utilisateur d'ajouter un article sans nom
  items.push({
    id: items.length + 1,
    label: newItem.value,
    purchased: false,
    highPriority: newItemHighPriority.value
  })

  newItem.value = ""
  newItemHighPriority.value = false
}

function doEdit(startEditing) {
  editing.value = startEditing
  newItem.value = ''
  newItemHighPriority.value = false
}

function togglePurchased(item) {
  console.log("DB01: item clicked ans purchased ", item.purchased)
  item.purchased = !item.purchased
}

function deleteItem(id) {
  const indexToRemove = items.findIndex(item => item.id === id);
  if (indexToRemove !== -1) {
    items.splice(indexToRemove, 1);
  }
}

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

button {
  display: flex;
  border: none;
  background-color: inherit;
  cursor: pointer;
}

button:hover {
  color: red;
}

#shopping-list {

}

h1 {
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

#shopping-list > input,
#shopping-list > select {
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f8;
  color: #606f7b;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin: 0.5rem 0;
}

.add-item-form input {
  width: 70%;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f8;
  color: #606f7b;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin: 0.5rem 0;
}

.btn {
  border: none;
  border-radius: 3px;
  margin: auto 0;
  padding: 0.5rem 0.75rem;
  flex-shrink: 0;
  cursor: pointer;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: all 0.1s ease-in;
}

.btn[disabled] {
  background: #8795a1;
}

.btn[disabled]:hover {
  background: #606f7b;
}

.btn-primary {
  background: #6cb2eb;
  color: #fff;
}

.btn-primary:hover {
  background: #3490dc;
}

.btn-cancel {
  background: #ef5753;
  color: #fff;
}

.btn-cancel:hover {
  background: #e3342f;
  color: #fff;
}

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
</style>



