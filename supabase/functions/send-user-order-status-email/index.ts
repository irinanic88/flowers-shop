// @ts-ignore
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req: Request) => {
  try {
    const { order } = await req.json();

    if (!order) {
      return new Response("No order", { status: 400 });
    }

    const statusText =
      order.status === "approved"
        ? "✅ Tu pedido fue aprobado"
        : "❌ Tu pedido fue cancelado";

    // @ts-ignore
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    // @ts-ignore
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userRes = await fetch(
      `${supabaseUrl}/auth/v1/admin/users/${order.user_id}`,
      {
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
      },
    );

    const userData = await userRes.json();

    console.log("USER DATA", userData);

    if (!userRes.ok) {
      console.error("Failed to fetch user:", userData);
      return new Response("Failed to fetch user", { status: 500 });
    }

    const email = userData.email;

    if (!email) {
      console.error("User email not found", userData);
      return new Response("User email not found", { status: 400 });
    }

    const html = `
      <h2>${statusText}</h2>
      <p><strong>Pedido #${order.id}</strong></p>
      <p>Total: € ${order.total}</p>
      ${
        order.admin_comment
          ? `<p><strong>Comentario del vendedor:</strong><br/>${order.admin_comment}</p>`
          : ""
      }
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Flowers Shop <onboarding@resend.dev>",
        to: [email],
        subject: `Estado de tu pedido #${order.id}`,
        html,
      }),
    });

    console.log("Resend response:", res);

    const data = await res.json();

    return new Response(JSON.stringify({ ok: true, data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Resend error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
    });
  }
});
