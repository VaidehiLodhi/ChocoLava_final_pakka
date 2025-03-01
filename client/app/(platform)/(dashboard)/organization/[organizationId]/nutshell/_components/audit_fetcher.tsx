import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { summarizeLogs } from "./audit_action";

export const AuditFetcher = async()=> {
    const {orgId} = auth();

    if(!orgId) {
        redirect("/select-org");
    }

    const auditLogs = await db.auditLog.findMany({
        where : {
            orgId
        },
        orderBy : {
            createdAt : "desc"
        },
        take : 10
    })

    if (auditLogs.length === 0) {
      return <p>No audit logs available.</p>;
    }

    const formattedLogs = auditLogs.map((item) => ({
      action: item.action,
      entityType: item.entityType,
      entityTitle: item.entityTitle,
      userName: item.userName,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    const summaryData = await summarizeLogs(formattedLogs);

    return (
        <div>
            <p>
                {JSON.stringify(summaryData)}
            </p>
        </div>
    )
}