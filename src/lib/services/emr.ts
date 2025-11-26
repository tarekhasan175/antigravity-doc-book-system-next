export interface PatientRecord {
    id: string;
    name: string;
    dob: string;
    lastVisit: string;
    conditions: string[];
}

export const EMRService = {
    syncPatientData: async (patientId: string): Promise<boolean> => {
        console.log(`Syncing data for patient ${patientId} with external EMR...`);
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    },

    getPatientHistory: async (patientId: string): Promise<PatientRecord> => {
        // Simulate fetching from HL7/FHIR interface
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
            id: patientId,
            name: "John Doe",
            dob: "1980-01-01",
            lastVisit: "2023-10-15",
            conditions: ["Hypertension"]
        };
    }
};
