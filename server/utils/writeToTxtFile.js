const fs = require('fs');


function writeToTxtFile(fileName, cartItemsList, totalPrice) {
    
    if (fs.existsSync(fileName)) {
        return;
    }
    for (let index = 0; index < cartItemsList.length; index++ ) {
        fs.appendFileSync(fileName, `${index+1}) ${cartItemsList[index].product_id.name}    ${cartItemsList[index].quantity} units    $${cartItemsList[index].price}\n` , (err) => {
        if (err) console.log(err.message);
        })  
    }
    fs.appendFileSync(fileName, `Total Price: $${totalPrice.totalPrice}\n` , (err) => {
        if (err) console.log(err.message);
    })   
};


module.exports = { writeToTxtFile };