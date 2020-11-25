import {
    addNewDemand,
    AccepterDemande,
    getAllDemands,
    deletDemande,
    getDemande,
} from '../Controllers/demand-controller'

const routes_demand = (app) => {
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
    //routes members
}
export default routes_demand;
