const router = require("express").Router();
const { User, Post, Comment, Algae } = require("../models");
const withAuth = require('..utils/auth')

routet.get('?', async(req, res) => {
    try{
        const renderAlgaeData = await Algae.findAll({
            limit: 20,
            order:[
                'SiteVisitDate', 'DESC'
            ]
        })

        console.log(renderAlgaeData);

    }catch(error){
        res.status(500).json(error);
    }

})

module.exports = router;