import { OnRampTransactionApprovalStatus } from "@repo/types/index.ts";

export default async function transferRequestAction(token:string, webhook_url:string, clicked:OnRampTransactionApprovalStatus) {
    console.log(webhook_url);
    try {
        const webhookResponseRaw = await fetch(webhook_url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": token,
                "status": clicked
            })
        })
        const webhookResponse = await webhookResponseRaw.json();
        
        console.log(webhookResponse);
        return webhookResponse;

    } catch (e) {
        console.error(e);
        throw e;
        // return (e as Error).message;
    }
}