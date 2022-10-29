import { isAfter } from 'date-fns';

export const transformShipData = ({ canal_routes: { canals }, ...data }) => ({
  ...data,
  is_out: isAfter(new Date(), data.time_out),
  canal_details: {
    canal_name: canals.name,
    canal_length: canals.length,
    id: canals.id,
    size: canals.canal_size.name,
  },
});

export const transformShips = (data = []) => data.map(transformShipData);
