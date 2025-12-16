// @ts-ignore
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req: Request) => {
  try {
    const { order } = await req.json();

    if (!order) {
      return new Response(JSON.stringify({ error: "No order data" }), {
        status: 400,
      });
    }

    const itemsHtml = order.items
      .map((i: any) => `<li>${i.title} × ${i.quantity} un.</li>`)
      .join("");

    const html = `
      <h2>🛒 Nuevo preorden recibido</h2>
      <p><strong>ID:</strong> ${order.id}</p>
      <p><strong>Name:</strong> ${order.profile_name}</p>
      <p><strong>Name:</strong> ${order.profile_name}</p>
      ${order.comment ? `<p><strong>Comentario:</strong> ${order.comment}</p>` : ""}
      <p><strong>Total:</strong> € ${order.total}</p>
      <h3>Productos</h3>
      <ul>${itemsHtml}</ul>
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
        to: ["irina.nic.yu@gmail.com"],
        subject: `Nuevo pedido #${order.id}`,
        html,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify({ ok: true, data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
    });
  }
});
