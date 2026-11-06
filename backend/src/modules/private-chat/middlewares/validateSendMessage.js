import { AppError } from '../../../utils/appError.js';

/**
 * Validates the request body for POST /api/chats/:chatId/messages.
 *
 * Rules:
 *   - `text`   {string}  Required. 1–2000 characters after trimming.
 *   - `type`   {string}  Optional. Must be one of the allowed message types.
 *                        Defaults to 'text' when omitted.
 *
 * On failure throws an AppError with status 422 (Unprocessable Entity)
 * listing every field-level error so the client knows exactly what to fix.
 */

/** Allowed values for the `type` field */
const ALLOWED_TYPES = ['text', 'audio'];

/** Maximum allowed character count for a text message */
const MAX_TEXT_LENGTH = 2000;

/**
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const validateSendMessage = (req, res, next) => {
  const errors = [];

  // ── text ─────────────────────────────────────────────────────────────────
  const rawText = req.body?.text;

  if (rawText === undefined || rawText === null) {
    errors.push({ field: 'text', message: '"text" is required.' });
  } else if (typeof rawText !== 'string') {
    errors.push({ field: 'text', message: '"text" must be a string.' });
  } else {
    const trimmed = rawText.trim();
    if (trimmed.length === 0) {
      errors.push({ field: 'text', message: '"text" must not be empty or whitespace-only.' });
    } else if (trimmed.length > MAX_TEXT_LENGTH) {
      errors.push({
        field: 'text',
        message: `"text" must not exceed ${MAX_TEXT_LENGTH} characters (received ${trimmed.length}).`,
      });
    } else {
      // Normalise in-place so downstream code gets the trimmed value
      req.body.text = trimmed;
    }
  }

  // ── type ─────────────────────────────────────────────────────────────────
  const rawType = req.body?.type;

  if (rawType !== undefined) {
    if (!ALLOWED_TYPES.includes(rawType)) {
      errors.push({
        field: 'type',
        message: `"type" must be one of: ${ALLOWED_TYPES.join(', ')}. Received "${rawType}".`,
      });
    }
  } else {
    // Default to 'text' when the client omits it
    req.body.type = 'text';
  }

  // ── Fail fast if any errors ───────────────────────────────────────────────
  if (errors.length > 0) {
    const err = new AppError('Validation failed. Please fix the errors and try again.', 422);
    err.validationErrors = errors;
    return next(err);
  }

  next();
};

export default validateSendMessage;

