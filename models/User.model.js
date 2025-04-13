const { Schema, model } = require("mongoose");


const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Username is mandatory'],
			minlength: [3, 'Username is too short']
		},
		role: {
			type: String,
			enum: ['USER', 'ADMIN'],
			default: 'USER'
		},
		email: {
			type: String,
			required: [true, 'Email is mandatory.'],
			unique: true,
			lowercase: true,
			trim: true
		},
		password: {
			type: String,
			required: [true, 'Password is mandatory.']
		},
		purchasedProduct: [{
			type: {
				product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
				options: { type: Map, of: String }, // Store customizable options as key-value pairs
				price: { type: Number, required: true }, // Store price as a number
				quantity: { type: Number, default: 1 }, // Store quantity as a number
				purchaseMethod: { type: String, required: true }, // Store purchase method
				purchaseDate: { type: Date, default: Date.now }, // Store purchase date
				shipmentAddress: { type: String, required: true } // Store shipment address
			}
		}],
		cart: [{
			type: {
				product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
				options: { type: Map, of: String }, // Store customizable options as key-value pairs
				price: { type: Number, required: true }, // Store price as a number
				quantity: { type: Number, default: 1 } // Store quantity as a number
			}
		}]
	},
	{
		timestamps: true
	}
);


const User = model("User", userSchema);
module.exports = User;
