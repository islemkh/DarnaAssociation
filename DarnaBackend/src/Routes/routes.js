import {
    addNewDemand,
    getAllDemands,
    loginmember
} from '../Controllers/controllers'

const routes = (app) => {
    app.route('/api/register')
    .post(addNewDemand)

    .get(getAllDemands)

    app.route('/api/login')
    .post(loginmember)
  
}
export default routes;