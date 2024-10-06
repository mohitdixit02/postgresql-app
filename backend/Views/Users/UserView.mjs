import express from 'express';
import { Op } from 'sequelize';
import { getUserModel } from '../../DB/Postgres/Models/Models.mjs';
const router = express.Router();

router.get('/create_user', async (req, res) => {
    // get user Model
    const userModel = getUserModel();

    try {
        const user = await userModel.create({
            username: 'Kumar09087',
            name: 'Kumar Boi',
            email: 'kr_boyail@gxter.com',
            age: 29,
            status: 'active'
        });
        res.send(user);
    }
    catch (e) {
        console.error('Error creating user:', e);
        res.send("Internal Server Error");
    }

});

router.get('/get_users', async (req, res) => {
    // get user Model
    const userModel = getUserModel();

    try {
        const users = await userModel.findAll({
            attributes: [   'name','email']
        });
        res.send(users);
    }
    catch (e) {
        console.error('Error getting users:', e);
    }
});

router.get('/find_one', async (req, res) => {
    const userModel = getUserModel();
    try {
        const user = await userModel.findAll(
            {
                attributes: [['name', 'User'], ['email', 'Email']],
                // where: {
                //     [Op.and]: {
                //         email: {
                //             [Op.like]: '%dextri%',
                //         },
                //         age:{
                //             [Op.lte]: 30,
                //         }
                //     }
                // }
                where:{
                    name:'Megha Yuzu'
                }
            },
        );
        res.send(user);
    }
    catch (e) {
        console.error('Error getting user:', e);
    }
});

router.get('/update_user', async (req, res) => {
    const userModel = getUserModel();
    try{
        const user = await userModel.update(
            {
                status: 'active'
            },
            {
                where:{
                    email:{
                        [Op.like]: '%dextri%'
                    }
                }
            }
        )
        res.send(user);
    }
    catch(e){
        console.error('Error updating user:', e);
        res.send('Internal Server Error');
    }
});

router.get('/delete_user', async (req, res) => {
    const userModel = getUserModel();
    try{
        const user = await userModel.destroy(
            {
                where:{
                    status: 'not active'
                }
            }
        )
        res.send("User deleted successfully");
    }
    catch(e){
        console.error('Error updating user:', e);
        res.send('Internal Server Error');
    }
});

export default router;

