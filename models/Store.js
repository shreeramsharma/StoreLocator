const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

const StoreSchema = new mongoose.Schema({
    storeID : {
        type: String,
        required: [true,'please add a store id'],
        unique: true,
        trim: true,
        maxlength: [10,'store ID must be less than 10 characters']
    },
    address:{
        type: String,
        required: [true,'Please add an Address']
    },
    location: {
        type: {
          type: String, 
          enum: ['Point'],
          require: true
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      },
      createdAt: {
          type: Date,
          default: Date.now
      }
})

StoreSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
      };
    
      this.address = undefined;
      next();
    });
module.exports = mongoose.model('Store',StoreSchema)