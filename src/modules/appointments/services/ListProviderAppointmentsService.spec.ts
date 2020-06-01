import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments from a provider on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 14, 0, 0),
      user_id: 'user',
      provider_id: 'provider',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 17, 0, 0),
      user_id: 'user',
      provider_id: 'provider',
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 21,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
