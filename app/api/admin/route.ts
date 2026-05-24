export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return Response.json(
      { success: false, message: 'Forbidden: admin API is dev-only.' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { collection, data } = body as {
      collection: string;
      data: Record<string, unknown>;
    };

    if (!collection || !data) {
      return Response.json(
        { success: false, message: 'Missing required fields: collection, data.' },
        { status: 400 }
      );
    }

    const validCollections = ['profile', 'skills', 'projects', 'experience'];
    if (!validCollections.includes(collection)) {
      return Response.json(
        {
          success: false,
          message: `Invalid collection "${collection}". Valid: ${validCollections.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // TODO: Wire up Firebase Admin SDK to write to Firestore
    // import { getFirestore } from 'firebase-admin/firestore';
    // const db = getFirestore();
    // await db.collection(collection).doc('main').set(data, { merge: true });

    return Response.json({
      success: true,
      message: `[MOCK] Successfully wrote to "${collection}". Firebase Admin not yet configured.`,
      collection,
      receivedKeys: Object.keys(data),
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json(
      { success: false, message: `Server error: ${message}` },
      { status: 500 }
    );
  }
}
