const Store = require('../models/Store')


exports.getStores = async(req,res,next)=>{
    try {
        const stores = await Store.find();
        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server error'})
        
    }
};


exports.addStores = async(req,res,next)=>{
    try {
        const stores = await Store.create(req.body);
        
        return res.status(200).json({
            success: true,
            data: stores
        });
    } catch (error) {
        console.error(error);
        if(error.code===11000){
            return res.status(400).json({ error: 'This Store Already Exist'})
        }
        res.status(500).json({error: 'Server error'})
        
    }
};