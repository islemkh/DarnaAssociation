import {
    addNewEvent,
    getAllEvents,
    getEvent,
    deleteEvent,
    UpdateEvent,
    ParticipateEvent,
    ValidateParticipate,
    NoValidateParticipate,
    PublishEvent,
    ArchiveEvent
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

    app.route('/api/ParticipateEvent/:id')
        .put(ParticipateEvent)

    app.route('/api/validerParticipant/:id')
        .put(ValidateParticipate)

        app.route('/api/NovaliderParticipant/:id')
        .put(NoValidateParticipate)

    app.route('/api/PublishEvent/:id')
        .put(PublishEvent)

  /*   app.route('/api/ArchiveEvent/:id')
        .put(ArchiveEvent) */
}
export default routes_event;
