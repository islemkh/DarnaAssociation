import {
    loginmember,
    addNewMember,
    getMember,
    getAllMember,
    deleteMember,
    UpdateMember,    
    BannirMember

} from '../Controllers/member_controller'

const routes_member = (app) => {
     app.route('/AddMember')
    .post(addNewMember)

    app.route('/detailsMember/:id')
    .get(getMember)
    
    app.route('/ListMember')
    .get(getAllMember)

    app.route('/deleteMember/:id')
    .delete(deleteMember)

    app.route('/UpdateMember/:id')
    .put(UpdateMember)
    app.route('/bannirmember/:id')
    .put(BannirMember)  
    //public routes
    app.route('/login')
    .post(loginmember)
  
  
}
export default routes_member;
