import { reactive } from "vue";

export const shoppingItems = reactive({
        items: [
            { id: 1, label: '🍎 Pommes', purchased: false, highPriority: false },
            { id: 2, label: '🥦 Brocoli', purchased: false, highPriority: false },
            { id: 3, label: '🥬 Laitue', purchased: false, highPriority: false },
            { id: 4, label: '🍊 Oranges', purchased: false, highPriority: false },
        ],
        saveItem(newItem, newItemHighPriority) {
            if (!newItem.value) return false // Empêche l'utilisateur d'ajouter un article sans nom
            this.items.push({
              id: this.items.length + 1,
              label: newItem.value,
              purchased: false,
              highPriority: newItemHighPriority.value
            })
            return true
        },
        togglePurchased(id) {
            const itemToChange = this.items.find(item => item.id == id)
            itemToChange.purchased = !itemToChange.purchased
            this.items = this.items.map(item => {
                if (item.id === id) return itemToChange
                else return item
            })
        },
        deleteItem(id) {
            const indexToRemove = this.items.findIndex(item => item.id === id);
            if (indexToRemove !== -1) {
                this.items.splice(indexToRemove, 1);
            }
        }
    }
);