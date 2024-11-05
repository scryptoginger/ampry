import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, comments } = data;

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      throw new Error("Slack webhook URL error");
    }

    const message = {
      text: `*New Form Submission*\n*Name:* ${name}\n*Email:* ${email}\n*Comments:* ${
        comments || "N/A"
      }`,
    };

    const slackResponse = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!slackResponse.ok) {
      throw new Error(`Slack API error: ${slackResponse.statusText}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending message to Slack:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return new Response("POST request");
}

export async function GET(request: Request) {
  return new Response("GET request");
}
