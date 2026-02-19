
export const config = {
    machineFiles: process.env.MACHINE_FILES?.split(",").map(f => f.trim()) ?? []
} as const; 