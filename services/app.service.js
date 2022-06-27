'use strict'
import { utilsService } from './util.service.js'

const KEY = 'ITEMS'
const ACT_KEY = 'ACTIVITIES'
var gItems = []
createItems()

function query() {
  return utilsService.loadFromStorage(KEY)
}

// creating data
function createItems() {
  let items = utilsService.loadFromStorage(KEY)
  if (!items || !items.length) {
    const items = []
    items.push(createItem('tal1', '0543113309', 'tal0311@gmial.com'))
    items.push(createItem('tal2', '0543111509', 'tal@gmial.com'))
    items.push(createItem('tal3', '0543112246', 'tal.amit@gmial.com'))
    utilsService.saveToStorage(KEY, gItems)
  }
  return items
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
  let items = query()
  const idx = items.findIndex((item) => item._id === itemId)
  items.splice(idx, 1)
  utilsService.saveToStorage(KEY, items)
  return
}

function getItemById(itemId) {
  return query().find((item) => item._id === itemId)
}

function save(item) {
  const items =query()
  if (item._id) {
    console.log('update item', item)
    const idx = items.findIndex((i) => i._id === item._Id)
    items.splice(idx, 1, item)
    console.log(items)
  } else {
    console.log('new item save', item)
    item._id = utilsService.makeId()
    items.push(item)
  }
  utilsService.saveToStorage(KEY, items)
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
  query,
  getEmptyItem,
  save,
  removeItem,
  getItemById,
  createActivity,
  logActivities,
}
