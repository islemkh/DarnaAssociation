import {
    addNewEvent,
    getAllEvents,
    getEvent,
    deleteEvent,
    UpdateEvent
} from '../Controllers/event-controller'

const routes_event = (app) => {
    app.route('/api/AddEvent')
        .post(addNewEvent)

    app.route('/api/GetAllEvents')
        .get(getAllEvents)

    app.route('/api/detailsEvent/:id')
        .get(getEvent)

    app.route('/api/DeleteEvent/:id')
        .delete(deleteEvent)

    app.route('/api/UpdateEvent/:id')
        .put(UpdateEvent)
}
export default routes_event;
