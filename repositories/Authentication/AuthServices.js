const { text } = require("express");
const pool = require("../../config/dbConfig");
const userModel = require("../../model/userModel");


class AuthServices {
    async findByemail(email) {
        try {
            const find = await pool.query({
                text: `SELECT * FROM users WHERE email = $1 `,
                values: [email]
            })

            return find.rowCount
        } catch (error) {
            return {}
        }

    }

    async CreateUser(user) {
        try {
            const CreateUser = await pool.query({
                text: ` INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *`,
                values: [user.email, user.username, user.password]
            })
            const newUser = CreateUser.rows[0]
            delete newUser.email
            delete newUser.password

            await userModel.create({ user_id: CreateUser.rows[0].id })
            return { newUser }
        } catch (error) {
            return {}
        }
    }

    async fetchUser(user) {
        try {
            const fetchUser = await pool.query({
                text: `SELECT * FROM users WHERE email = $1`,
                values: [user.email]
            })
            const User = fetchUser.rows[0]
            return { User }
        } catch (error) {
            console.log(error)
            return {}
        }
    }


}
module.exports = new AuthServices()