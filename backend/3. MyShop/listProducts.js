var faker = require("faker")

console.log("Welcome to " + faker.company.companyName());
console.log("Please review our items: ")
for(let i=0; i<10; i++){
    console.log(faker.commerce.product() + " for " + faker.commerce.price() + " each");
}