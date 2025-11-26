export interface SymptomCheckResult {
    condition: string;
    probability: string;
    recommendation: string;
}

export const AIService = {
    checkSymptoms: async (symptoms: string): Promise<SymptomCheckResult[]> => {
        // Mock AI analysis
        await new Promise(resolve => setTimeout(resolve, 1500));

        const lowerSymptoms = symptoms.toLowerCase();
        if (lowerSymptoms.includes('headache') || lowerSymptoms.includes('fever')) {
            return [
                { condition: 'Common Cold', probability: '85%', recommendation: 'Rest and hydration. Consult a doctor if symptoms persist.' },
                { condition: 'Flu', probability: '40%', recommendation: 'Monitor temperature. Seek medical attention if breathing becomes difficult.' }
            ];
        } else if (lowerSymptoms.includes('chest pain')) {
            return [
                { condition: 'Angina', probability: '60%', recommendation: 'Seek immediate medical attention.' },
                { condition: 'Muscle Strain', probability: '30%', recommendation: 'Rest and avoid strenuous activity.' }
            ];
        }

        return [
            { condition: 'Unknown', probability: 'N/A', recommendation: 'Please consult a general practitioner for a detailed check-up.' }
        ];
    },

    getChatbotResponse: async (message: string): Promise<string> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            return "Hello! I'm your DocBook health assistant. How can I help you today?";
        } else if (lowerMsg.includes('book') || lowerMsg.includes('appointment')) {
            return "You can book an appointment by visiting the 'Find a Doctor' section on our home page.";
        } else if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
            return "Consultation fees vary by specialist. You can view the price on each doctor's profile.";
        }

        return "I'm not sure I understand. Could you please rephrase? You can ask me about booking appointments or general health queries.";
    }
};
