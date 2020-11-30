import {
    loginmember,
    addNewMember,
    getMember,
    getAllMember,
    deleteMember,
    UpdateMember,
    BannirMember,
    RenewMember,
    GetMemberByYear,
    GetMemberByYcurrentYear,
    updateEtatMember
} from '../Controllers/member_controller'

const routes_member = (app) => {
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
    app.route('/api/updateEtatMember/:id')
        .put(updateEtatMember)  
    //public routes
    app.route('/api/login')
        .post(loginmember)
     app.route('/api/RenewMember/:id')
     .put(RenewMember)
     app.route('/api/GetMemberByYear/:Create_date')
     .get(GetMemberByYear)
    app.route('/api/currentyear')
    .put(GetMemberByYcurrentYear)
}
export default routes_member;
