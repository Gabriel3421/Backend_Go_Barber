import { isBefore, subHours } from 'date-fns';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';
import Appointment from '../models/Appointment';
import User from '../models/User';
import Cache from '../../lib/Cache';

class CreateAppointmentService {
  async run({ provider_id, user_id }) {
    const appointment = await Appointment.findByPk(provider_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== user_id) {
      throw new Error('You dont have permission to cancel this appointment');
    }
    const dataWithSub = subHours(appointment.date, 2);

    if (isBefore(dataWithSub, new Date())) {
      throw new Error('You can only cancel appointments 2h in advance.');
    }

    appointment.canceled_at = new Date();

    await appointment.save();
    await Queue.add(CancellationMail.key, {
      appointment,
    });

    /**
     * Invalidate Cache
     */
    await Cache.invalidatePrefix(`user:${user_id}:appointment`);

    return appointment;
  }
}

export default new CreateAppointmentService();
