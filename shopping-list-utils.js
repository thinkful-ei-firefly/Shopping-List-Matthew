//RENDER
const generateShoppingItemsString = shoppingList => {
  const items = shoppingList.map(item => generateItemElement(item));
  return items.join("");
};

const generateItemElement = item => {
  return `
      <li data-item-id="${item.id}">
        <span class="shopping-item js-shopping-item ${
          item.checked ? "shopping-item__checked" : ""
        }">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
              <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
              <span class="button-label">delete</span>
          </button>
          <button class="shopping-item-edit js-item-edit">
              <span class="button-label">edit</span>
          </button>
        </div>
      </li>`;
};

//ADD ITEM
const addItemToShoppingList = itemName =>
  STORE.items.push({ id: cuid(), name: itemName, checked: false });

//TOGGLE CHECK
const toggleCheckedForListItem = itemId => {
  const item = STORE.items.find(item => item.id === itemId);
  item.checked = !item.checked;
};

const getItemIdFromElement = item => {
  return $(item)
    .closest("li")
    .data("item-id");
};
//DELETE ITEM
const deleteItem = id => {
  const index = STORE.items.findIndex(item => item.id === id);
  STORE.items.splice(index, 1);
};

//Toggle Hide Filter
function toggleHideFilter() {
  STORE.hideCompleted = !STORE.hideCompleted;
}

//EDIT

const editItem = (newName, id) => {
  const index = STORE.items.findIndex(item => item.id === id);
  STORE.items[index].name = newName;
};

//Change
