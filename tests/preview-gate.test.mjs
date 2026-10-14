import { test } from "node:test";
import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { onRequest } from "../functions/_middleware.js";

globalThis.crypto ??= webcrypto;

const SECRET = "g".repeat(64);
const served = new Response("static");
const call = (url, { header, env = {} } = {}) => {
  const headers = new Headers();
  if (header !== undefined) headers.set("x-cnw-preview-gate", header);
  return onRequest({
    request: new Request(url, { headers }),
    env,
    next: async () => served,
  });
};

test("a preview host without the secret configured is refused", async () => {
  for (const host of [
    "https://dev.atlas-1ab.pages.dev/",
    "https://8bd308ff.atlas-1ab.pages.dev/",
  ]) {
    const response = await call(host, { header: "anything" });
    assert.equal(response.status, 403);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
  }
});

test("with the secret set, a missing or wrong header is refused", async () => {
  for (const header of [undefined, "wrong", "g".repeat(63)]) {
    const response = await call("https://dev.atlas-1ab.pages.dev/", {
      header,
      env: { PREVIEW_GATE_SECRET: SECRET },
    });
    assert.equal(response.status, 403);
  }
});

test("the gate's header is served", async () => {
  const response = await call("https://dev.atlas-1ab.pages.dev/x/", {
    header: SECRET,
    env: { PREVIEW_GATE_SECRET: SECRET },
  });
  assert.equal(response, served);
});

test("production pages.dev without the secret is served", async () => {
  assert.equal(await call("https://atlas-1ab.pages.dev/"), served);
});
