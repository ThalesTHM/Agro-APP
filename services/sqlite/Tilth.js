import db from './SQLiteDatabase'

db.execSync("CREATE TABLE IF NOT EXISTS Tilth " + 
    "(id_tilth INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, tilth_type TEXT NOT NULL, tilth_start_date TEXT NOT NULL, ground_type TEXT NOT NULL)")

async function create (obj){
    
    return new Promise( (resolve, reject) => {
        let result = db.runSync("INSERT INTO Tilth (tilth_type, tilth_start_date, ground_type) VALUES (?, ?, ?)", [obj.tilthType, obj.tilthStartDate, obj.groundType])
        
        if(result.changes > 0) 
            resolve(result.lastInsertRowId)
        else
            reject('Error inserting obj: ' + JSON.stringify(obj)) 

        reject('Not resolved ' + result)


        /*
        db.transaction(tx => {
            tx.executeSql("INSERT INTO Tilth (tilth_type, tilth_start_date, ground_type) VALUES (?, ?, ?)", [obj.tilthType, obj.tilthStartDate, obj.groundType],
                (_, {rowsAffected, insertId}) => {
                    if(rowsAffected > 0)
                        resolve(insertId)       
                    else
                        reject('Error inserting obj: ' + JSON.stringify(obj))
                },
                error => reject(error)
            )
        })*/
    })
}

const remove = (id) => {
    return new Promise( (resolve, reject) => {
        let result = db.runSync("DELETE FROM Tilth WHERE id_tilth=?", [id])
        
        if(result.changes > 0) 
            resolve(result.lastInsertRowId)
        else
            reject('Error removing: id=' + id) 
        
        reject('Not resolved ' + result)
        
        
        /*
                db.transaction(tx => {
            tx.executeSql("DELETE FROM Tilth WHERE id_tilth=?", [id],
                (_, {rowsAffected, insertId}) => {
                    if(rowsAffected > 0)
                        resolve(insertId)
                    else
                        reject('Error inserting obj: ' + JSON.stringify(obj))
                },
                error => reject(error)
            )
        })
        */
    })
}

const update = (id, obj) => {
    return new Promise( (resolve, reject) => {
        let result = db.runSync('UPDATE Tilth SET tilth_type=?, tilth_start_date=?, ground_type=? WHERE id_tilth=?', [obj.tilthType, obj.tilthStartDate, obj.groundType, id])
        
        if(result.changes > 0) 
            resolve(result.lastInsertRowId)
        else
            reject('Error updating obj: id=' + id)

        reject('Not resolved ' + result)

        /*
        db.transaction(tx => {
            tx.executeSql('UPDATE Tilth SET tilth_type=?, tilth_start_date=?, ground_type=? WHERE id_tilth=?', [obj.tilthType, obj.tilthStartDate, obj.groundType, id],
                (_, {rowsAffected}) => {
                    if(rowsAffected > 0)
                        resolve(rowsAffected)
                    else
                        reject('Error updating obj: id=' + id)
                },
                error => reject(error)
            )
        })
        */
    })
}

const find = (id) => {
    return new Promise( (resolve, reject) => {
        const foundElement = db.getFirstSync("SELECT * FROM Tilth WHERE id_tilth=?", [id])
        
        if(foundElement == null)
            reject('Obj not found: id=' + id)
        else
            resolve(foundElement)

        reject('Not resolved ' + foundElement)
        

        /*
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Tilth WHERE id_tilth=?", [id],
                (_, {rows}) => {
                    if(rows.length > 0)
                        resolve(rows._array[0])
                    else
                        reject('Obj not found: id=' + id)
                },
                error => reject(error)
            )
        })
        */
    })
}

const all = () => {
    return new Promise( (resolve, reject) => {
        let all = db.getAllSync("SELECT * FROM Tilth")

        if(all.length > 0)
            resolve(all)
        else
            reject('Error table is empty')

        reject('Not resolved ' + all)

        /*
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Tilth", null,
                (_, {rows}) => {
                    if(rows.length > 0)
                        resolve(rows._array)
                    else
                        reject('Error table is empty')
                    
                },
                error => reject(error)
            )
        })*/
    })
}

export default{
    create,
    remove,
    find,
    update,
    all
}