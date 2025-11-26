export interface HealthMetrics {
    heartRate: number;
    steps: number;
    sleepHours: number;
    caloriesBurned: number;
    lastSync: string;
}

export const WearableService = {
    getMetrics: async (userId: string): Promise<HealthMetrics> => {
        // Mock fetching from Apple Health / Google Fit
        await new Promise(resolve => setTimeout(resolve, 800));

        return {
            heartRate: 72,
            steps: 8432,
            sleepHours: 7.5,
            caloriesBurned: 2150,
            lastSync: new Date().toISOString()
        };
    }
};
