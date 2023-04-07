var sqlite3 = require("sqlite3").verbose();
const dbUser = "db.sqlite";

let db = new sqlite3.Database(dbUser, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the User.");
    db.run(
      `CREATE TABLE user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name text, 
          surname text
          email text UNIQUE, 
          password text,
          role text, 
          CONSTRAINT email_unique UNIQUE (email)
          )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created
          var insert =
            "INSERT INTO user (name, email, password) VALUES (?,?,?)";
          db.run(insert, ["admin", "admin@example.com", "admin123456"]);
          db.run(insert, ["user", "user@example.com", "user123456"]);
        }
      }
    );
    db.run(`CREATE TABLE project (
        id INTEGER PRIMARY KEY,
        titolo TEXT,
        categoria TEXT,
        creatore_id INTEGER REFERENCES user(id),
        descrizione TEXT,
        immagine BLOB
    )`,
    (err) => {
      if (err) {
        // Table already created
      } else {
      }
    });
  }
});

module.exports = db;
