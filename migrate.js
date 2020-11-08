const models = require('./models')
const db = models.db
db.sync({ force: true });
console.log("All models were synchronized successfully.");