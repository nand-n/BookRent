export interface Ticket {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    number: number;
    payerPhone: string | number | null;
}

export interface Announcement {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    endDate: string;
    endTime: string;
    numberOfTickets: number;
    tickets: Ticket[];
}
export interface addAnnouncement {
    name: string;
    endDate: string;
    endTime: string;
    numberOfTickets: number;
}


