export interface Ticket {
    id: string;
    number: string | number;
}

export interface Announcement {
    name: string;
    endDate: string;
    endTime: string;
    numberOfTickets: number;
    tickets: Ticket[];
}

export interface AnnouncementDetailProps {
    params: { id: string };
}
