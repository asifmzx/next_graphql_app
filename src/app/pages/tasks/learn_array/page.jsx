import React from 'react'

const arrayPush = () => {
    let fruits = ["apple", "banana"]
    fruits.push("coconut")
    let checkLength = fruits.push("orange")
    fruits.push(6)
    console.log(fruits)
    console.log(checkLength)
}

const arrayPop = () => {
    let fruits = ["apple", "banana", "orange"]
    let poppedFruits = fruits.pop()
    console.log(fruits)
    console.log(poppedFruits)
}

const arrayShift = () => {
    let fruits = ["apple", "banana", "orange"]
    let shiftedFruit = fruits.shift()
    console.log(fruits)
    console.log(shiftedFruit)
}

const arrayUnshift = () => {
    let fruits = ["banana", "orange"]
    let newLength = fruits.unshift("apple", "mango")
    console.log(fruits)
    console.log(newLength)
}

const arraySlice = () => {
    let fruits = ["apple", "banana", "orange", "mango", "grape"]
    let slicedFruits = fruits.slice(1, 3)
    console.log(fruits)
    console.log(slicedFruits)
}

const arraySplice = () => {
    let fruits = ["apple", "banana", "orange", "mango"]
    let splicedFruits = fruits.splice(1, 2, "kiwi", "grape")
    console.log(fruits)
    console.log(splicedFruits)
}

const arrayConcat = () => {
    let fruits = ["apple", "banana"]
    let vegetables = ["carrot", "potato"]
    let combined = fruits.concat(vegetables, "grape")
    console.log(fruits)
    console.log(combined)
}

const arrayJoin = () => {
    let fruits = ["apple", "banana", "orange"]
    let joinedString = fruits.join(", ")
    console.log(fruits)
    console.log(joinedString)
}

const arrayReverse = () => {
    let fruits = ["apple", "banana", "orange"]
    fruits.reverse()
    console.log(fruits)
}

const arraySort = () => {
    let fruits = ["orange", "apple", "banana"]
    fruits.sort()
    console.log(fruits)
}

const arrayIndexOf = () => {
    let fruits = ["apple", "banana", "orange", "banana"]
    let index = fruits.indexOf("banana")
    let lastIndex = fruits.lastIndexOf("banana")
    console.log(fruits)
    console.log(index)
    console.log(lastIndex)
}

const arrayIncludes = () => {
    let fruits = ["apple", "banana", "orange"]
    let hasApple = fruits.includes("apple")
    let hasGrape = fruits.includes("grape")
    console.log(fruits)
    console.log(hasApple)
    console.log(hasGrape)
}

const arrayForEach = () => {
    let fruits = ["apple", "banana", "orange"]
    fruits.forEach((fruit, index) => {
        console.log(`${index}: ${fruit}`)
    })
}

const arrayMap = () => {
    let numbers = [1, 2, 3, 4]
    let doubled = numbers.map(num => num * 2)
    console.log(numbers)
    console.log(doubled)
}

const arrayFilter = () => {
    let numbers = [1, 2, 3, 4, 5, 6]
    let evenNumbers = numbers.filter(num => num % 2 === 0)
    console.log(numbers)
    console.log(evenNumbers)
}

const arrayFind = () => {
    let numbers = [1, 2, 3, 4, 5]
    let found = numbers.find(num => num > 3)
    let foundIndex = numbers.findIndex(num => num > 3)
    console.log(numbers)
    console.log(found)
    console.log(foundIndex)
}

const arrayReduce = () => {
    let numbers = [1, 2, 3, 4, 5]
    let sum = numbers.reduce((acc, num) => acc + num, 0)
    console.log(numbers)
    console.log(sum)
}

const arraySome = () => {
    let numbers = [1, 2, 3, 4, 5]
    let hasEven = numbers.some(num => num % 2 === 0)
    console.log(numbers)
    console.log(hasEven)
}

const arrayEvery = () => {
    let numbers = [2, 4, 6, 8]
    let allEven = numbers.every(num => num % 2 === 0)
    console.log(numbers)
    console.log(allEven)
}

const arrayFlat = () => {
    let nestedArray = [1, [2, 3], [4, [5, 6]]]
    let flattened = nestedArray.flat()
    let deepFlattened = nestedArray.flat(2)
    console.log(nestedArray)
    console.log(flattened)
    console.log(deepFlattened)
}

const arrayFlatMap = () => {
    let numbers = [1, 2, 3]
    let doubled = numbers.flatMap(num => [num, num * 2])
    console.log(numbers)
    console.log(doubled)
}

const arrayFill = () => {
    let numbers = [1, 2, 3, 4, 5]
    numbers.fill(0, 1, 3)
    console.log(numbers)
}

const arrayCopyWithin = () => {
    let numbers = [1, 2, 3, 4, 5]
    numbers.copyWithin(0, 3, 5)
    console.log(numbers)
}

const arrayFrom = () => {
    let str = "hello"
    let arrayFromString = Array.from(str)
    let arrayFromLength = Array.from({length: 5}, (_, i) => i * 2)
    console.log(arrayFromString)
    console.log(arrayFromLength)
}

const arrayOf = () => {
    let numbers = Array.of(1, 2, 3, 4, 5)
    console.log(numbers)
}

const arrayIsArray = () => {
    let fruits = ["apple", "banana"]
    let notArray = "hello"
    console.log(Array.isArray(fruits))
    console.log(Array.isArray(notArray))
}

const page = () => {
  return (
    <div>
    </div>
  )
}

export default page
