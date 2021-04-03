import * as flatbuffers from 'flatbuffers'
import short from 'short-uuid'
import fs from 'fs'
import { Cart } from './shopping-cart/cart'
import { Item } from './shopping-cart/item'

const BUFFER_SIZE = 1024
const UUID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

interface ItemSchema {
  id: string
  name: string
  price: number
}

interface CartSchema {
  items: ItemSchema[]
  total: number
}

const uuid = short(UUID_ALPHABET)
const cartSeed: CartSchema = {
  items: [
    {
      id: uuid.generate(),
      name: 'Milk',
      price: 5,
    },
    {
      id: uuid.generate(),
      name: 'Cereal',
      price: 10,
    },
  ],
  total: 15,
}

const cartWriter = (cart: CartSchema) => {
  const builder = new flatbuffers.flatbuffers.Builder(BUFFER_SIZE)

  const items = []
  for (const item of cart.items) {
    const itemId = builder.createString(item.id)
    const itemName = builder.createString(item.name)

    Item.startItem(builder)
    Item.addId(builder, itemId)
    Item.addName(builder, itemName)
    Item.addPrice(builder, item.price)

    const _item = Item.endItem(builder)
    items.push(_item)
  }

  const itemsVector = Cart.createItemsVector(builder, items)

  Cart.startCart(builder)
  Cart.addItems(builder, itemsVector)
  Cart.addTotal(builder, cart.total)
  const _cart = Cart.endCart(builder)

  builder.finish(_cart)
  const buffer = builder.asUint8Array()

  fs.writeFileSync('cart.dat', buffer)
}

const cartReader = () => {
  const data = fs.readFileSync('cart.dat')
  const buffer = new flatbuffers.flatbuffers.ByteBuffer(data)
  const cart = Cart.getRootAsCart(buffer)
  for (let i = 0; i < cart.itemsLength(); i++) {
    const item = cart.items(i)
    console.log(`${item?.id()} | ${item?.name()} | ${item?.price()}`)
  }
  console.log(`Total: ${cart.total()}`)
}

cartWriter(cartSeed)
cartReader()
