const express = require('express');
const apiSeg = express. Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const knexConfig = require ('../knexfile.js')[process.env.NODE_ENV || 'development']
const knex = require ('knex')(knexConfig)

apiSeg.post ('/register', (req, res) => {
    
})

apiSeg.post ('/login', (req, res) => {
    let { login, senha } = req.body  
    knex ('usuarios').where ( {login: login})
        .then (dados => {
            if (dados.length===0) {
                res.status(404).json ({ message: `Usuário ${login} não encontrado` })
            } else {
                let usuario = dados[0]
                if(bcrypt.compareSync(senha, usuario.senha)){
                    jwt.sign({ id: usuario.id, roles: usuario.roles }, process.env.SECRET_KEY, { expiresIn: '1h'}, (err, token) => {
                    if(err){
                        res.status(500).json({message: `Erro ao gerar token: ${err.message}`})
                    }else{
                        res.status(200).json({token: token})
                    }
                     })
                } else {
                    res.status(401).json ({ message: `Usuário ou senha inválido` })
                }
            }
        })
        .catch (err => {
            console.log (err)
            res.status(500).json ({ message: `Erro ao recuperar lista de produtos: ${err.message}` })
        })
})

module.exports = apiSeg;