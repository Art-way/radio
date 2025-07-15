import https from 'https';
import { NextResponse } from 'next/server';

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6ImZkc2ZzZGZ2Y2ZmQGdtYWlsLmNvbSIsImJhc2VMYW5ndWFnZUlkIjoyLCJsZWFybkxhbmd1YWdlSWQiOjEsImlhdCI6MTY5Mzg0MTE4M30.D5jRvii3D1LxsbrzZ3dMkOowi8XqYL1zhqa9chaZHXE';

export async function POST(request) {
  try {
    const body = await request.json();
    const { baseLanguage, learnLanguage, levels, playedIds } = body;

    const requestBody = new URLSearchParams();
    requestBody.append('base_language_code', baseLanguage);
    requestBody.append('dest_language_code', learnLanguage);
    levels.forEach(levelId => requestBody.append('levels[]', levelId));
    if (playedIds && playedIds.length > 0) {
      playedIds.forEach(id => requestBody.append('played_ids[]', id));
    }

    const options = {
      hostname: 'backend.radiolingo.app',
      path: '/@/radio/index',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(requestBody.toString())
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
      req.write(requestBody.toString());
      req.end();
    });

    if (data.statusCode !== 200) {
      return NextResponse.json(data, { status: data.statusCode });
    }
    
    // --- التصحيح الأهم: استخلاص البيانات من data.topics ---
    if (data && data.data && Array.isArray(data.data.topics)) {
      return NextResponse.json(data.data.topics);
    }
    
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}