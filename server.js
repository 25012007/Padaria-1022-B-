import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Olá Mundo'
})

server.post('/venda', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const {produto, valor, quantidade } = request.body
    database.create({
        produto: produto,
        valor: valor,
        quantidade : quantidade
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/venda', (request) => {
    const search = request.query.search

    console.log(search)

    const vendas = database.list(search)

    return vendas
})

server.put('/venda/:id', (request, reply) => {

    const vendaId = request.params.id
    const {tamanho, cor, tecido} = request.body
    const venda = database.update(vendaId, {
        produto,
        valor,
        quantidade,
    })
    return reply.status(204).send()
})

server.delete('/vendas/:id', (request, reply) => {
    const vendaId = request.params.id

    database.delete(vendaId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})