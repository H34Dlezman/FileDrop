import { uploadFile } from "./_storage";
import stream from 'stream';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
  return {
    status: 200,
    headers: {
      'access-control-allow-origin': '*'
    },
    body: {
      number: Math.random()
    }
  };
}

export const POST = async ({ request, locals }) => {
  console.log("/api POST", request.headers.get("Content-Type"))

  let json = await request.json()

  const result = await uploadFile(json.file, json.name, request.headers.get("Content-Type"))
  console.log("UL RES", result)

  if (result == -1) {
    return { status: 404, body: {error: "error uploading to bucket"} };
  }

  return {
    status: 200,
    headers: {
      'access-control-allow-origin': '*'
    },
    body: {
      ...result
    }
  };
};