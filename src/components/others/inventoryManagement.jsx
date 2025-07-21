import React from 'react'
import { inventory } from '../Pages/Tasks/inventoryManagement/inventoryData'

const inventoryManagement = () => {
    const showLowStockProduct = () => {
        const objData = inventory.map((item) => {
            const tempData2 = item.stock
            tempData2.forEach((itemv2) => {
                if ((itemv2.quantity - item.reorderThreshold) < 0) console.log("Item:", item.name, ",", "Warehouse:", itemv2.location, "need restock")
            })
        })
    }
    // for problem 1
    // showLowStockProduct()

    const showPerProductQuantity = () => {
        let min = 0;
        let max = 0;
        let i = 0;
        let warehouse = "";
        const objData = inventory.map((item) => {
            let sum = 0;
            const tempData2 = item.stock
            tempData2.forEach((itemv2) => {
                sum = sum + itemv2.quantity
                if (i == 0) {
                    min = sum;
                    max = sum;
                }
                if (sum > max) {
                    max = sum
                } else {
                    min = sum
                }
                warehouse = itemv2.location
            })
            console.log("Item Name:", item.name, "Warehouse:", warehouse, "Stock:", sum)
            i = i + 1
        })
        console.log("Max:", max, "Min:", min)
        // console.log(i)
    }
    // for problem 2
    // showPerProductQuantity()

    const showSuppliersBlwReTh = () => {
        const objData = inventory.map((item) => {
            const tempData2 = item.stock
            tempData2.forEach((itemv2) => {
                if ((itemv2.quantity - item.reorderThreshold) < 0) {
                    const supData = item.suppliers
                    // console.log(supData)
                    supData.forEach((itemv3) => console.log(itemv3.name))
                }
            })
        })
    }
    //for problem 3
    // showSuppliersBlwReTh()

    const showSupWithPrioOne = () => {
        const objData = inventory.map((item) => {
            const tempData2 = item.suppliers
            let priOne = 0
            tempData2.forEach((itemv2) => {
                if (itemv2.priority == 1) priOne += 1;
            })
            // console.log(priOne)
            if (priOne == 0) console.log(item.name, "This product has not priority at least 1 supplier")
        })
    }
    //for problem 4
    // showSupWithPrioOne()

    const showSummary = () => {
        const objData = inventory.map((item) => {
            const tempName = item.name
            let tempStock = 0;
            const totalStockData = item.stock
            totalStockData.forEach((itemv2) => {
                tempStock += itemv2.quantity
            })
            const priSup = item.suppliers
            let priSupName = "";
            priSup.forEach((itemv3) => {
                if (itemv3.priority == 1) priSupName = itemv3.name;
                else return
            })
            if(priSupName!=="") console.log(tempName, tempStock, priSupName)
        })
    }
    //for problem 5
    // showSummary()
    return (
        <div>
        </div>
    )
}

export default inventoryManagement
