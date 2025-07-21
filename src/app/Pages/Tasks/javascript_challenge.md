# Practice :

1. Inventory Management: Stock and Supply Chain

```jsx
const inventory = [
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
    suppliers: [
      { id: "S005", name: "Vision Supplies", priority: 2 },
    ],
  },
];

```

### **Inventory Management: Stock and Supply Chain**

**Questions:**

1. Identify products that are low on stock across all warehouses based on their reorder thresholds. //done
2. Find the total stock available for each product across all warehouses. with min, max        //done
3. List the names of suppliers for products that are below the reorder threshold. //done
4. Check if all products have at least one supplier with a priority of 1.
5. Create a summary of each product, showing its name, total stock, and primary supplier.

```jsx
const employees = [
  {
    employeeId: "E001",
    name: "Alice Johnson",
    department: "Sales",
    performanceScores: [85, 90, 78],
    projects: [
      { projectId: "P001", name: "Client Acquisition", status: "Completed" },
      { projectId: "P002", name: "Sales Growth Initiative", status: "Ongoing" },
    ],
    certifications: ["Salesforce", "Leadership Training"],
  },
  {
    employeeId: "E002",
    name: "Bob Smith",
    department: "Engineering",
    performanceScores: [95, 92, 88],
    projects: [
      { projectId: "P003", name: "App Development", status: "Completed" },
      { projectId: "P004", name: "Bug Fix Sprint", status: "Completed" },
    ],
    certifications: ["AWS", "Kubernetes"],
  },
  {
    employeeId: "E003",
    name: "Charlie Davis",
    department: "HR",
    performanceScores: [72, 80, 68],
    projects: [
      { projectId: "P005", name: "Employee Onboarding", status: "Ongoing" },
    ],
    certifications: ["Diversity and Inclusion Training"],
  },
];

```

### **2. HR System: Employee Data and Performance Evaluation**

**Questions:**

1. Find employees who have completed all their projects.
2. Calculate the average performance score of each employee.
3. Identify employees who have certifications related to "AWS" or "Salesforce."
4. Check if there is at least one employee in the HR department who scored above 80 in any performance review.
5. Create a list of employees who are eligible for promotions (e.g., based on performance scores above a threshold of 85).

```jsx
const reviews = [
  {
    productId: "P001",
    reviews: [
      { reviewer: "John", rating: 4, comment: "Good quality, fast delivery." },
      { reviewer: "Sarah", rating: 5, comment: "Excellent product!" },
    ],
    averageRating: 4.5,
  },
  {
    productId: "P002",
    reviews: [
      { reviewer: "Mike", rating: 3, comment: "Average quality." },
      { reviewer: "Emma", rating: 2, comment: "Not as expected." },
    ],
    averageRating: 2.5,
  },
  {
    productId: "P003",
    reviews: [
      { reviewer: "Sophia", rating: 5, comment: "Perfect screen for gaming." },
      { reviewer: "Liam", rating: 4, comment: "Good display but expensive." },
    ],
    averageRating: 4.5,
  },
];

```

### **3. Product Reviews and Customer Insights**

**Questions:**

1. Identify products with an average rating less than 3.
2. List all unique reviewers across all products.
3. Check if there is at least one review for each product with a rating of 5.
4. Find the product with the most reviews.
5. Create a summary for each product, including the total number of reviews and the highest-rated review comment.

```jsx
const reviews = [
  {
    productId: "P001",
    reviews: [
      { reviewer: "John", rating: 4, comment: "Good quality, fast delivery." },
      { reviewer: "Sarah", rating: 5, comment: "Excellent product!" },
    ],
    averageRating: 4.5,
  },
  {
    productId: "P002",
    reviews: [
      { reviewer: "Mike", rating: 3, comment: "Average quality." },
      { reviewer: "Emma", rating: 2, comment: "Not as expected." },
    ],
    averageRating: 2.5,
  },
  {
    productId: "P003",
    reviews: [
      { reviewer: "Sophia", rating: 5, comment: "Perfect screen for gaming." },
      { reviewer: "Liam", rating: 4, comment: "Good display but expensive." },
    ],
    averageRating: 4.5,
  },
];

```

### **4. Supply Chain Network: Transport and Delivery**

**Questions:**

1. Find all shipments that are still "In Transit" or "Pending."
2. Calculate the total quantity of each product being transported across all shipments.
3. Identify the unique list of transport companies used for deliveries.
4. Check if all shipments with "Truck" transport have a valid tracking ID.
5. Create a report for each shipment showing its status, destination, and total number of items.

```jsx
const orders = [
  {
    orderId: "ORD001",
    customer: { id: "C001", name: "Eve Harris" },
    items: [
      { productId: "P001", quantity: 1, price: 1200 },
      { productId: "P002", quantity: 2, price: 25 },
    ],
    total: 1250,
    payment: { method: "Credit Card", status: "Completed" },
  },
  {
    orderId: "ORD002",
    customer: { id: "C002", name: "David Lee" },
    items: [
      { productId: "P003", quantity: 1, price: 300 },
    ],
    total: 300,
    payment: { method: "PayPal", status: "Pending" },
  },
  {
    orderId: "ORD003",
    customer: { id: "C003", name: "Sophia Miller" },
    items: [
      { productId: "P002", quantity: 4, price: 25 },
      { productId: "P003", quantity: 1, price: 300 },
    ],
    total: 400,
    payment: { method: "Credit Card", status: "Completed" },
  },
];

```

### **5. Customer Orders and Payment Management**

**Questions:**

1. Identify orders where the payment status is still "Pending."
2. Calculate the total revenue from all completed orders.
3. Find customers who purchased more than 3 items in a single order.
4. Check if any order contains a product priced above $1000.
5. Generate a summary of each order, including customer name, total items purchased, and payment method.