import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSetting = {
    databaseURL: "https://cart-802a1-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "taskList")

const items = document.getElementById("input");
const button = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping_list")

button.addEventListener("click", function () {
    let current_Items = items.value

    push(shoppingListInDB, current_Items)

    clearInputFeild()
    // console.log(current_Items);

})
onValue(shoppingListInDB, function (snapshot) {

    if (snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())

        clearShoppingList()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            // let currentItemID = currentItem[0]
            // let currentItemValues = currentItem[1]

            appendItemToList(currentItem)
            //console.log(itemsArray[i])
        }
    }
    else {
        shoppingListEl.innerHTML = "No items here .....yet"
    }

    //console.log(itemsArray)

})//converting snapshots int a array


function clearShoppingList() {
    shoppingListEl.innerHTML = ""
}
function clearInputFeild() {
    items.value = "" //empty after adding
}

function appendItemToList(current_Items) {

    let itemID = current_Items[0]
    let itemName = current_Items[1]
    // shoppingListEl.innerHTML += `<li> ${current_Items}</li>` //add data to list
    let newEL = document.createElement("li")
    newEL.textContent = `${itemName}`

    newEL.addEventListener("click", function () {
        let exactLocationInDb = ref(database, `taskList/${itemID}`)

        remove(exactLocationInDb)

    })
    shoppingListEl.append(newEL)
}