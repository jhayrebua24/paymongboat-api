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
});

export const transformCanalRoutes = (canals = []) =>
  canals.map(transformCanalData);

export const transformSuggestedCanalComputation = (
  length: number,
  type: string,
) => {
  const speed = shipSpeed[type];
  const rate = shipRate[type];
  const totalHrs = Math.ceil(length / speed);
  const totalFee = 500 + rate * totalHrs;
  const penalty = totalHrs > 12 ? (totalHrs - 12) * 10 : 0;
  const totalAmount = penalty + totalFee;

  return {
    timeIn: format(new Date(), 'MMM dd yyyy hh:ii:ss'),
    timeOut: format(addDays(new Date(), totalHrs), 'MMM dd yyyy hh:ii:ss'),
    totalHrs,
    excessFee: penalty,
    totalFee,
    totalAmount,
  };
};
