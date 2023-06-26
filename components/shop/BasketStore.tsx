import { makeAutoObservable } from "mobx"

class BasketStore {
    basketItems = []

    constructor() {
        makeAutoObservable(this)
    }

    addToBasket = (item) => {
        this.basketItems.push(item)
    }

    removeFromBasket = (itemId) => {
        this.basketItems = this.basketItems.filter(item => item.id !== itemId)
    }

    // more actions as needed...
}

export default new BasketStore()
