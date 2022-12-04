const { getProduct } = require('./products');
// CartItem: { id: 1, quantity: 2, productId: 1, userId: 'mp@np.edu' }
const list = [];

const { connect } = require('./mongo');

const COLLECTION_NAME = 'products'

async function collection() {
    const client = await connect();
    return client.db('shopper').collection(COLLECTION_NAME);
}

const get = async (userId) => {
  const db = await collection();
  const data = await db.find({ userId }).toArray();
  return await Promise.all( data
    .map(async (cartItem) => ({
      ...cartItem,
      product: await getProduct(cartItem.productId)
    })));
};

/**
 * 
 * @param {string} userId 
 * @param {string} productId 
 * @param {number} quantity 
 * @returns 
 */
const add = async (userId, productId, quantity) => {
  const db = await collection();
    let cartItem = await db.findOne({ userId, productId })
    if (cartItem) {
        cartItem.quantity += quantity;
        db.updateOne({ userId, productId }, { $set: cartItem })
    } else {
        cartItem = { id: list.length + 1, quantity, productId, userId };
        await db.insertOne(cartItem)
    }
    return { ...cartItem, product: await getProduct(productId) };
};

/**
  * 
  * @param {string} userId 
  * @param {string} productId 
  * @param {number} quantity 
  * @returns 
  */
const update = async (userId, productId, quantity) => {
  const db = await collection();
  console.log(userId, productId, quantity);
  if (quantity === 0) {
    db.deleteOne({ userId, productId })
      return "null";
    } else {
      let cartItem = await db.findOne({ userId, productId })
      cartItem.quantity = quantity;
      db.updateOne({ userId, productId }, { $set: cartItem })
      return { ...cartItem, product: await getProduct(productId) };
    }
}

module.exports = { add, get, update }