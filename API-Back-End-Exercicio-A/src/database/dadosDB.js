exports.run = async (mongoose) => {
    require("dotenv").config()
    mongoose.connect(`${process.env.MONGODB}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Banco de dados LIGADO com sucesso")
        }
    })
}