import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('database.db')

export default db