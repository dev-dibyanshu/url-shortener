type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";
type Stack = "frontend";
type Package = "api" | "component" | "hook" | "page" | "state" | "style" | "auth" | "config" | "middleware" | "utils";

const LOG_API = "http://20.244.56.144/evaluation-service/logs";
 // main functon ap
export async function Log(
  stack: Stack,
  level: LogLevel,
  pkg: Package,
  message: string,
  token: string
) {
  try {
    await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
  } catch (e) {
    // Fallback: do nohing 
  }
}
