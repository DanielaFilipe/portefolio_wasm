import { getProfile, getHobbies, getSkills } from '../models/studentModel.js';

export async function getStudentData(req, res, next) {
  try {
    const profile = await getProfile();
    if (!profile) {
      return res.status(404).json({ message: 'Perfil não encontrado' });
    }

    const hobbies = await getHobbies(profile.id);
    const skills = await getSkills(profile.id);

    res.json({ profile, hobbies, skills });
  } catch (err) {
    next(err);
  }
}
