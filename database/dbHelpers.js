const { pool } = require("../config")


module.exports.get_all_members = async function(req, res, next) {
    // let members = [];
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM member')
    client.release()
    console.log(result);
    res.locals.members = result;
    next();
}

module.exports.split_members = function (req, res, next) {
    let current_members = [];
    let former_members = [];
    for (let i = 0; i < res.locals.members.length; i++) {
        res.locals.members[i].current ? current_members.push(res.locals.members[i]) : former_members.push(res.locals.members[i]);
    }
    console.log(current_members);
    console.log(former_members);
    res.locals.current_members = current_members;
    res.locals.former_members = former_members;
    next();
}