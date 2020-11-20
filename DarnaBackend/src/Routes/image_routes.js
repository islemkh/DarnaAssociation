import {
    addimage,
    download,

} from '../Controllers/image_controller'

const routes_image = (app) => {
    app.route('/uploadFile')
        .post(addimage)
    app.route('/getfile/:name')
        .get(download)
}
export default routes_image;
