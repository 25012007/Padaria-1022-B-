import { randomUUID } from "crypto"


export class DatabaseMemory{
    #vendas = new Map()

list(search){
    return Array.from(this.#vendas.entries()).map((vendaArray) => {
        const id = vendaArray[0]

        const data= vendaArray[1]

        return{
            id,
            ...data,
        }
    })

    .filter(venda => {
        if (search) {
            return venda.produto.includes(search)
         }
         return true
    })
}

    create(venda){
        const vendaId = randomUUID()
        this.#vendas.set(vendaId, venda)
    }
    
    update(id, venda){
        this.#vendas.set(id, venda)
    }

    delete(id, venda){
        this.#vendas.delete(id, venda)
    }
}