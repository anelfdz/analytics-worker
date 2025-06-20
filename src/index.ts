import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

// Middleware to log all requests
app.use('*', async (c, next) => {
  // Get request information
  const requestInfo = {
    ip: c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown',
    userAgent: c.req.header('user-agent') || 'unknown',
    country: c.req.header('cf-ipcountry') || 'unknown',
    timestamp: new Date().toISOString(),
    url: c.req.url,
    method: c.req.method,
    host: c.req.header('host') || 'unknown',
  };

  // Log the request information
  console.log('Request Info:', JSON.stringify(requestInfo, null, 2));

  // Continue to the next middleware/route handler
  await next();
});

// Redirect all paths to the resume frontend
app.get("/resume", (c) => c.redirect('https://anelfdz.com'));

export default app;
