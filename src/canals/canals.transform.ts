import { shipRate, shipSpeed } from 'src/ships/ships.constants';
import { format, addDays } from 'date-fns';

export const transformCanalData = ({ id, is_close, direction, ...canal }) => ({
  id,
  name: canal.canals.name,
  length: canal.canals.length,
  ways: canal.canals.ways,
  direction,
  is_close,
  size: canal.canals.canal_size.name,
  canal_id: canal.canals.id,
});

export const transformCanalRoutes = (canals = []) =>
  canals.map(transformCanalData);

export const transformSuggestedCanalComputation = (
  length: number,
  type: string,
  formatDate = true,
) => {
  const speed = shipSpeed[type];
  const rate = shipRate[type];
  const total_hrs = Math.ceil(length / speed);
  const total_fee = 500 + rate * total_hrs;
  const penalty = total_hrs > 12 ? (total_hrs - 12) * 10 : 0;
  const total_amount = penalty + total_fee;

  const outDate = addDays(new Date(), total_hrs);

  return {
    time_in: formatDate
      ? format(new Date(), 'MMM dd yyyy hh:ii:ss')
      : new Date(),
    time_out: formatDate ? format(outDate, 'MMM dd yyyy hh:ii:ss') : outDate,
    total_hrs,
    excess_fee: penalty,
    total_fee,
    total_amount,
  };
};
