import {
    loginmember,
    addNewMember,
    getMember,
    getAllMember,
    deleteMember,
    UpdateMember,
    BannirMember,
    ArchivateMember,
    ActivateMember,
    GetMemberByYear,
    GetMemberByYcurrentYear

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

    app.route('/api/bannirmember/:id')
        .put(BannirMember)
    //public routes
    app.route('/api/login')
        .post(loginmember)
     app.route('/api/archivermember/:id')
     .put(ArchivateMember)
     app.route('/api/activermember/:id')
     .put(ActivateMember)
     app.route('/api/GetMemberByYear/:Create_date')
     .get(GetMemberByYear)
    app.route('/api/currentyear')
    .put(GetMemberByYcurrentYear)
}
export default routes_member;
