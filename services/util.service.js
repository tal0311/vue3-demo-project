'use strict'

function makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function saveToStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item))
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

export const utilsService = {
  makeId,
  saveToStorage,
  loadFromStorage,
}
