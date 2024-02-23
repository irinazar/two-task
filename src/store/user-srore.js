import { makeAutoObservable } from "mobx";
import products from "../products";
import { message } from "antd";

class UserStore {
  user = null;
  cart = [];
  products = [];
  purchaseHistory = [];

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
    this.loadCart();
    this.syncCartWithLocalStorage();
    this.syncPurchaseHistory();
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem("userEmail", user.email);
    this.loadCart();

    const historyKey = `${user.email}_purchaseHistory`;

    const userPurchaseHistory = localStorage.getItem(historyKey);
    this.purchaseHistory = userPurchaseHistory
      ? JSON.parse(userPurchaseHistory)
      : [];
  }

  loadProducts() {
    this.products = products;
  }

  addToCart(item) {
    if (!this.user) {
      message.warning(
        "Пожалуйста, войдите или зарегистрируйтесь, чтобы добавить товар в корзину"
      );
      return;
    }

    const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);

    if (index !== -1) {
      this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
      message.success("Товар успешно удален из корзины!");
    } else {
      this.cart.push(item);
      message.success("Товар успешно добавлен в корзину!");
    }
    this.syncCartWithLocalStorage();
  }

  addToPurchaseHistory(order) {
    this.purchaseHistory.push(order);

    this.syncPurchaseHistory();
    this.cart = [];
  }

  syncPurchaseHistory() {
    if (this.user) {
      const userEmail = this.user.email;

      const historyKey = `${userEmail}_purchaseHistory`;

      localStorage.setItem(historyKey, JSON.stringify(this.purchaseHistory));
      localStorage.removeItem(this.user.email);
    }
  }

  loadUser() {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      this.user = { email: userEmail };
    }
  }

  loadCart() {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      const userCart = JSON.parse(localStorage.getItem(userEmail));

      const historyKey = `${userEmail}_purchaseHistory`;
      const purchaseHistory = JSON.parse(localStorage.getItem(historyKey));

      if (userCart) {
        this.cart = userCart?.map((productId) =>
          products.find((product) => product?.id === productId)
        );
      }
      if (purchaseHistory) {
        this.purchaseHistory = purchaseHistory;
      }
    }
  }

  syncCartWithLocalStorage() {
    if (this.user) {
      const userEmail = this.user.email;
      localStorage.setItem(
        userEmail,
        JSON.stringify(this.cart.map((item) => item.id))
      );
    }
  }

  logout() {
    localStorage.removeItem("userEmail");
    this.user = null;
    this.cart = [];
    this.purchaseHistory = [];
  }
}

export const userStore = new UserStore();
