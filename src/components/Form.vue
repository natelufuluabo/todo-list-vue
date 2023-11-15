<template>
    <button v-if="editing" @click="doEdit(false)" class="btn btn-cancel">Annuler</button>
    <button v-else @click="doEdit(true)" class="btn btn-primry">Ajouter un article</button>

    <div v-if="editing" class="add-item-form">
      <input @keyup.enter="submitForm" type="text" v-model="newItem" placeholder="Ajout d'un article">
      <label>
        <input type="checkbox" v-model="newItemHighPriority">
        Haute Priorité
      </label>
      <button @click="submitForm" class="btn btn-primary">
        Enregistrer
      </button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { shoppingItems } from '../store';
const editing = ref(false);
const newItem = ref('');
const newItemHighPriority = ref(false);

function submitForm() {
  if (shoppingItems.saveItem(newItem, newItemHighPriority)) {
    newItem.value = ""
    newItemHighPriority.value = false
  }
}

function doEdit(startEditing) {
  editing.value = startEditing
  newItem.value = ''
  newItemHighPriority.value = false
}
</script>
<style>
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

input[type="checkbox"]{
  display: inline !important;
  box-shadow: none;
  width: auto;
}
</style>