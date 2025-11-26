export interface VideoSession {
    sessionId: string;
    doctorId: string;
    patientId: string;
    startTime: string;
    status: 'scheduled' | 'active' | 'completed';
    roomUrl: string;
}

export const TelemedicineService = {
    createSession: async (doctorId: string, patientId: string, scheduledTime: string): Promise<VideoSession> => {
        console.log(`Creating video session for doctor ${doctorId} and patient ${patientId}`);
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            sessionId: `session-${Date.now()}`,
            doctorId,
            patientId,
            startTime: scheduledTime,
            status: 'scheduled',
            roomUrl: `https://meet.docbook.com/room/${Date.now()}`
        };
    },

    startSession: async (sessionId: string): Promise<string> => {
        console.log(`Starting video session ${sessionId}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return `https://meet.docbook.com/room/${sessionId}`;
    },

    endSession: async (sessionId: string): Promise<boolean> => {
        console.log(`Ending video session ${sessionId}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }
};
