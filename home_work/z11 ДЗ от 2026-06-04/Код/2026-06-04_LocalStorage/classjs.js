"use strict"


document.addEventListener("DOMContentLoaded", () =>
{
    const output = document.querySelector("#output")

    class Date 
    {
        constructor(number)
        {
            this.number = number
            this.name = "Вася"
            this.age = "17"
            this.color = "red"
        }

        printDate()
        {
            output.textContent = `студент по ${this.name} возраст ${this.age} 
            цвет ${this.color}`
        }
        printNumber(number)
        {
            output.textContent += number
        }
    }

    class ListFruit
    {
        constructor(nameFruit, countFruit)
        {
            this.nameFruit = nameFruit
            this.countFruit = countFruit
        }
        showInfoFruit(place)
        {
            output.textContent += `${this.nameFruit}-${this.countFruit}-${place}`
        }
    }
    let date = new Date()
    let number = new Date()
    date.printDate()
    number.printNumber(6)

    let listFruit = new ListFruit(5, 9)
    listFruit.showInfoFruit(34)
    
    class Note
    {
        constructor(message, priority)
        {
            this.message = message;
            this.priority = parseInt(priority);
        }

    }

    class Show
    {
        constructor(note)
        {
            this.note = `${note.message} - ${note.priority}`
            this.__id = "hjfggjvhvhj"
        }
        showDate(time)
        {
            output.textContent += `${this.note}-${time} 
            ${this.constructor.name} - ${this.__id}`
        }
    }

    let note = new Note("сходить в магазин", 7);
    let show = new Show(note);
    show.showDate(" 11:00")

});