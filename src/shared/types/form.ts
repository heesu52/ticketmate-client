type ApplicationFormStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';

interface Form {
  applicationFormId: string;
  clientId: string;
  agentId: string;
  concertId: string;
  requestCount: number;
  hopeAreaResponseList: [
    {
      priority: number;
      location: string;
      price: string;
    },
  ];
  requestDetails: string;
  applicationFormStatus: string;
}

export type { ApplicationFormStatus, Form };
