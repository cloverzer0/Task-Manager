import sqlite3

conn = sqlite3.connect('../db/my_database.sqlite')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
)
''')

cursor.execute('''
INSERT INTO users (username, email, password) VALUES
('testuser1', 'testuser1@example.com', 'password1'),
('testuser2', 'testuser2@example.com', 'password2'),
('testuser3', 'testuser3@example.com', 'password3')
''')

conn.commit()
conn.close()