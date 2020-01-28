// What a customer object looks like 
//   { 
//   customerName: "name", 
//   customerPhone: "nnn-nnn-nnnn",
//   customerEmail: "email@gmail.com",
//   customerID: id
//  }

class Customer {
    constructor(name, phone, email) {
        if (name !== null && name !== '') this.customerName = name;
        if (phone !== null && phone !== undefined) this.customerPhone = phone;
        if (email !== null && email !== undefined) this.customerEmail = email;
         
        this.customerID = ++Customer.counter; 
        // figure out how to make a unique id  
    }
    
    
    getName() {
        return this.customerName;
    }
    
    getId() {
        return this.customerID;
    }
    
    getEmail() {
        return this.customerEmail;
    }
    
    getPhone () {
        return this.customerPhone; 
    }
}

Customer.counter = 0;   // will increment this for each customer 
 
module.exports = Customer;

