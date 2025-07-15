import https from 'https';
import { NextResponse } from 'next/server';

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6ImZkc2ZzZGZ2Y2ZmQGdtYWlsLmNvbSIsImJhc2VMYW5ndWFnZUlkIjoyLCJsZWFybkxhbmd1YWdlSWQiOjEsImlhdCI6MTY5Mzg0MTE4M30.D5jRvii3D1LxsbrzZ3dMkOowi8XqYL1zhqa9chaZHXE';

export async function POST(request) {
  try {
    const body = await request.json();
    const { nativeLanguageCode } = body;

    const requestBody = new URLSearchParams({
      'base_language_code': nativeLanguageCode
    }).toString();

    const options = {
      hostname: 'backend.radiolingo.app',
      path: '/@/radio/level/index',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const data = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => { responseData += chunk; });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(responseData);
            parsedData.statusCode = res.statusCode;
            resolve(parsedData);
          } catch (e) { reject(e); }
        });
      });
      req.on('error', (e) => reject(e));
      req.write(requestBody);
      req.end();
    });

    if (data.statusCode !== 200) {
      return NextResponse.json(data, { status: data.statusCode });
    }

    // --- التصحيح الأهم: استخلاص البيانات من data.levels ---
    if (data && data.data && Array.isArray(data.data.levels)) {
      return NextResponse.json(data.data.levels);
    }

    return NextResponse.json({ error: 'Unexpected data structure from levels API' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}