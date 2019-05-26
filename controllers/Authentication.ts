const UserModel = require('../models/Users');
const bcrypt = require('bcrypt');
const get = require('lodash/get');
const jwt = require('jsonwebtoken');
import CONFIG from "../config/config.json"

// const CONFIG = require('../config/config');

class Authentication {
    req: any;
    res: any;

	constructor(req: any, res:any) {
		this.req = req;
		this.res = res;
	}

	generateSalt() {
		const saltRound = 10;
		return bcrypt.genSaltSync(saltRound);
	}

	generateHash(password: string, salt:string) {
		return bcrypt.hashSync(password, salt);
	}

	async register() {
		const userInput = this.req.body;
		const { title, firstName, lastName, userTypeId, userName, password, email } = userInput;

		// if (!firstName || !lastName) {
		// 	this.res.send('name is required');
		// }

		let salt;
		let hash;

		if (password && userName) {
			salt = this.generateSalt();
			hash = this.generateHash(password, salt);
		} else {
			salt = '';
			hash = '';
		}

		let user = new UserModel({
			title: title,
			first_name: firstName,
			last_name: lastName,
			primary_user_type_id: userTypeId,
			user_name: userName,
			password: hash,
			salt: salt,
			email: email,
			status: 1
		});

		// const error = user.validateSync();

		// if (error) {

		try {
			const result = await user.save();
			// if (result) {
			console.log('result', result);
			this.res.send('success');
			// } else {
			// 	this.res.send('no result');
			// }
		} catch (err) {
			console.log('err', err);
			this.res.send('not valid');
		}

		// user.save((err, data) => {
		// 	if (err) {
		// 		this.res.send('error');
		// 	}

		// 	this.res.send('success');
		// });
		// } else {
		// 	console.log('err', error);
		// 	this.res.send('not valid');
		// }
	}

	login() {
		const userInput = this.req.body;
		const { userName, password } = userInput;

		UserModel.find({ user_name: userName }, 'user_name password salt', (err: any, data:any) => {
			if (err) {
				this.res.send('error');
			}

			const userData = get(data, 0, []);
			const userExists = userData.user_name;
			const dbHash = userData.password;

			if (userExists) {
				const isValidUser = bcrypt.compareSync(password, dbHash);

				if (isValidUser) {
					const token = jwt.sign({ userName: userName }, CONFIG.JWT.SECRET, { expiresIn: 300 });
					this.res.send(token);
				} else {
					this.res.send('does not match');
				}
			} else {
				this.res.send('user does not exits');
			}
		});
	}

	profile() {
		const userParams = this.req.params;
		const { userName } = userParams;

		UserModel.find({ user_name: userName }, 'user_name email first_name last_name title', (err: any, data: any) => {
			if (err) {
				this.res.send('error');
			}

			const userData = get(data, 0, []);
			const userName = userData.userName;
			const email = userData.email;
			const firstName = userData.first_name;
			const lastName = userData.last_name;
			const title = userData.title;

			this.res.json({
				title: title,
				firstName: firstName,
				lastName: lastName,
				userName: userName,
				email: email
			});
		});
	}
}

module.exports = Authentication;
