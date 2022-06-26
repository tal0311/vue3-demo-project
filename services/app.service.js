'use strict'
import { utilsService } from './util.service.js'

const KEY = 'ITEMS'
const ACT_KEY = 'ACTIVITIES'
var gItems = []
createItems()
function getItems() {
  const items = utilsService.loadFromStorage(KEY)
  if (items.length > 0) {
    gItems = items
  }
  return gItems
}

// creating data
function createItems() {
  gItems.push(createItem('tal1', '0543113309', 'tal0311@gmial.com'))
  gItems.push(createItem('tal2', '0543111509', 'tal@gmial.com'))
  gItems.push(createItem('tal3', '0543112246', 'tal.amit@gmial.com'))
}

function createItem(name, cellNum, email) {
  return {
    _id: utilsService.makeId(),
    name,
    cellNum,
    email,
  }
}

function removeItem(itemId) {
  let foundItem = getItemById(itemId)
  gItems = gItems.filter((item) => item._id !== foundItem._id)
  utilsService.saveToStorage(KEY, gItems)
  return gItems.findIndex((item) => item._id === itemId)
}

function getItemById(itemId) {
  return gItems.find((item) => item._id === itemId)
}

function save(item) {
  if (item._id) {
    console.log('update item', item)
    const idx = gItems.findIndex((i) => i._id === item._Id)
    gItems.splice(idx, 1, item)
    console.log(gItems)
  } else {
    console.log('new item save', item)
    item._id = utilsService.makeId()
    gItems.push(item)
  }
  utilsService.saveToStorage(KEY, gItems)
  return item
}

function getEmptyItem() {
  return {
    name: '',
    cellNum: '',
    email: '',
  }
}

function createActivity(desc) {
  return {
    _id: utilsService.makeId(),
    desc,
    cratedAt: Date.now(),
  }
}
function logActivities(activities) {
  if (!activities.length) return
  utilsService.saveToStorage(ACT_KEY, activities)
}
export const appService = {
  getItems,
  getEmptyItem,
  save,
  removeItem,
  getItemById,
  createActivity,
  logActivities,
}
