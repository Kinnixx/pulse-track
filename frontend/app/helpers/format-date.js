// frontend/app/helpers/format-date.js
import { helper } from '@ember/component/helper';
import { DateTime } from 'luxon';

export default helper(function formatDate([date], { format = 'dd LLL yyyy - HH:mm' }) {
  if (!date) return '';

  return DateTime
    .fromISO(date, { zone: 'utc' })
    .toLocal()
    .toFormat(format);
});
