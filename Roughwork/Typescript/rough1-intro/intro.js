// function add(a: number , b: number): number{
//     return a + b
// }
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var InMemoryDB = /** @class */ (function () {
    function InMemoryDB() {
    }
    InMemoryDB.prototype.insertUser = function (data) {
        if (this._db.has(data.id)) {
            throw new Error("User with id ".concat(data.id, " already exist"));
        }
        this._db.set(data.id, data);
        return data.id;
    };
    InMemoryDB.prototype.updateUser = function (id, updateData) {
        if (!this._db.has(id)) {
            throw new Error("User with id ".concat(id, " does not exist"));
        }
        this._db.set(id, __assign(__assign({}, updateData), { id: id }));
    };
    return InMemoryDB;
}());
var myDB = new InMemoryDB();
myDB.insertUser({
    id: 1,
    fname: "sattya",
    email: "satya.sootar@gmail.com",
    contact: {
        mobile: "123456"
    },
    address: {
        street: 12,
        pin: 21321,
        country: "india"
    }
});
