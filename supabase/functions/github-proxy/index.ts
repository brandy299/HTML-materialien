import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN");
const OWNER = Deno.env.get("GITHUB_OWNER") || "brandy299";
const REPO = Deno.env.get("GITHUB_REPO") || "HTML-materialien";
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

function ghHeaders() {
  return {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "UnterrichtDigital-EdgeFunction/1.0",
  };
}

function encodePath(p: string) {
  return p.split("/").map(encodeURIComponent).join("/");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ error: "GITHUB_TOKEN not configured" }), {
      status: 500,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }

  const { method, path, body } = payload;

  if (!method || !path) {
    return new Response(JSON.stringify({ error: "Missing method or path" }), {
      status: 400,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }

  const allowedMethods = ["GET", "PUT", "DELETE"];
  if (!allowedMethods.includes(method)) {
    return new Response(JSON.stringify({ error: "Method not allowed: " + method }), {
      status: 400,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }

  // Only allow access to contents under materialien/ or known root files
  const normalizedPath = path.replace(/^\/+/, "");
  if (!normalizedPath.startsWith("materialien/") && normalizedPath !== "index.json") {
    return new Response(JSON.stringify({ error: "Path not allowed: " + path }), {
      status: 403,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }

  const url = `${API_BASE}/contents/${encodePath(normalizedPath)}`;

  const fetchInit: RequestInit = {
    method,
    headers: ghHeaders(),
  };

  if (body && (method === "PUT" || method === "DELETE")) {
    fetchInit.headers = { ...ghHeaders(), "Content-Type": "application/json" };
    fetchInit.body = JSON.stringify(body);
  }

  try {
    const ghResp = await fetch(url, fetchInit);
    const ghStatus = ghResp.status;
    let ghData;

    const text = await ghResp.text();
    try {
      ghData = JSON.parse(text);
    } catch {
      ghData = { raw: text };
    }

    return new Response(JSON.stringify({ status: ghStatus, data: ghData }), {
      status: 200,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }
});
