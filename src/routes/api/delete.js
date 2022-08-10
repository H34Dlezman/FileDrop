import { deleteFile } from "./_storage";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {

  return {
    status: 200,
    headers: {
      'access-control-allow-origin': '*'
    },
    body: {
      message: "file delit u can hia"
    }
  };
}

export const POST = async ({ request, locals }) => {
  console.log("/api POST", request.headers.get("Content-Type"))

  let json = await request.json()

  const result = await deleteFile(json.key)
  console.log("Delete RES", result)

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