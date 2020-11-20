import {
    addimage,
    download,

} from '../Controllers/image_controller'

const routes_image = (app) => {
    app.route('/api/uploadFile')
        .post(addimage)
    app.route('/api/getfile/:name')
        .get(download)
}
export default routes_image;
