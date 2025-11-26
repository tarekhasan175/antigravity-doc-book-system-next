type CalendarEvent = {
    title: string;
    description: string;
    location: string;
    startTime: string; // ISO string
    endTime: string; // ISO string
};

export const CalendarService = {
    generateGoogleCalendarUrl: (event: CalendarEvent): string => {
        const formatDate = (dateString: string) => new Date(dateString).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const start = formatDate(event.startTime);
        const end = formatDate(event.endTime);

        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    },

    generateICSFile: (event: CalendarEvent): string => {
        const formatDate = (dateString: string) => new Date(dateString).toISOString().replace(/-|:|\.\d\d\d/g, "");

        return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${formatDate(event.startTime)}
DTEND:${formatDate(event.endTime)}
END:VEVENT
END:VCALENDAR`;
    },

    downloadICS: (event: CalendarEvent) => {
        const content = CalendarService.generateICSFile(event);
        const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'appointment.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
