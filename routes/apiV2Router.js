const express = require('express');
const apiV2Router = express.Router();
const knexConfig = require ('../knexfile.js')[process.env.NODE_ENV || 'development']
const knex = require ('knex')(knexConfig)
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    if(req.headers.authorization ){
        const tokenType = req.headers.authorization.split(' ')[0]
        const token = req.headers.authorization.split(' ')[1]

        if(tokenType !== 'Bearer'){
            res.status(401).json({message: 'Autenticação inválida'})
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
                if(err){
                    res.status(401).json({message: 'Token inválido'})
                }
                else {
                    req.token = decoded
                    next()
                }
            })
        }
    }
    else
    res.status(401).json({message: 'Não autorizado'})
}

const isAdmin = (req, res, next) => {
 if(req.token.roles.indexOf('admin') === -1){
     res.status(403).json({message: 'Não autorizado'})
    }else{
        next()
    }
}

apiV2Router.get ('/produtos', checkToken, (req, res) => {
    knex ('produtos').select ('id', 'descricao', 'marca', 'valor')
        .then (dados => res.status(200).json (dados))
        .catch (err => {
            console.log (err)
            res.status(500).json ({ message: `Erro ao recuperar lista de produtos: ${err.message}` })
        })
})

apiV2Router.get ('/produtos/:id', checkToken, (req, res) => {
    let id = parseInt (req.params.id)
    knex ('produtos').select ('id', 'descricao', 'marca', 'valor').where ( {id: id})
        .then (dados => {
            if (dados.length===0) {
                res.status(404).json ({ message: `Produto ${id} não encontrado` })
            }else{
                res.status(200).json (dados[0])
            }

        })
        .catch (err => {
            console.log (err)
            res.status(500).json ({ message: `Erro ao recuperar lista de produtos: ${err.message}` })
        })
})

apiV2Router.post ('/produtos', checkToken, isAdmin, (req, res) => {
    let { descricao, marca, valor } = req.body
    knex ('produtos').insert ({ descricao, marca, valor })
        .then (dados => {
            res.status(201).json ({ message: 'Produto inserido', data:{ id: dados[0].id }})
        })
        .catch (err => {
            console.log (err)
            res.status(500).json ({ message: `Erro ao inserir produto: ${err.message}` })
        })
})

module.exports = apiV2Router;