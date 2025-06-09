import { TicketOpenDateInfo, TicketOpenType } from '../types';

export const getTicketOpenInfoByType = (
  responses: TicketOpenDateInfo[] | undefined,
  type: TicketOpenType,
): TicketOpenDateInfo | undefined => {
  return responses?.find((info) => info.ticketOpenType === type);
};

export const getPreOpenInfo = (responses: TicketOpenDateInfo[]) =>
  getTicketOpenInfoByType(responses, 'PRE_OPEN');

export const getGeneralOpenInfo = (responses: TicketOpenDateInfo[]) =>
  getTicketOpenInfoByType(responses, 'GENERAL_OPEN');
