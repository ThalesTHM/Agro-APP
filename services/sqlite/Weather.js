import db from './SQLiteDatabase'

db.execSync("CREATE TABLE IF NOT EXISTS Weather " +
      "(id_weather INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, json TEXT NOT NULL)")

const create = (obj) => {
    return new Promise( (resolve, reject) => {
        let result = db.runSync("INSERT INTO Weather (json) VALUES (?)", [obj.json])
        
        if(result.changes > 0) 
            resolve(result.lastInsertRowId)
        else
            reject('Error inserting obj: ' + JSON.stringify(obj)) 

        reject('Not resolved ' + result)

        /*
        db.transaction(tx => {
            tx.executeSql("INSERT INTO Weather (json) VALUES (?)", [obj.json],
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
        let result = db.runSync("DELETE FROM Weather WHERE id_weather=?", [id])
        
        if(result.changes > 0) 
            resolve(result.lastInsertRowId)
        else
            reject('Error deleting obj: id=' + id) 

        reject('Not resolved ' + result)
        
        /*
        db.transaction(tx => {
            tx.executeSql("DELETE FROM Weather WHERE id_weather=?", [id],
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

const update = (id, obj) => {
    return new Promise( (resolve, reject) => {
        let result = db.runSync('UPDATE Weather SET date=?, json=? WHERE id_weather=?', [obj.date, obj.json, id])
        
        if(result.changes > 0) 
            resolve(result.lastInsertRowId)
        else
            reject('Error updating obj: ' + JSON.stringify(obj)) 

        reject('Not resolved ' + result)
        /*
        db.transaction(tx => {
            tx.executeSql('UPDATE Weather SET date=?, json=? WHERE id_weather=?', [obj.date, obj.json, id],
                (_, {rowsAffected}) => {
                    if(rowsAffected > 0)
                        resolve(rowsAffected)
                    else
                        reject('Error updating obj: id=' + id)
                },
                error => reject(error)
            )
        })*/
    })
}

const find = (id) => {
    return new Promise( (resolve, reject) => {
        const foundElement = db.getFirstSync("SELECT * FROM Weather WHERE id_weather=?", [id])
        
        if(foundElement == null)
            reject('Obj not found: id=' + id)
        else
            resolve(foundElement)

        reject('Not resolved ' + foundElement)

        /*
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Weather WHERE id_weather=?", [id],
                (_, {rows}) => {
                    if(rows.length > 0)
                        resolve(rows._array[0])
                    else
                        reject('Obj not found: id=' + id)
                },
                error => reject(error)
            )
        })*/
    })
}

const all = () => {
    return new Promise( (resolve, reject) => {
        let all = db.getAllSync("SELECT * FROM Weather")

        if(all.length > 0)
            resolve(all)
        else
            reject('Error table is empty')

        reject('Not resolved ' + all)

        /*
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Weather", null,
                (_, {rows}) => {
                    if(rows.length > 0)
                        resolve(rows._array)
                    else{
                        reject('Error table is empty')
                    }
                },
                error => reject(error)
            )
        })*/
    })
}

const findLastWeather = () => {
  return new Promise( (resolve, reject) => {
    const foundElement = db.getFirstSync("SELECT json FROM Weather ORDER BY date DESC LIMIT 1")
        
    if(foundElement == null)
        reject('Obj not found: id=' + id)
    else
        resolve(foundElement)

    reject('Not resolved ' + foundElement)
    /*
      db.transaction(tx => {
          tx.executeSql("SELECT json FROM Weather ORDER BY date DESC LIMIT 1", null,
              (_, {rows}) => {
                  if(rows.length > 0)
                      resolve(rows._array[0])
                  else{
                      reject('Obj not found: id=')
                  }

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
    all,
    findLastWeather
}