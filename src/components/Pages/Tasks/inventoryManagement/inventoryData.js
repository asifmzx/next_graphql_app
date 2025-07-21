export const inventory = [
  {
    productId: "P001",
    name: "Laptop",
    categories: ["Electronics", "Computing"],
    stock: [
      { location: "Warehouse 1", quantity: 5 },
      { location: "Warehouse 2", quantity: 15 },
    ],
    reorderThreshold: 10,
    suppliers: [
      { id: "S001", name: "TechSupply Co.", priority: 1 },
      { id: "S002", name: "Global Distributors", priority: 2 },
    ],
  },
  {
    productId: "P002",
    name: "Mouse",
    categories: ["Electronics", "Accessories"],
    stock: [
      { location: "Warehouse 1", quantity: 50 },
      { location: "Warehouse 3", quantity: 0 },
    ],
    reorderThreshold: 20,
    suppliers: [
      { id: "S003", name: "FastTech", priority: 1 },
      { id: "S004", name: "Accessory World", priority: 3 },
    ],
  },
  {
    productId: "P003",
    name: "Monitor",
    categories: ["Electronics", "Displays"],
    stock: [
      { location: "Warehouse 1", quantity: 2 },
      { location: "Warehouse 2", quantity: 1 },
    ],
    reorderThreshold: 5,
    suppliers: [{ id: "S005", name: "Vision Supplies", priority: 2 }],
  },
];