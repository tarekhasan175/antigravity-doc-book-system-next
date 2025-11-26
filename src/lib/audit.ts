import { headers } from 'next/headers'
import prisma from '@/lib/prisma'

export async function createAuditLog(
    action: string,
    userId: string,
    resource?: string,
    resourceId?: string,
    metadata?: any
) {
    const headersList = await headers()

    await prisma.auditLog.create({
        data: {
            userId,
            action,
            resource,
            resourceId,
            metadata,
            ipAddress: headersList.get('x-forwarded-for') || headersList.get('x-real-ip'),
            userAgent: headersList.get('user-agent'),
        }
    })
}
