import {
    addNewDemand,
    AccepterDemande,
    getAllDemands,
    loginmember,
    deletDemande,
    getDemande,
    addNewMember,
    getMember,
    getAllMember,
    deleteMember,
    UpdateMember,
    addimage,
    download,
    BannirMember

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
    //routes members
    app.route('/api/AddMember')
    .post(addNewMember)

    app.route('/api/detailsMember/:id')
    .get(getMember)
    
    app.route('/api/ListMember')
    .get(getAllMember)

    app.route('/api/deleteMember/:id')
    .delete(deleteMember)

    app.route('/api/UpdateMember/:id')
    .put(UpdateMember)
    app.route('/api/bannirmember/:id')
    .put(BannirMember)  
    //public routes

    app.route('/api/login')
    .post(loginmember)
  
   app.route('/api/uploadFile')
    .post(addimage)  
    app.route('/api/getfile/:name')
    .get(download)  
}
export default routes;
