const getDb = require("../util/database").getDb;

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, _id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = _id;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity
      });
    }
    updatedCartItems;
    const updatedCart = {
      items: updatedCartItems
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
