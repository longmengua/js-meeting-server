interface Attendee {
    open_id: string;
}

interface MeetingDetails {
    summary: string;
    description: string;
    start_time: number;
    end_time: number;
    attendees: Attendee[];
}

export interface LarkUtilType {
    MeetingDetails: MeetingDetails
}