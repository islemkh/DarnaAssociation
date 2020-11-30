import {
    Contact

} from '../Controllers/contact_controller'

const routes_contact = (app) => {
    app.route('/api/contact')
        .post(Contact)
 
}
export default routes_contact;