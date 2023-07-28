import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 1000, // Часовий період - 1 секунда
    max: 1, // Максимальна кількість запитів за вказаний період (1 секунда) - 1 запит
    message: 'Превищено ліміт запитів на цей ресурс. Будь ласка, спробуйте пізніше.', // Повідомлення для відповіді при перевищенні ліміту
  });
export default async function (req, res, next) {
  try {
    // Застосовуємо обмеження запитів
    limiter(req, res, next);
  } catch (e) {
    return res.status(403).json({
      message: 'Limited request',
    });
  }
}