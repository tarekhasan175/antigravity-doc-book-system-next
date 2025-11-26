export interface TimeSlot {
    id: string;
    day: string; // e.g., "Monday"
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

export interface DoctorSchedule {
    doctorId: string;
    slots: TimeSlot[];
}

export const ScheduleService = {
    getSchedule: async (doctorId: string): Promise<DoctorSchedule> => {
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            doctorId,
            slots: [
                { id: '1', day: 'Monday', startTime: '09:00', endTime: '12:00', isAvailable: true },
                { id: '2', day: 'Monday', startTime: '14:00', endTime: '17:00', isAvailable: true },
                { id: '3', day: 'Tuesday', startTime: '09:00', endTime: '12:00', isAvailable: false },
                { id: '4', day: 'Wednesday', startTime: '10:00', endTime: '16:00', isAvailable: true },
            ]
        };
    },

    updateSlot: async (slotId: string, isAvailable: boolean): Promise<boolean> => {
        console.log(`Updating slot ${slotId} to ${isAvailable ? 'available' : 'unavailable'}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }
};
