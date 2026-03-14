// function add(a: number , b: number): number{
//     return a + b
// }

// let value = add(4,6)


// Interfaces

interface User{
    id: number
    fname: string,
    lname?: string | undefined,
    email: string,
    contact:{
        mobile: string
    },
    address:{
        street: number,
        pin: number,
        country: string
    }
}

class InMemoryDB{
    private _db: Map<User["id"], User>
    constructor (){

    }

    public insertUser(data: User): User["id"]{
        if(this._db.has(data.id)){
            throw new Error(`User with id ${data.id} already exist`)
        }

        this._db.set(data.id, data )
        return data.id
    }

    public updateUser(id: User['id'], updateData: Omit<User, "id">){
        if(!this._db.has(id)){
            throw new Error(`User with id ${id} does not exist`)
        }

        this._db.set(id, {...updateData, id})
    }

    public getUserById(id: User["id"]): User{
        if(!this._db.has(id)) throw new Error(`User with id:${id} does not exist`)
        return this._db.get(id)!
    }
}

const myDB = new InMemoryDB()
myDB.insertUser({
    id: 1,
    fname: "sattya",
    email: "satya.sootar@gmail.com",
    contact:{
        mobile: "123456"
    },
    address:{
        street: 12,
        pin: 21321,
        country: "india"
    }
})