 export const familyTree = [
  {
    name: "Grandpa Joe",
    age: 78,
    location: "Village A",
    parents: [
      {
        name: "Papa John",
        age: 50,
        location: "City B",
        money: 8000,
        children: [
          {
            name: "Alex",
            age: 27,
            location: "City C",
            money: 3000,
            wife: [
              {
                name: "Emily",
                age: 26,
                location: "City C",
                hobbies: ["painting", "reading"],
                family: [
                  {
                    father: {
                      name: "Mr. Smith",
                      age: 58,
                      location: "Town D",
                    },
                    mother: {
                      name: "Mrs. Smith",
                      age: 56,
                      location: "Town D",
                    },
                  },
                ],
              },
            ],
            children: [
              {
                name: "Liam",
                age: 4,
                location: "City C",
                toys: ["blocks", "train", "puzzle"],
              },
            ],
          },
          {
            name: "Anna",
            age: 23,
            location: "City B",
            money: 1500,
            husband: [
              {
                name: "Daniel",
                age: 25,
                location: "City B",
                job: "Engineer",
              },
            ],
          },
        ],
      },
      {
        name: "Uncle Sam",
        age: 48,
        location: "City D",
        money: 6000,
        children: [
          {
            name: "Cousin Mike",
            age: 21,
            location: "City E",
            money: 2000,
            girlfriend: [
              {
                name: "Rachel",
                age: 20,
                location: "City F",
                interests: ["music", "sports"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Grandma Lucy",
    age: 75,
    location: "Village Z",
    parents: [
      {
        name: "Mom Clara",
        age: 53,
        location: "City Y",
        money: 9000,
        children: [
          {
            name: "Meghan",
            age: 28,
            location: "City X",
            money: 3200,
            husband: [
              {
                name: "Ryan",
                age: 30,
                location: "City X",
                job: "Doctor",
                pets: [
                  {
                    type: "Dog",
                    name: "Buddy",
                    age: 3,
                  },
                  {
                    type: "Cat",
                    name: "Whiskers",
                    age: 2,
                  },
                ],
              },
            ],
            children: [
              {
                name: "Olivia",
                age: 3,
                favoriteFoods: ["pasta", "apple", "milk"],
              },
              {
                name: "Noah",
                age: 1,
                favoriteFoods: ["banana", "cereal"],
              },
            ],
          },
        ],
      },
    ],
  },
];
