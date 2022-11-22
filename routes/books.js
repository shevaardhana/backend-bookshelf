var express = require("express");
var router = express.Router();
const Models = require('../models/index')

const Validator = require("fastest-validator");
const V = new Validator

router.get("/", async(req, res, next) => {

    try {
        const books = await Models.Books.findAll({})

        res.send({
            status: "success",
            data: books
        })
    }catch (err){
        res.send({
            error: err
        })
    }
    
});

router.get("/(:id)", async(req, res, next) => {

    try {

        const book_id = req.params.id;

        const book = await Models.Books.findOne({
            where: { id: book_id }
        })

        res.send({
            status: "success",
            data: book
        })
    } catch (err){
        res.send({
            error: err
        })
    }
    
});

router.post("/", async (req, res, next) => {

    //process
    const { name, year, author, summary, publisher, pageCount, readPage, finished, reading } = req.body;

    // const books = await Models.Books.findAll({})

    
    if(readPage <= pageCount){

        const book = await Models.Books.create({
            name: name,
            year: year,
            author: author,
            summary: summary,
            publisher: publisher,
            pageCount: pageCount,
            readPage: readPage,
            finished: finished,
            reading: reading
        });
    
        res.send({
            status: "success",
            message: 'Buku berhasil ditambahkan',
            data: book
        })
    }
    else if(readPage > pageCount){
        res.send({
            status: "fail",
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
    }
    
    if(name == null){
        res.send({
            status: "fail",
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
    }
});

router.put("/(:id)", async (req, res, next) => {

    try {

        const book_id = req.params.id;
        const { name, year, author, summary, publisher, pageCount, readPage, finished, reading } = req.body;

        if(readPage <= pageCount){

            await Models.Books.update({
                name: name,
                year: year,
                author: author,
                summary: summary,
                publisher: publisher,
                pageCount: pageCount,
                readPage: readPage,
                finished: finished,
                reading: reading
            }, {
                where: {
                    id: book_id
                }
            });
        
            res.send({
                status: "success",
                message: 'Buku berhasil Diupdate',
            })
        }
        else if(readPage > pageCount){
            res.send({
                status: "fail",
                message: 'Gagal mengubah buku. readPage tidak boleh lebih besar dari pageCount'
            })
        }
        
        if(name == null){
            res.send({
                status: "fail",
                message: 'Gagal mengubah buku. Mohon isi nama buku',
            })
        }
    } catch (err){
        res.send({
            error: err
        })
    }

})

router.delete("/(:id)", async(req, res, next) => {

    try {

        const book_id = req.params.id;

        await Models.Books.destroy({
            where: { id: book_id }
        })

        res.send({
            status: "success",
        })
    } catch (err){
        res.send({
            error: err
        })
    }
    
});



module.exports = router;