import {
    addNewDemand,
    AccepterDemande,
    getAllDemands,
    loginmember,
    deletDemande,
    getDemande
    
} from '../Controllers/controllers'

const routes = (app) => {
    app.route('/api/register')
    .post(addNewDemand)

    app.route('/api/listeDemandes')
    .get(getAllDemands)
    
    app.route('/api/demandeById/:id')
    .get(getDemande)

    app.route('/api/deleteDemande/:id')
    .get(deletDemande)

    app.route('/api/acceptDemande')
    .post(AccepterDemande)

    app.route('/api/login')
    .post(loginmember)
  
}
export default routes;