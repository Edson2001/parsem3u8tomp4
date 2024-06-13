const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/transcode', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  const command = `ffmpeg -i "${url}" -c:v libx264 -c:a aac -f mp4 -movflags frag_keyframe+empty_moov pipe:1`;
  const ffmpeg = exec(command);

  res.setHeader('Content-Type', 'video/mp4');
  ffmpeg.stdout.pipe(res);

  ffmpeg.on('error', (err) => {
    console.error('FFmpeg error: ', err);
    res.status(500).send('Internal Server Error');
  });
});

// Defina a porta que o servidor vai usar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
