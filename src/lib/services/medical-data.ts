export interface MedicalCondition {
    id: string;
    name: string;
    code: string; // ICD-10
    description: string;
}

export interface DrugInteraction {
    severity: 'high' | 'moderate' | 'low';
    description: string;
}

export const MedicalDataService = {
    getConditions: async (query: string): Promise<MedicalCondition[]> => {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const conditions = [
            { id: '1', name: 'Hypertension', code: 'I10', description: 'High blood pressure' },
            { id: '2', name: 'Type 2 Diabetes', code: 'E11', description: 'Chronic condition that affects the way the body processes blood sugar' },
            { id: '3', name: 'Asthma', code: 'J45', description: 'A condition in which your airways narrow and swell and may produce extra mucus' },
        ];

        if (!query) return conditions;
        return conditions.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    },

    checkDrugInteraction: async (drugA: string, drugB: string): Promise<DrugInteraction | null> => {
        // Mock check
        await new Promise(resolve => setTimeout(resolve, 500));
        if (drugA.toLowerCase() === 'aspirin' && drugB.toLowerCase() === 'warfarin') {
            return { severity: 'high', description: 'Increased risk of bleeding.' };
        }
        return null;
    }
};
