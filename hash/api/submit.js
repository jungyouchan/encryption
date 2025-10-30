let hashData = [];

export default function handler(req, res) {
  // CORS 허용 헤더 추가
  res.setHeader('Access-Control-Allow-Origin', 'https://hash-survey.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Preflight 요청에 대해 200 OK 응답
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    // 클라이언트에서 보낸 데이터를 받기
    const data = req.body;
    hashData.push(data.receivedData.passwordHashes); //hashData = [ {SHA256:..., Argon2:..., Bcrypt:...}, {...}, ... ]

    console.log("서버가 받은 데이터:", data);

    // 받은 데이터를 기반으로 응답을 보냄
    res.status(200).json({
      success: true,
      message: `${data.id} 데이터가 정상 처리되었습니다`,  // 받은 데이터의 id를 활용
      receivedData: data
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); // 허용되지 않은 HTTP 메서드에 대한 응답
  }

  if (req.method === 'GET') {
    const data = {
      message: "서버에서 받은 데이터입니다.",
      receivedData: {
        id: "user1",
        passwordHashes: hashData
      }
    };

    res.status(200).json(data);

  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
