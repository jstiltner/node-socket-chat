(function(){
'use strict'

const ws = io.connect()

ws.on('connection', socket =>{
  console.log('socket connection', socket)
})

ws.on('receiveChat', msg => {
  displayChat(msg.name, msg.text)
})

const form = document.querySelector('form')
const name = document.querySelector('input[name="name"]')
const text = document.querySelector('input[name="text"]')
const ul = document.querySelector('ul')

// const lis = document.querySelectorAll('li')

form.addEventListener('submit', event => {

 displayChat(name.value, text.value)

 ws.emit('sendChat', {
  name: name.value,
  text: text.value
 })

  text.value = ''

  text.focus();

  event.preventDefault()
})

function displayChat (name, text) {
  const li = generateLI(name, text);

ul.appendChild(li)
}

function generateLI(name, text){
  const li = document.createElement('li')
  const textNode = document.createTextNode(`${name} :: ${text}`)
  li.appendChild(textNode)
  return li
}



}());
